# Árbol de decisiones — brief de API Node

Lo usa `grilling` cuando se arranca una API con `/empezar api`. Mismo formato que `brief-web.md`. Los hechos (qué tablas existen ya, qué cliente la va a consumir, qué hay desplegado) los buscas tú; las decisiones las toma el usuario.

## Ronda 1 — Raíz

1. **Para qué es**: qué proceso de negocio cubre, quién la consume (web propia, terminal RFID, panel interno, app móvil, otro servicio).
2. **Datos que gestiona**: entidades principales y quién es el dueño del dato. ¿Hay ya una base de datos o un esquema SQL?
3. **Dónde se despliega**: Vercel (serverless, sin estado), servidor propio/Raspberry con PM2, Docker. ➡️ Condiciona pool de conexiones, ficheros subidos y cron.

## Ronda 2 — Contrato (depende de 1 y 2)

4. **Endpoints**: lista recurso a recurso con verbo, ruta, quién puede llamarlo. ➡️ REST plano, sin versionado salvo que ya exista un cliente en producción.
5. **Autenticación**: API key por cabecera (servicios internos), JWT (usuarios), ninguna (solo lectura pública). ➡️ API key para máquina a máquina, JWT si hay login de personas.
6. **Validación**: qué campos, formatos y límites. ➡️ `express-validator` en cada ruta de escritura.
7. **Formato de error**: JSON uniforme `{ error, detalles? }` con código HTTP correcto.

## Ronda 3 — Operación (depende de 3 y 5)

8. **Secretos y entorno**: variables necesarias, `.env.example` sin valores, dónde viven en producción.
9. **Rate limit y CORS**: orígenes permitidos concretos, límites por IP. ➡️ `helmet` + `cors` con lista blanca + `express-rate-limit`.
10. **Ficheros y correo**: ¿sube archivos (multer, Dropbox)? ¿envía emails (nodemailer)? Cada uno es un tercero con credenciales.
11. **Logs y errores**: `morgan` en dev; en producción, qué se guarda y dónde.

## Ronda 4 — Calidad (depende de 4)

12. **Tests mínimos**: qué endpoints hay que cubrir con `node --test` + supertest antes de darla por hecha. ➡️ Al menos: auth rechaza sin credenciales, validación rechaza payload malo, ruta principal responde bien.
13. **Seed y migraciones**: `scripts/seed.js` y `scripts/migrate.js` como en las APIs existentes.

## Cierre

Guardar en `docs/brief.md`:

```md
# Brief — <API>
Fecha, consumidor, despliegue.
## Endpoints
| Verbo | Ruta | Auth | Validación | Respuesta |
## Entorno
| Variable | Para qué | Dónde vive |
## Terceros
| Servicio | Para qué | Credenciales |
## Tests mínimos
- …
```
