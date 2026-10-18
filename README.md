# Chicken Huerta

Web y carta digital de Chicken Huerta. 119 productos, carrito, atención en mesa, recojo y delivery, pedidos por WhatsApp y panel del propietario.

## Servicios

- Cloudflare Workers aloja la web.
- Supabase guarda catálogo, precios, configuración y fotos de platos.
- Supabase Auth verifica la sesión del propietario. Cada API valida el token y RLS limita las modificaciones a correos expresamente autorizados. No se usan claves secretas ni service_role en el navegador.

## Compilar y publicar en Cloudflare

Node.js 22.13 o posterior. Directorio raíz del repositorio.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy --config dist/server/wrangler.json`
- Preview command (si se solicita): `npx wrangler versions upload --config dist/server/wrangler.json`

Cloudflare instala dependencias desde package-lock.json. El nombre del Worker es `chicken-huerta`. No requiere D1 ni R2 ni variables secretas para consultar la carta. La URL y clave publicable del proyecto Supabase están en lib/supabase/config.ts; los permisos se controlan en la base de datos.

## Supabase

El esquema y los 119 productos ya están cargados en el proyecto `chicken-huerta`. Los archivos supabase/schema.sql y supabase/seed.sql documentan la instalación inicial; no volver a ejecutarlos sobre tablas existentes.

El propietario autorizó la visualización pública de fotos y se configuró su correo administrador. supabase/storage-after-approval.sql documenta el paso de almacenamiento pendiente. La tabla huerta_admins se administra mediante acceso autorizado al proyecto, nunca desde el navegador público. Crear una cuenta en Supabase Auth no da permisos por sí solo.

Para entrar al panel, el propietario debe tener un usuario de Supabase Auth con correo confirmado, contraseña propia y el mismo correo autorizado en huerta_admins. No usar la contraseña de la base de datos ni la de la cuenta de Supabase Dashboard.

## Validación

`node tests/catalog-check.mjs` verifica el catálogo y las políticas sin modificar datos. `npm run build` compila para Cloudflare.

El alojamiento anterior en ChatGPT conserva su configuración y datos por separado. Los cambios de esta copia se publican desde GitHub hacia Cloudflare.

## Fotos referenciales de internet

Se añadieron cinco fotografías con licencia reutilizable a once productos. Las fotos propias cargadas desde el panel tienen prioridad. Créditos, fuentes, licencias y cambios: public/creditos-fotos.html y public/assets/menu/credits.json.

Después de reconectar GitHub en Cloudflare, comprobar que un cambio en `main` genera un nuevo despliegue y que `/creditos-fotos.html` está disponible.
