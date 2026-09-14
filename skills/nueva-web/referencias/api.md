# Scaffold de API Node — convenciones

Extraído de `apiZonalytic` e `incidenciasApi` (septiembre 2026). Es "lo mejor de ambas": la estructura serverless-ready y el formato de error de incidenciasApi, el `db.js` y el rate limit por IP real de apiZonalytic. Cuando `/empezar api` genere una API, sigue esto literal salvo que `docs/brief.md` diga otra cosa.

## Stack

ESM puro (`"type": "module"`), Express 5, `mysql2` con pool promise, `helmet`, `cors`, `express-rate-limit`, `express-validator`, `morgan`, `dotenv`, `jsonwebtoken`, `bcryptjs` (puro JS, vale en serverless). Dev: `nodemon`. Tests: `node --test` + `supertest`.

## Estructura

```
api/index.js              ← entrypoint Vercel: `import app from '../src/app.js'; export default app;`
src/app.js                ← construye la app, SIN listen
src/server.js             ← arranque local: testConnection().then(listen)
src/config/db.js          ← pool mysql2 + testConnection()
src/middleware/auth.js    ← requireAuth (JWT) / requireApiKey / requireAdmin
src/middleware/errorHandler.js
src/routes/<recurso>.routes.js   ← handlers inline, sin carpeta controllers/
src/lib/                  ← helpers (mapping, notify, audit…)
scripts/migrate.js        ← idempotente, comprueba information_schema
scripts/seed.js           ← ON DUPLICATE KEY UPDATE
test/<recurso>.test.js    ← node --test + supertest contra app.js
.env.example              ← comentado, sin valores reales
.gitignore                ← node_modules/ .env .env.* !.env.example *.log .DS_Store
vercel.json               ← solo si se despliega en Vercel
.github/workflows/ci.yml  ← npm ci + node --check + npm test
README.md
```

Scripts de `package.json`: `start`, `dev`, `migrate`, `seed`, `test: node --test`.

## `src/app.js` — orden canónico de middlewares

```js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { clientIp } from './middleware/auth.js';

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

const origins = (process.env.CORS_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);
app.use(cors({ origin: origins.length ? origins : true }));

app.use(express.json({ limit: '100kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Clave por IP real (XFF[0]): detrás de proxies req.ip es interna y el límite sería global.
app.use(rateLimit({ windowMs: 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false, keyGenerator: clientIp }));

app.get('/', (req, res) => res.json({ status: 'ok', service: '<nombre>' }));

// app.use('/api/<recurso>', recursoRouter);

app.use(notFound);
app.use(errorHandler);
export default app;
```

## `src/server.js`

```js
import 'dotenv/config';
import app from './app.js';
import { testConnection } from './config/db.js';

const PORT = Number(process.env.PORT) || 5000;
testConnection()
    .then(() => app.listen(PORT, () => console.log(`<nombre> escuchando en http://localhost:${PORT}`)))
    .catch((err) => {
        console.error('--- DB CONNECTION FAILED ---');
        console.error('host  :', process.env.DB_HOST, 'port:', process.env.DB_PORT);
        console.error('code  :', err?.code, '| msg:', err?.message);
        process.exit(1);
    });
```

## `src/config/db.js`

```js
import mysql from 'mysql2';
import fs from 'node:fs';
import 'dotenv/config';

function buildSslOption() {
    if (process.env.DB_SSL !== 'true') return undefined;
    const rejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false';
    if (process.env.DB_SSL_CA) return { ca: process.env.DB_SSL_CA, rejectUnauthorized, minVersion: 'TLSv1.2' };
    if (process.env.DB_SSL_CA_FILE) return { ca: fs.readFileSync(process.env.DB_SSL_CA_FILE), rejectUnauthorized, minVersion: 'TLSv1.2' };
    return { rejectUnauthorized, minVersion: 'TLSv1.2' };
}

const env = (k) => (process.env[k] ?? '').trim(); // tolera espacios copiados del panel del hosting

export const pool = mysql.createPool({
    host: env('DB_HOST'), user: env('DB_USER'), password: env('DB_PASSWORD'),
    database: env('DB_NAME'), port: Number(env('DB_PORT')), ssl: buildSslOption(),
    waitForConnections: true, connectionLimit: 10, queueLimit: 0,
    charset: 'utf8mb4_unicode_ci', timezone: 'Z', dateStrings: false
}).promise();

pool.on('connection', (conn) => {
    conn.query("SET time_zone = '+00:00'", (err) => {
        if (err) console.warn('[db] no se pudo fijar TZ a UTC:', err.message);
    });
});

export async function testConnection() {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
}
```

## Errores — formato único

Siempre `{ error: 'codigo_snake', message: 'Texto en español para el usuario' }`. Códigos habituales: `validation`, `missing_token`, `invalid_token`, `forbidden`, `not_found`, `bad_credentials`, `inactive`, `server_error`. HTTP: 201 al crear, 400 validación, 401 token, 403 rol, 404, 409 duplicado, 413 tamaño, 503 dependencia sin configurar, 500 genérico.

En las rutas nunca se responde 500 a mano: `catch (err) { next(err) }`. Para errores intencionados se decora el Error: `err.status`, `err.code`, `err.expose = true` (solo los `expose` enseñan su mensaje).

```js
export function notFound(req, res) {
    res.status(404).json({ error: 'not_found', message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
}
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
    console.error('[error]', err?.message || err);
    const status = err?.status || 500;
    res.status(status).json({
        error: err?.code || 'server_error',
        message: err?.expose ? err.message : (status === 500 ? 'Error interno del servidor' : err.message),
    });
}
```

## Auth

```js
import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'missing_token', message: 'Falta el token' });
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.userId; req.role = payload.role;
        next();
    } catch {
        return res.status(401).json({ error: 'invalid_token', message: 'Token inválido o caducado' });
    }
}

// Máquina a máquina (terminales, otros servicios): cabecera X-API-Key, comparación en tiempo constante.
export function requireApiKey(req, res, next) {
    const key = req.headers['x-api-key'] || '';
    const ok = key.length && key.length === (process.env.API_KEY || '').length
        && crypto.timingSafeEqual(Buffer.from(key), Buffer.from(process.env.API_KEY));
    if (!ok) return res.status(401).json({ error: 'invalid_api_key', message: 'API key inválida' });
    next();
}

export function clientIp(req) {
    const xff = req.headers['x-forwarded-for'];
    if (xff) { const first = String(xff).split(',')[0].trim(); if (first) return first; }
    return req.ip || req.socket?.remoteAddress || '';
}
```

Firma del token: `jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '12h' })`. Variable unificada: `JWT_EXPIRES`.

## Router tipo

```js
import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import { pool } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

function validar(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: 'validation', message: errors.array()[0].msg });
    next();
}
// Express 5 no acepta regex en el path: el :id se valida con express-validator.
const idEntero = [param('id').isInt({ min: 1 }).withMessage('id inválido'), validar];

// Rutas fijas (/stats) SIEMPRE antes de /:id.
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT … FROM recurso ORDER BY id DESC LIMIT 100');
        res.json(rows);
    } catch (err) { next(err); }
});

router.post('/',
    requireAuth,
    body('nombre').isString().trim().isLength({ min: 1, max: 100 }).withMessage('Falta el nombre'),
    validar,
    async (req, res, next) => {
        try {
            const [r] = await pool.query('INSERT INTO recurso (nombre) VALUES (?)', [req.body.nombre]);
            res.status(201).json({ id: r.insertId, nombre: req.body.nombre });
        } catch (err) { next(err); }
    });

router.get('/:id', idEntero, requireAuth, async (req, res, next) => { /* 404 → { error: 'not_found' } */ });

export default router;
```

## Scripts

- `migrate.js`: top-level await, helpers `tableExists` / `colExists` sobre `information_schema`, `console.log('✓ …')` aplique o no, `await pool.end()` al final. DDL con `ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`.
- `seed.js`: datos como array de arrays, `INSERT … ON DUPLICATE KEY UPDATE`, contraseñas con `bcrypt.hash(p, 10)`, `await pool.end()`.
- Cabecera de cada script: `// Uso: node scripts/<x>.js` y qué hace.

## `.env.example`

```
# Copia a .env y rellena. Nunca subas .env.
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:5173

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_NAME=
# SSL: vacío en local, "true" en cloud (TiDB, Aiven)
DB_SSL=
DB_SSL_REJECT_UNAUTHORIZED=true

JWT_SECRET=cambia-esto-por-una-cadena-larga-aleatoria
JWT_EXPIRES=12h
# Solo si hay acceso máquina a máquina
API_KEY=
```

## Tests mínimos (`test/app.test.js`)

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

test('healthcheck responde', async () => {
    const r = await request(app).get('/');
    assert.equal(r.status, 200);
    assert.equal(r.body.status, 'ok');
});
test('ruta protegida sin token → 401', async () => {
    const r = await request(app).get('/api/recurso');
    assert.equal(r.status, 401);
    assert.equal(r.body.error, 'missing_token');
});
test('validación rechaza payload malo → 400', async () => { /* con token de prueba firmado con JWT_SECRET de test */ });
```

Los tests no tocan la BBDD real: las rutas que la necesitan se prueban con un `JWT_SECRET` de test y payloads que fallen antes de la query, o con una BBDD local de Docker.

## Despliegue

- **Vercel**: `vercel.json` con `{"rewrites":[{"source":"/(.*)","destination":"/api/index"}]}` y `api/index.js`. Sin estado en disco, sin `app.listen`.
- **Render / VPS / Raspberry**: `npm start`. `trust proxy 1` ya está puesto. Si hay PM2, `ecosystem.config.cjs` con `env_file`.
- BBDD en cloud: TiDB Cloud con `DB_SSL=true`; en local, Docker.
- CI: `npm ci` + `find src scripts -name '*.js' -print0 | xargs -0 -n1 node --check` + `npm test`.

## README (secciones)

1. Qué es + línea `Stack:`. 2. Arranque (`npm install`, `cp .env.example .env`, `npm run migrate`, `npm run seed`, `npm run dev`). 3. Usuarios/claves de prueba tras el seed (tabla). 4. Dependencias externas y qué pasa si no están configuradas. 5. Endpoints: tabla Método / Ruta / Quién / Descripción. 6. Vocabulario: valores de los ENUM. 7. Front que la consume y cómo apuntarlo.
