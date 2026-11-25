import { Link } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

export default function AdminHome() {
  const { productos, usuarios } = useAdmin()

  return (
    <main className="container py-4">
      <div className="seccion-header">
        <div><h2>⚙️ Panel de Control</h2><p className="subtitulo mb-0">Bienvenido al sistema de administración interno</p></div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-3 mt-2">
        <div className="col"><article className="admin-card h-100">
          <span className="badge-cat bg-primary position-static d-inline-block">Inventario</span>
          <h3 className="h5 mt-3">📦 Gestión de Productos</h3>
          <p className="text-secondary">Administra el inventario de películas y videojuegos, precios, stock y categorías.</p>
          <Link to="/admin/productos" className="btn btn-primary btn-sm">Ver Lista</Link>
        </article></div>
        <div className="col"><article className="admin-card h-100">
          <span className="badge-cat badge-fucsia position-static d-inline-block">Usuarios</span>
          <h3 className="h5 mt-3">👥 Gestión de Usuarios</h3>
          <p className="text-secondary">Administra los datos de los clientes registrados, roles y permisos de acceso.</p>
          <Link to="/admin/usuarios" className="btn btn-primary btn-sm">Ver Lista</Link>
        </article></div>
      </div>
      <div className="admin-card mt-4">
        <h3 className="h5">📊 Resumen del Sistema</h3>
        <ul className="list-group list-group-flush mt-3">
          <li className="list-group-item bg-transparent d-flex justify-content-between"><span>Total de Productos Activos</span><strong>{productos.length}</strong></li>
          <li className="list-group-item bg-transparent d-flex justify-content-between"><span>Total de Usuarios Registrados</span><strong>{usuarios.length}</strong></li>
          <li className="list-group-item bg-transparent d-flex justify-content-between"><span>Órdenes Pendientes</span><strong>3</strong></li>
        </ul>
      </div>
    </main>
  )
}
