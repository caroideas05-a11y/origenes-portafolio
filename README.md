# ORÍGENES — Sitio web y panel de portafolio

Este proyecto es una primera versión funcional de la web pública y el panel privado de ORÍGENES.

## Qué incluye
- Página pública responsive con identidad verde oliva, crema y verde oscuro.
- Secciones de presentación, proyectos, servicios y contacto.
- Galería conectada a Supabase.
- Inicio de sesión privado.
- Panel para subir video y portada, categorizar, publicar/ocultar y eliminar proyectos.

## Requisitos
- Node.js 20 o superior
- Cuenta de Supabase
- Cuenta de Vercel para publicar el sitio

## Paso 1 — Crear Supabase
1. Crea un proyecto en https://supabase.com/
2. Abre SQL Editor y ejecuta `supabase/schema.sql`.
3. En Authentication > Users, crea el usuario administrador.
4. En Project Settings > API, copia Project URL y anon/public key.

## Paso 2 — Configurar el proyecto
1. Descomprime el ZIP.
2. Copia `.env.example` como `.env.local`.
3. Completa `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. En la carpeta ejecuta:
   - `npm install`
   - `npm run dev`
5. Abre http://localhost:3000

## Paso 3 — Entrar al panel
Abre `/admin/login` e inicia sesión con el usuario que creaste en Supabase Authentication.
Después podrás añadir proyectos en `/admin`.

## Paso 4 — Publicar en Vercel
1. Sube el proyecto a un repositorio privado de GitHub.
2. Importa ese repositorio en https://vercel.com/
3. Añade las dos variables de entorno de Supabase.
4. Pulsa Deploy.
5. Vercel te dará una URL temporal `*.vercel.app`.

## Paso 5 — Dominio propio
Cuando elijas y compres el dominio, agrégalo en Vercel > Settings > Domains y sigue las instrucciones DNS del proveedor.

## Importante antes de publicar
- Cambia el enlace de Instagram en `app/page.tsx` si la cuenta oficial cambia.
- El panel inicial permite subir archivos al bucket público. Para videos muy pesados o reproducción profesional a escala, conviene integrar un servicio especializado como Mux o Cloudinary.
- Las políticas SQL de este starter permiten que cualquier usuario autenticado gestione proyectos. Mantén desactivada la creación pública de cuentas y crea solo usuarios administradores desde Supabase.
- La web muestra el enlace directo al video al abrir una tarjeta; la siguiente iteración puede añadir reproductor integrado, filtros interactivos, SEO por proyecto y formularios de contacto.
