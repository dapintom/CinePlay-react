import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminNavbar() {
  const [abierto, setAbierto] = useState(false)
  const { cerrarSesion } = useAuth()
  const navigate = useNavigate()
  const cls = ({ isActive }) => 'nav-link' + (isActive ? ' active' : '')

  const salir = (e) => {
    e.preventDefault()
    cerrarSesion()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top px-lg-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">🎬 CinePlay (ADMIN)</Link>
        <button className="navbar-toggler" type="button" aria-expanded={abierto} aria-label="Mostrar menú" onClick={() => setAbierto((v) => !v)}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className={'collapse navbar-collapse' + (abierto ? ' show' : '')} id="menu">
          <ul className="navbar-nav mx-lg-auto" onClick={() => setAbierto(false)}>
            <li className="nav-item"><NavLink className={cls} to="/admin" end>Panel Principal</NavLink></li>
            <li className="nav-item"><NavLink className={cls} to="/admin/productos">Productos</NavLink></li>
            <li className="nav-item"><NavLink className={cls} to="/admin/usuarios">Usuarios</NavLink></li>
          </ul>
          <div className="d-flex align-items-center gap-2 user-actions">
            <span>Hola, Admin</span>
            <span className="text-secondary">|</span>
            <a className="nav-link" href="#" onClick={salir}>Cerrar Sesión</a>
          </div>
        </div>
      </div>
    </nav>
  )
}
