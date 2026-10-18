# Chicken Huerta

Página web y carta digital con 119 productos, carrito, pedidos por WhatsApp y administración de catálogo.

## Estado

Copia de la versión publicada el 18 de octubre de 2026. Incluye fotos reales de fachada y entrada, atención en mesa, recojo y delivery.

## Desarrollo

Node.js 22.13 o posterior. Ejecutar `npm ci`, `npm run dev`. Validar catálogo con `node tests/catalog-check.mjs`. Compilar con `npm run build`.

## Cloudflare independiente

Requiere base D1 (DB), almacenamiento R2 (BUCKET), migración SQL en drizzle/ y ADMIN_EMAIL. Antes de habilitar el administrador fuera de ChatGPT, sustituir app/chatgpt-auth.ts por autenticación verificada; no confiar en cabeceras de identidad enviadas por visitantes. La configuración Sites incluida pertenece al alojamiento original y debe adaptarse al nuevo despliegue.

No incluye secretos ni datos de clientes. Los precios editados en producción y fotos subidas al almacenamiento deben migrarse por separado.
