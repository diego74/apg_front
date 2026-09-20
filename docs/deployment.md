# Despliegue: GitHub → Vercel → Supabase

## 1. Supabase

El proyecto local ya está inicializado con el ref `scqyxgownxnmybdvhxhs`. Inicia sesión con tu cuenta de Supabase y enlázalo:

```bash
npx supabase login
npm run supabase:link
npm run supabase:push
```

La migración crea las tablas de APG, activa RLS, permite leer solamente eventos publicados/ranking activo mediante la Data API y crea el bucket público `apg-assets`. Las subidas no se permiten desde el navegador: pasan por `POST /api/admin/uploads`, que exige una sesión de administrador y usa la Service Role solo en el servidor.

Después de aplicar la migración, crea la primera cuenta:

```bash
npm run db:seed-admin
```

En **Supabase → Connect**, toma la cadena del **Transaction pooler** para `DATABASE_URL`. Es la opción recomendada para funciones serverless de Vercel. Mantén `DATABASE_SSL=true` en producción.

## 2. Variables de entorno

Configura estas variables tanto en Vercel (Production, Preview y Development según corresponda) como en desarrollo local:

| Variable | Dónde se obtiene | Exposición |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Connect | Pública |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase → Connect | Pública |
| `DATABASE_URL` | Supabase → Connect → Transaction pooler | Solo servidor |
| `DATABASE_SSL` | `true` en Vercel | Solo servidor |
| `SUPABASE_SECRET_KEY` | Supabase → Settings → API Keys | Solo servidor, secreta |
| `SESSION_SECRET` | Valor aleatorio de 32+ caracteres | Solo servidor, secreta |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Elegidos para el bootstrap | Solo para ejecutar el seed; no son necesarios en Vercel |

No uses la Service Role ni `DATABASE_URL` en variables `NEXT_PUBLIC_*`, código cliente, GitHub Actions o archivos versionados.

## 3. GitHub y Vercel

El remoto de este proyecto es `https://github.com/diego74/apg_front.git`.

1. Confirma y sube estos cambios a la rama que quieras publicar.
2. En Vercel, selecciona **Add New → Project** e importa ese repositorio de GitHub.
3. Vercel detectará Next.js automáticamente: no hace falta `vercel.json` ni modificar el comando de build (`npm run build`).
4. Añade las variables anteriores y despliega.
5. Copia la URL final de Vercel a la configuración de URLs permitidas de Supabase si después activas Supabase Auth.

Cada push a la rama de producción desplegará a Production; los pull requests crearán Previews aislados. Para evitar que un Preview use datos de producción, crea un proyecto Supabase de staging y asigna sus variables al entorno Preview de Vercel.

## 4. Comprobación posterior

Tras desplegar, abre `https://TU-DOMINIO/api/health`: debe devolver `database: "connected"`. Inicia sesión en `/admin`, crea un torneo y prueba la carga de un JPG/PNG/WebP/AVIF o PDF de hasta 10 MB hacia `POST /api/admin/uploads`.
