import { apiFetch } from './config' //consumo de api para backend jeje por fetch

export const adaptarProducto = (p) => ({
  ...p,
  tipo: p.tipoProducto?.nombre || p.tipo || 'Película',
  categoria: p.categoria?.nombre || p.categoria || '',
  genero: p.genero?.nombre || p.genero || '',
  plataforma: p.plataforma?.nombre || p.plataforma || null,
  compra: p.precio,
  arriendo: p.precioArriendo ?? Math.round((p.precio || 0) * 0.25),
})

export const productosApi = {
  listar: async () => (await apiFetch('/productos')).map(adaptarProducto),
  obtener: async (id) => adaptarProducto(await apiFetch(`/productos/${id}`)),
  crear: (datos) => apiFetch('/productos', { method: 'POST', body: JSON.stringify(datos) }),
  actualizar: (id, datos) => apiFetch(`/productos/${id}`, { method: 'PUT', body: JSON.stringify(datos) }),
  eliminar: (id) => apiFetch(`/productos/${id}`, { method: 'DELETE' }),
}

export const catalogosApi = {
  tipos: () => apiFetch('/tipos-producto'),
  categorias: () => apiFetch('/categorias'),
  generos: () => apiFetch('/generos'),
  plataformas: () => apiFetch('/plataformas'),
}

export const usuariosApi = {
  listar: () => apiFetch('/usuarios'),
  obtener: (id) => apiFetch(`/usuarios/${id}`),
  registrar: (usuario) => apiFetch('/usuarios/registro', { method: 'POST', body: JSON.stringify(usuario) }),
  crearAdmin: (usuario) => apiFetch('/usuarios', { method: 'POST', body: JSON.stringify(usuario) }),
  login: (correo, clave) => apiFetch('/usuarios/login', { method: 'POST', body: JSON.stringify({ correo, clave }) }),
  refresh: () => apiFetch('/usuarios/refresh', { method: 'POST' }),
  actualizar: (id, datos) => apiFetch(`/usuarios/${id}`, { method: 'PUT', body: JSON.stringify(datos) }),
  eliminar: (id) => apiFetch(`/usuarios/${id}`, { method: 'DELETE' }),
}

export const ordenesApi = {
  listar: () => apiFetch('/ordenes'),
  registrar: (orden) => apiFetch('/ordenes/registrar', { method: 'POST', body: JSON.stringify(orden) }),
}

export const pagosApi = {
  procesar: (pago) => apiFetch('/pagos/procesar', { method: 'POST', body: JSON.stringify(pago) }),
}

export const blogApi = {
  listar: () => apiFetch('/blog'),
  obtener: (id) => apiFetch(`/blog/${id}`),
}
