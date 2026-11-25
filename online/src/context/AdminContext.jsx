import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { productosApi, usuariosApi } from '../api'

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [productos, setProductos] = useState([])
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    productosApi.listar()
      .then((data) => {
        if (Array.isArray(data)) {
          setProductos(data.map((p) => ({
            ...p,
            precio: typeof p.precio === 'number' ? `$${p.precio.toLocaleString('es-CL')}` : p.precio,
          })))
        }
      })
      .catch(() => {})

    usuariosApi.listar()
      .then((data) => {
        if (Array.isArray(data)) {
          setUsuarios(data.map((u) => ({
            ...u,
            nombre: `${u.nombre} ${u.apellidos || ''}`.trim(),
          })))
        }
      })
      .catch(() => {})
  }, [])

  const agregarProducto = useCallback(async (datos) => {
    const precioNum = Number(String(datos.precio).replace(/\D/g, '')) || 0
    const creado = await productosApi.crear({
      titulo: datos.titulo,
      precio: precioNum,
      precioArriendo: Math.round(precioNum * 0.25),
      stock: Number(datos.stock) || 0,
      imagen: '/imagenes/dune2.jpg',
      activo: true,
    })
    setProductos((prev) => [...prev, { ...creado, categoria: datos.categoria, precio: `$${precioNum.toLocaleString('es-CL')}` }])
  }, [])

  const editarProducto = useCallback(async (id, cambios) => {
    const payload = { ...cambios }
    if (payload.precio) payload.precio = Number(String(payload.precio).replace(/\D/g, ''))
    if (payload.stock) payload.stock = Number(payload.stock)
    await productosApi.actualizar(id, payload)
    setProductos((prev) => prev.map((p) => (p.id === id ? { ...p, ...cambios } : p)))
  }, [])

  const eliminarProducto = useCallback(async (id) => {
    await productosApi.eliminar(id)
    setProductos((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const agregarUsuario = useCallback(async (u) => {
    const creado = await usuariosApi.crearAdmin({
      rut: u.rut,
      nombre: u.nombre,
      apellidos: '',
      correo: u.correo,
      clave: u.pass || '123456',
      rol: u.rol || 'Cliente',
      comuna: u.comuna || 'Santiago',
    })
    setUsuarios((prev) => [...prev, creado])
  }, [])

  const eliminarUsuario = useCallback(async (rut) => {
    const encontrado = usuarios.find((u) => u.rut === rut)
    if (encontrado?.id) {
      await usuariosApi.eliminar(encontrado.id)
    }
    setUsuarios((prev) => prev.filter((u) => u.rut !== rut))
  }, [usuarios])

  const valor = useMemo(
    () => ({ productos, usuarios, agregarProducto, editarProducto, eliminarProducto, agregarUsuario, eliminarUsuario }),
    [productos, usuarios, agregarProducto, editarProducto, eliminarProducto, agregarUsuario, eliminarUsuario],
  )
  return <AdminContext.Provider value={valor}>{children}</AdminContext.Provider>
}

export const useAdmin = () => useContext(AdminContext)
