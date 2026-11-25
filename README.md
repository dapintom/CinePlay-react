# CinePlay (React + Vite)

Versión en React de CinePlay. El diseño (`src/tema.css` + Bootstrap) no se modifica .

## Cómo ejecutarlo

```bash
npm install
npm run dev       # desarrollo
npm run build     # genera /dist
npm run preview   # prueba el build
```

> Al publicar el build, el servidor debe devolver `index.html` para cualquier ruta
> (en Netlify/Vercel/GitHub Pages hay que configurarlo), o cambiar `BrowserRouter` por `HashRouter` en `main.jsx`.

## Estructura

```
online/
├─ index.html              único HTML (monta <div id="root">)
├─ public/imagenes/        pósters
└─ src/
   ├─ main.jsx             providers + router
   ├─ App.jsx              mapa de rutas
   ├─ tema.css             estilos (sin cambios)
   ├─ db.js                base simulada (sin cambios; aún no conectada)
   ├─ context/             CarritoContext, AuthContext, AdminContext
   ├─ data/                productos.js, blog.js
   ├─ utils/formato.js
   ├─ components/          Navbar, AdminNavbar, Footer, Layout, ProductCard, ProductGrid, ProductModal
   └─ pages/               Home, Productos, Carrito, Pago, … y pages/admin/*
```

## Rutas modificadas desde la version html de Lucas 

| Antes | Ahora |
|---|---|
| `index.html` | `/` |
| `productos.html` + sessionStorage | `/productos?categoria=peliculas` · `?categoria=videojuegos` · `?genero=Comedia` |
| `detalle-producto.html` | `/producto/:id` |
| `carrito.html`, `pago.html`, `resumen-compra.html` | `/carrito`, `/pago`, `/resumen-compra` |
| `login.html`, `registro.html`, `contacto.html`, `nosotros.html` | `/login`, `/registro`, `/contacto`, `/nosotros` |
| `blogs.html`, `detalle-blog-1/2.html` | `/blog`, `/blog/1`, `/blog/2` |
| `admin/admin-*.html` | `/admin`, `/admin/productos`, `/admin/productos/nuevo`, `/admin/usuarios`, `/admin/usuarios/nuevo` |

## Qué reemplazó a qué

| Script anterior | Reemplazo |
|---|---|
| `carrito.js` | `CarritoContext` (mismo `localStorage`: `carritoCinePlay`) |
| `validaciones.js` (sesión) | `AuthContext` (mismo `sessionStorage`) |
| `validaciones.js` (formularios) | validación dentro de `Login`, `Registro`, `Pago` |
| `productos-admin.js`, `usuarios-admin.js` | `AdminContext` |
| `resumen-producto.js` | `ProductModal` |
| `pago.js`, `resumen-compra.js` | `pages/Pago.jsx`, `pages/ResumenCompra.jsx` |
| `productos.js`, `regiones.js` | no hacían falta (regiones no se usaba en ninguna página) |

Tarjetas de prueba en `/pago` (últimos 4 dígitos): `0002` rechazada, `0003` sin fondos, `0004` error de conexión.
