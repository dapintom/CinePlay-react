import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

// Reemplaza a public/js/carrito.js: el carrito vive en estado de React y se guarda en localStorage.
const CLAVE = 'carritoCinePlay'
const CarritoContext = createContext(null)

const leerGuardado = () => {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE))
    return Array.isArray(datos) ? datos : []
  } catch {
    return []
  }
}

// Un producto se identifica por nombre + modalidad (Arriendo / Compra)
const mismo = (it, nombre, tipo) => it.nombre === nombre && it.tipo === tipo

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(leerGuardado)
  const [aviso, setAviso] = useState('')
  const temporizador = useRef(null)

  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(items))
  }, [items])

  const notificar = useCallback((mensaje) => {
    setAviso(mensaje)
    clearTimeout(temporizador.current)
    temporizador.current = setTimeout(() => setAviso(''), 3000)
  }, [])

  const addToCart = useCallback((nombre, precio, imagen = '', tipo = 'Compra', cantidad = 1) => {
    const precioNumerico = Number(String(precio).replace('$', '').replace(/\./g, '').trim()) || 0
    setItems((prev) =>
      prev.some((it) => mismo(it, nombre, tipo))
        ? prev.map((it) => (mismo(it, nombre, tipo) ? { ...it, cantidad: it.cantidad + cantidad } : it))
        : [...prev, { id: Date.now(), nombre, precio: precioNumerico, imagen, tipo, cantidad }],
    )
    notificar(`¡${nombre} (${tipo}) agregado al carrito!`)
  }, [notificar])

  const cambiarCantidad = useCallback((nombre, tipo, nueva) => {
    const cantidad = parseInt(nueva, 10)
    if (!(cantidad > 0)) return
    setItems((prev) => prev.map((it) => (mismo(it, nombre, tipo) ? { ...it, cantidad } : it)))
  }, [])

  const eliminar = useCallback((nombre, tipo) => {
    setItems((prev) => prev.filter((it) => !mismo(it, nombre, tipo)))
  }, [])

  const vaciar = useCallback(() => setItems([]), [])

  const total = useMemo(() => items.reduce((t, it) => t + it.precio * it.cantidad, 0), [items])
  const cantidadTotal = useMemo(() => items.reduce((t, it) => t + it.cantidad, 0), [items])

  const valor = useMemo(
    () => ({ items, total, cantidadTotal, aviso, addToCart, cambiarCantidad, eliminar, vaciar }),
    [items, total, cantidadTotal, aviso, addToCart, cambiarCantidad, eliminar, vaciar],
  )

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}

export const useCarrito = () => useContext(CarritoContext)
