import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { correoValido } from '../utils/formato'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState({})
  const [errorAuth, setErrorAuth] = useState('')
  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()

  const enviar = async (e) => {
    e.preventDefault()
    setErrorAuth('')
    const correo = email.trim()
    const errs = {}
    if (!correoValido(correo)) errs.email = 'Ingresa un correo válido.'
    if (password.length < 6) errs.password = 'La contraseña debe tener al menos 6 caracteres.'
    setErrores(errs)
    if (Object.keys(errs).length) return

    try {
      const { esAdmin } = await iniciarSesion(correo, password)
      alert(esAdmin ? '¡Sesión iniciada como Administrador!' : '¡Inicio de sesión exitoso!')
      navigate(esAdmin ? '/admin' : '/')
    } catch (err) {
      setErrorAuth(err.message || 'Correo o contraseña incorrectos.')
    }
  }

  return (
    <main className="container my-5" style={{ maxWidth: 460 }}>
      <div className="card">
        <div className="card-body p-4 p-md-5">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          {errorAuth && <div className="alert alert-danger py-2">{errorAuth}</div>}
          <form onSubmit={enviar} noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico:</label>
              <input type="email" id="email" className="form-control" placeholder="ejemplo: admin@cineplay.cl" value={email} onChange={(e) => setEmail(e.target.value)} />
              <span className="error-message">{errores.email}</span>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input type="password" id="password" className="form-control" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} />
              <span className="error-message">{errores.password}</span>
            </div>
            <button type="submit" className="btn btn-primary w-100">Ingresar</button>
          </form>
        </div>
      </div>
    </main>
  )
}
