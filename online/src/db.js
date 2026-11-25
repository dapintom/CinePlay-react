/**
 * Base de datos de CinePlay.
 * Guarda todo en localStorage (persiste al recargar, solo en este navegador).
 * Todas las funciones devuelven Promesas, como lo haría una API real,
 * así después se pueden reemplazar por llamadas a un servidor sin cambiar el resto del código.
 *
 * Uso:
 *   import { db } from './db.js'
 *   const productos = await db.productos.listar({ tipo: 'Película' })
 */

const PREFIJO = 'cineplay_db_'
const VERSION = 1 // súbela si cambias los datos iniciales y quieres que se vuelvan a cargar

// ---------- Utilidades ----------
const leer = (clave, defecto) => {
  try { return JSON.parse(localStorage.getItem(PREFIJO + clave)) ?? defecto } catch { return defecto }
}
const guardar = (clave, valor) => localStorage.setItem(PREFIJO + clave, JSON.stringify(valor))

async function hash(texto) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}
const sinClave = ({ passHash, ...usuario }) => usuario // nunca se devuelve el hash




// ---------- Datos iniciales ----------
const PRODUCTOS_INICIALES = [
  { titulo: 'Dune: Parte 2', tipo: 'Película', categoria: 'Película / Sci-Fi', genero: 'Acción · Ciencia ficción', precio: 14990, precioArriendo: 3990, stock: 25, imagen: '/imagenes/dune2.jpg' },
  { titulo: 'Deadpool y Wolverine', tipo: 'Película', categoria: 'Película / Acción', genero: 'Acción · Comedia', precio: 14990, precioArriendo: 3990, stock: 30, imagen: '/imagenes/deadpool.jpg' },
  { titulo: 'Intensamente 2', tipo: 'Película', categoria: 'Película / Acción', genero: 'Animación · Familia', precio: 12990, precioArriendo: 3490, stock: 20, imagen: '/imagenes/intensamente2.jpg' },
  { titulo: 'El hombre gris', tipo: 'Película', categoria: 'Película / Acción', genero: 'Acción · Suspense', precio: 9990, precioArriendo: 2990, stock: 15, imagen: '/imagenes/hombre-gris.jpg' },
  { titulo: 'Barbie', tipo: 'Película', categoria: 'Película / Acción', genero: 'Comedia · Fantasía', precio: 11990, precioArriendo: 2990, stock: 18, imagen: '/imagenes/barbie.jpg' },
  { titulo: 'Spider-Man 2', tipo: 'Videojuego', categoria: 'Juego / Acción', genero: 'Acción · Aventura', plataforma: 'PS4', precio: 49990, precioArriendo: 5990, stock: 12, imagen: '/imagenes/spiderman2.jpg' },
  { titulo: 'EA SPORTS FC 24', tipo: 'Videojuego', categoria: 'Juego / Acción', genero: 'Deportes · Simulación', plataforma: 'PC', precio: 39990, precioArriendo: 4990, stock: 22, imagen: '/imagenes/fc24.jpg' },
  { titulo: 'God of War Ragnarök', tipo: 'Videojuego', categoria: 'Juego / Aventura', genero: 'Acción · Aventura', plataforma: 'PC', precio: 44990, precioArriendo: 5990, stock: 10, imagen: '/imagenes/god-of-war.jpg' },
  { titulo: 'The Last of Us Parte I', tipo: 'Videojuego', categoria: 'Juego / Aventura', genero: 'Acción · Aventura', plataforma: 'PC', precio: 39990, precioArriendo: 4990, stock: 14, imagen: '/imagenes/tlou.avif' },
  { titulo: 'Hogwarts Legacy', tipo: 'Videojuego', categoria: 'Juego / Aventura', genero: 'RPG · Aventura', plataforma: 'PC', precio: 42990, precioArriendo: 4990, stock: 16, imagen: '/imagenes/hogwarts.jpg' },
]


// Cuentas de demostración. Cambia estas contraseñas si el sitio llega a publicarse.
const USUARIOS_INICIALES = [
  { rut: '11111111K', nombre: 'Admin', apellidos: 'CinePlay', correo: 'admin@cineplay.cl', clave: 'admin123', rol: 'Administrador', direccion: 'Av. Providencia 1234', comuna: 'Providencia' },
  { rut: '190110224', nombre: 'Juan', apellidos: 'Pérez González', correo: 'juan@correo.cl', clave: 'cliente123', rol: 'Cliente', direccion: 'Av. Siempre Viva 123', comuna: 'Santiago' },
]

let listo = null
function iniciar() {
  if (!listo) {
    listo = (async () => {
      if (leer('version', 0) === VERSION) return
      guardar('productos', PRODUCTOS_INICIALES.map((p, i) => ({ id: i + 1, activo: true, ...p })))
      guardar('contador_productos', PRODUCTOS_INICIALES.length)
      const usuarios = []
      for (const { clave, ...u } of USUARIOS_INICIALES) usuarios.push({ ...u, passHash: await hash(clave), creado: new Date().toISOString() })
      guardar('usuarios', usuarios)
      guardar('ordenes', [])
      guardar('version', VERSION)
    })()
  }
  return listo
}


// Envoltorio: espera a que la base esté inicializada antes de cada operación
const op = (fn) => async (...args) => { await iniciar(); return fn(...args) }
const error = (msg) => { throw new Error(msg) }

// ---------- Productos ----------
const productos = {
  listar: op((filtro = {}) => {
    const q = (filtro.texto || '').toLowerCase()
    return leer('productos', []).filter((p) =>
      (!filtro.tipo || p.tipo === filtro.tipo) &&
      (filtro.activo === undefined || p.activo === filtro.activo) &&
      (!q || p.titulo.toLowerCase().includes(q) || (p.genero || '').toLowerCase().includes(q)))
  }),
  obtener: op((id) => leer('productos', []).find((p) => p.id === Number(id)) ?? null),
  crear: op((datos) => {
    const precio = Number(String(datos.precio).replace(/\D/g, ''))
    const stock = Number(datos.stock)
    if (!datos.titulo?.trim()) error('El título es obligatorio.')
    if (!(precio >= 0)) error('El precio no es válido.')
    if (!Number.isInteger(stock) || stock < 0) error('El stock debe ser un número entero mayor o igual a 0.')
    const id = leer('contador_productos', 0) + 1
    const nuevo = { activo: true, tipo: datos.categoria?.startsWith('Juego') ? 'Videojuego' : 'Película', ...datos, id, titulo: datos.titulo.trim(), precio, stock }
    guardar('productos', [...leer('productos', []), nuevo])
    guardar('contador_productos', id)
    return nuevo
  }),
  actualizar: op((id, cambios) => {
    const lista = leer('productos', [])
    const i = lista.findIndex((p) => p.id === Number(id))
    if (i < 0) error('Producto no encontrado.')
    if ('precio' in cambios) cambios.precio = Number(String(cambios.precio).replace(/\D/g, ''))
    if ('stock' in cambios && (!Number.isInteger(Number(cambios.stock)) || Number(cambios.stock) < 0)) error('Stock no válido.')
    lista[i] = { ...lista[i], ...cambios, id: lista[i].id }
    guardar('productos', lista)
    return lista[i]
  }),
  eliminar: op((id) => {
    const lista = leer('productos', [])
    if (!lista.some((p) => p.id === Number(id))) error('Producto no encontrado.')
    guardar('productos', lista.filter((p) => p.id !== Number(id)))
    return true
  }),
}



// ---------- Usuarios ----------
const normalizarRut = (r) => String(r).replace(/[^0-9kK]/g, '').toUpperCase()

const usuarios = {
  listar: op((filtro = {}) =>
    leer('usuarios', []).filter((u) => !filtro.rol || u.rol === filtro.rol).map(sinClave)),
  obtener: op((rut) => {
    const u = leer('usuarios', []).find((x) => x.rut === normalizarRut(rut))
    return u ? sinClave(u) : null
  }),
  crear: op(async ({ clave, ...datos }) => {
    const rut = normalizarRut(datos.rut)
    const lista = leer('usuarios', [])
    if (rut.length < 8) error('El RUT no es válido.')
    if (!datos.correo?.includes('@')) error('El correo no es válido.')
    if (!clave || clave.length < 6) error('La contraseña debe tener al menos 6 caracteres.')
    if (lista.some((u) => u.rut === rut)) error('Ya existe un usuario con ese RUT.')
    if (lista.some((u) => u.correo.toLowerCase() === datos.correo.toLowerCase())) error('Ya existe un usuario con ese correo.')
    const nuevo = { rol: 'Cliente', ...datos, rut, passHash: await hash(clave), creado: new Date().toISOString() }
    guardar('usuarios', [...lista, nuevo])
    return sinClave(nuevo)
  }),
  actualizar: op(async (rut, { clave, ...cambios }) => {
    const lista = leer('usuarios', [])
    const i = lista.findIndex((u) => u.rut === normalizarRut(rut))
    if (i < 0) error('Usuario no encontrado.')
    if (clave) { if (clave.length < 6) error('La contraseña debe tener al menos 6 caracteres.'); cambios.passHash = await hash(clave) }
    lista[i] = { ...lista[i], ...cambios, rut: lista[i].rut }
    guardar('usuarios', lista)
    return sinClave(lista[i])
  }),
  eliminar: op((rut) => {
    const lista = leer('usuarios', [])
    const objetivo = lista.find((u) => u.rut === normalizarRut(rut))
    if (!objetivo) error('Usuario no encontrado.')
    if (objetivo.rol === 'Administrador' && lista.filter((u) => u.rol === 'Administrador').length === 1) error('No puedes eliminar al único administrador.')
    guardar('usuarios', lista.filter((u) => u !== objetivo))
    return true
  }),
  /** Devuelve el usuario (sin contraseña) si las credenciales son correctas; si no, null. */
  autenticar: op(async (correo, clave) => {
    const u = leer('usuarios', []).find((x) => x.correo.toLowerCase() === String(correo).toLowerCase())
    return u && u.passHash === (await hash(clave)) ? sinClave(u) : null
  }),
}




// ---------- Órdenes ----------
const ordenes = {
  listar: op((filtro = {}) =>
    leer('ordenes', []).filter((o) => !filtro.correo || o.correo === filtro.correo)
      .sort((a, b) => b.fecha.localeCompare(a.fecha))),
  obtener: op((numero) => leer('ordenes', []).find((o) => o.numero === numero) ?? null),
  /** Crea la orden y descuenta el stock de cada producto comprado. */
  crear: op(({ items, ...datos }) => {
    if (!items?.length) error('La orden no tiene productos.')
    const lista = leer('productos', [])
    for (const it of items) {
      const p = lista.find((x) => x.titulo === it.nombre)
      if (p && p.stock < it.cantidad) error(`Stock insuficiente de "${p.titulo}" (quedan ${p.stock}).`)
    }
    for (const it of items) {
      const p = lista.find((x) => x.titulo === it.nombre)
      if (p) p.stock -= it.cantidad
    }
    guardar('productos', lista)
    const orden = {
      numero: 'CP-' + Date.now().toString().slice(-8),
      fecha: new Date().toISOString(),
      estado: 'Pagada',
      items,
      total: items.reduce((t, i) => t + i.precio * i.cantidad, 0),
      ...datos,
    }
    guardar('ordenes', [...leer('ordenes', []), orden])
    return orden
  }),
  cambiarEstado: op((numero, estado) => {
    const lista = leer('ordenes', [])
    const o = lista.find((x) => x.numero === numero)
    if (!o) error('Orden no encontrada.')
    o.estado = estado
    guardar('ordenes', lista)
    return o
  }),
}





// ---------- Estadísticas (útiles para el panel de administración) ----------
const resumen = op(() => ({
  productosActivos: leer('productos', []).filter((p) => p.activo).length,
  usuariosRegistrados: leer('usuarios', []).length,
  ordenesPendientes: leer('ordenes', []).filter((o) => o.estado === 'Pendiente').length,
  ventasTotales: leer('ordenes', []).reduce((t, o) => t + o.total, 0),
}))

/** Borra todo y vuelve a cargar los datos iniciales. */
async function resetear() {
  Object.keys(localStorage).filter((k) => k.startsWith(PREFIJO)).forEach((k) => localStorage.removeItem(k))
  listo = null
  await iniciar()
}

export const db = { productos, usuarios, ordenes, resumen, resetear }
