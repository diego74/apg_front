# APG — aplicación unificada

Un único proyecto **Next.js** que reúne el sitio público, el panel administrativo y la API. PostgreSQL y Storage se alojan en Supabase; Vercel sirve la aplicación desde GitHub.

```text
app/                  web pública, /admin y /api
lib/                  conexión PostgreSQL y autenticación de sesión
db/schema.sql         estructura de la base de datos
scripts/              tareas de inicialización
supabase/migrations/  esquema, RLS y bucket de Storage reproducibles
```

## Puesta en marcha

1. Copia `.env.example` a `.env` y completa sus variables.
2. Inicia sesión y enlaza el proyecto Supabase.
3. Aplica la migración y crea la cuenta administradora:

```bash
npm install
npx supabase login
npm run supabase:link
npm run supabase:push
npm run db:seed-admin
npm run dev
```

El sitio público está en `http://localhost:3000`; el panel protegido está en `http://localhost:3000/admin`.

## Rutas principales

| Área | Ruta |
| --- | --- |
| Sitio público | `/`, `/calendario`, `/ranking` y demás páginas existentes |
| Administración | `/admin`, `/admin/login` |
| Estado del servicio | `GET /api/health` |
| Calendario público | `GET /api/events` |
| Gestión de torneos | `POST /api/events` (sesión de admin) |
| Resumen privado | `GET /api/admin/dashboard` |

La cookie de sesión es `httpOnly`, `sameSite=lax` y solo usa `secure` en producción. No subas `.env` ni `.env.local` al repositorio.

Consulta [la guía de despliegue](docs/deployment.md) antes de conectar el repositorio con Vercel.
