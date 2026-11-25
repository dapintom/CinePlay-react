import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import { AdminProvider } from './context/AdminContext'

import Home from './pages/Home'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import Carrito from './pages/Carrito'
import Pago from './pages/Pago'
import ResumenCompra from './pages/ResumenCompra'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Contacto from './pages/Contacto'
import Nosotros from './pages/Nosotros'
import Blog from './pages/Blog'
import DetalleBlog from './pages/DetalleBlog'
import NotFound from './pages/NotFound'

import AdminHome from './pages/admin/AdminHome'
import AdminProductos from './pages/admin/AdminProductos'
import AdminNuevoProducto from './pages/admin/AdminNuevoProducto'
import AdminUsuarios from './pages/admin/AdminUsuarios'
import AdminNuevoUsuario from './pages/admin/AdminNuevoUsuario'




// Al cambiar de página, vuelve arriba )
function ScrollAlInicio() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <AdminProvider>
      <ScrollAlInicio />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="productos" element={<Productos />} />
          <Route path="producto/:id" element={<DetalleProducto />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="pago" element={<Pago />} />
          <Route path="resumen-compra" element={<ResumenCompra />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<DetalleBlog />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route path="productos/nuevo" element={<AdminNuevoProducto />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
          <Route path="usuarios/nuevo" element={<AdminNuevoUsuario />} />
        </Route>
      </Routes>
    </AdminProvider>
  )
}
