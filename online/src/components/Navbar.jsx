import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const { cantidadTotal } = useCarrito()
  const { nombre, esAdmin, cerrarSesion } = useAuth()

  const categoria = new URLSearchParams(search).get('categoria')
  const enCatalogo = pathname === '/productos'
  const cls = (activo) => 'nav-link' + (activo ? ' active' : '')
  const cerrarMenu = () => setAbierto(false)

  const salir = (e) => {
    e.preventDefault()
    cerrarSesion()
    alert('Sesión cerrada correctamente.')
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top px-lg-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={cerrarMenu}>🎬 CinePlay</Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="menu"
          aria-expanded={abierto}
          aria-label="Mostrar menú"
          onClick={() => setAbierto((v) => !v)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={'collapse navbar-collapse' + (abierto ? ' show' : '')} id="menu">
          <ul className="navbar-nav mx-lg-auto" onClick={cerrarMenu}>
            <li className="nav-item"><Link className={cls(pathname === '/')} to="/">Inicio</Link></li>
            <li className="nav-item"><Link className={cls(enCatalogo && categoria === 'peliculas')} to="/productos?categoria=peliculas">Películas</Link></li>
            <li className="nav-item"><Link className={cls(enCatalogo && categoria === 'videojuegos')} to="/productos?categoria=videojuegos">Videojuegos</Link></li>
            <li className="nav-item"><Link className={cls(pathname === '/nosotros')} to="/nosotros">Nosotros</Link></li>
            <li className="nav-item"><Link className={cls(pathname.startsWith('/blog'))} to="/blog">Blog</Link></li>
            <li className="nav-item"><Link className={cls(pathname === '/contacto')} to="/contacto">Contacto</Link></li>
            {esAdmin && (
              <li className="nav-item"><Link className="nav-link" to="/admin">Panel Admin</Link></li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2 user-actions">
            {nombre ? (
              <>
                <span style={{ color: '#ff1493', fontWeight: 'bold' }}>Hola, {esAdmin ? 'Admin' : nombre}</span>
                <span>|</span>
                <a className="nav-link" href="#" onClick={salir}>Cerrar sesión</a>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login" onClick={cerrarMenu}>Iniciar sesión</Link>
                <span className="text-secondary">|</span>
                <Link className="nav-link" to="/registro" onClick={cerrarMenu}>Registrar usuario</Link>
              </>
            )}
            <Link className="btn btn-outline-primary ms-lg-2" to="/carrito" onClick={cerrarMenu}>
              🛒 Carrito ({cantidadTotal})
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
