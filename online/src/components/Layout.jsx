import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useCarrito } from '../context/CarritoContext'

// Estructura común de las páginas públicas: notificación + navbar + contenido + footer
export default function Layout() {
  const { aviso } = useCarrito()
  return (
    <>
      <div className="notificacion-carrito" role="status" style={{ display: aviso ? 'block' : 'none' }}>
        {aviso}
      </div>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
