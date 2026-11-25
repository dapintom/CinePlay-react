import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { correoValido } from '../utils/formato'

export default function Registro() {
  const [f, setF] = useState({ nombre: '', apellidos: '', email: '', password: '' })
  const [errores, setErrores] = useState({})
  const navigate = useNavigate()

  const cambiar = (e) => setF((prev) => ({ ...prev, [e.target.id]: e.target.value }))

  const enviar = (e) => {
    e.preventDefault()
    const nombre = f.nombre.trim()
    const apellidos = f.apellidos.trim()
    const errs = {}
    if (nombre.length < 2) errs.nombre = 'Ingresa tu nombre.'
    if (apellidos && apellidos.length < 2) errs.apellidos = 'Ingresa tus apellidos.'
    if (!correoValido(f.email.trim())) errs.email = 'Ingresa un correo válido.'
    if (f.password.length < 6) errs.password = 'Mínimo 6 caracteres.'
    setErrores(errs)
    if (Object.keys(errs).length) return

    // Solo confirma el registro y envía a Iniciar sesión (no inicia sesión automáticamente)
    alert('¡Registro completado con éxito! Ahora puedes iniciar sesión.')
    navigate('/login')
  }

  return (
    <main className="container my-5" style={{ maxWidth: 520 }}>
      <div className="card"><div className="card-body p-4">
        <h2 className="text-center">Crear Cuenta</h2>
        <p className="subtitulo text-center mb-3">Únete a CinePlay</p>
        <form onSubmit={enviar} noValidate>
          <div className="row">
            <div className="col-md-6"><div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" id="nombre" className="form-control" placeholder="Tu nombre" value={f.nombre} onChange={cambiar} />
              <span className="error-message">{errores.nombre}</span>
            </div></div>
            <div className="col-md-6"><div className="mb-3">
              <label htmlFor="apellidos" className="form-label">Apellidos</label>
              <input type="text" id="apellidos" className="form-control" placeholder="Tus apellidos" value={f.apellidos} onChange={cambiar} />
              <span className="error-message">{errores.apellidos}</span>
            </div></div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input type="email" id="email" className="form-control" placeholder="ejemplo@correo.com" value={f.email} onChange={cambiar} />
            <span className="error-message">{errores.email}</span>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" id="password" className="form-control" placeholder="6 caracteres" value={f.password} onChange={cambiar} />
            <span className="error-message">{errores.password}</span>
          </div>
          <button type="submit" className="btn btn-primary w-100">Registrarse</button>
          <p className="text-center text-secondary mt-4 mb-0">
            ¿Ya tienes una cuenta? <Link to="/login" className="fw-bold text-decoration-none">Inicia sesión aquí</Link>
          </p>
        </form>
      </div></div>
    </main>
  )
}
