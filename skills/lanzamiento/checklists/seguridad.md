# Checklist seguridad

## A) Siempre (también webs estáticas)
- [ ] Cero claves API en el código cliente ni en el repo (buscar patrones: `sk-`, `AIza`, `key`, `token`, `secret`, `password`)
- [ ] Secretos fuera de git: `.env` en `.gitignore`; si un secreto se commiteó alguna vez → PARAR, avisar, rotarlo (borrarlo del historial no basta)
- [ ] HTTPS forzado (redirect http→https en hosting)
- [ ] Cabeceras de seguridad (via `_headers`/config hosting): `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `X-Frame-Options`/`frame-ancestors`, `Permissions-Policy`
- [ ] `rel="noopener"` en enlaces `target="_blank"`
- [ ] Formularios con protección anti-bots (honeypot mínimo; captcha si hay spam)
- [ ] Paneles/admin no enlazados, con noindex Y con autenticación real (ocultar no es proteger)
- [ ] Dependencias: `npm audit` / revisar CDNs con versión fijada; cuidado con paquetes con nombres sospechosos (typosquatting)

## B) Solo si hay backend / BBDD / auth
### Entradas y consultas
- [ ] Consultas parametrizadas SIEMPRE (cero concatenación de SQL)
- [ ] Validar y sanear TODA entrada en el servidor (la validación de cliente es solo UX)
- [ ] Escapar contenido del usuario al renderizar (XSS)
- [ ] Restringir subida de archivos: tipo, tamaño, nombre regenerado, fuera del webroot
- [ ] Sin deserialización insegura de datos del cliente
- [ ] Sin mass assignment: whitelist de campos aceptados en cada endpoint (el cliente no decide `role: admin`)
- [ ] Sin inyección de comandos: nunca pasar entrada de usuario a `exec`/shell

### Auth y sesiones
- [ ] Autenticación forzada en TODOS los endpoints privados (probar sin token, no asumir)
- [ ] Autorización por recurso: que un usuario no lea/edite datos de otro cambiando un ID (IDOR)
- [ ] Roles y permisos explícitos; row-level security si la BBDD lo soporta (Supabase/Postgres)
- [ ] Contraseñas hasheadas con bcrypt/argon2 (nunca texto plano, nunca MD5/SHA1)
- [ ] Tokens/sesiones con expiración; invalidación al logout
- [ ] Cookies: `HttpOnly`, `Secure`, `SameSite`
- [ ] Rate limiting en login y endpoints sensibles; bloqueo tras N intentos
- [ ] OAuth: validar `state`, redirect URIs exactas
- [ ] CSRF protegido si hay sesión por cookie

### Datos e infraestructura
- [ ] Usuario de BBDD con permisos mínimos (la app no conecta como root/postgres)
- [ ] Datos sensibles cifrados en reposo; PII mínima y con política de retención/borrado (RGPD)
- [ ] Multi-tenant: aislamiento de datos verificado entre clientes
- [ ] Logs/registros de accesos y errores (sin volcar PII ni secretos en los logs)
- [ ] Monitorización básica de errores
- [ ] Copias de seguridad automáticas Y restauración probada (RTO/RPO definidos aunque sea informalmente)
- [ ] Rate limiting global de la API
- [ ] Manejo de errores sin filtrar stack traces al cliente
- [ ] Reintentos con backoff e idempotencia en operaciones críticas (pagos, pedidos)
- [ ] Condiciones de carrera en operaciones concurrentes (stock, contadores, doble envío)
- [ ] Estrategia de caché con invalidación pensada
- [ ] Si hay IA integrada: tratar la salida del modelo como no confiable, defensas contra prompt injection, el modelo sin acceso directo a datos de otros usuarios

## C) Calidad (proyectos que van a crecer)
- [ ] Tests unitarios de la lógica crítica + algún test de integración de los endpoints principales
- [ ] Tests de regresión al arreglar bugs
- [ ] CI que ejecute los tests (y umbral de cobertura si el proyecto lo justifica)
- [ ] Decisiones de arquitectura anotadas (un `docs/decisiones.md` simple vale como ADR)
