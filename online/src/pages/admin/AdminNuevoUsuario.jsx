import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

export default function AdminNuevoUsuario() {
  const { agregarUsuario } = useAdmin()
  const navigate = useNavigate()
  const [f, setF] = useState({ rut: '', nombre: '', apellidos: '', correo: '', pass: '', rol: 'Cliente', direccion: '' })
  const cambiar = (e) => setF((prev) => ({ ...prev, [e.target.id]: e.target.value }))

  const enviar = (e) => {
    e.preventDefault()
    const nombre = f.nombre.trim()
    const correo = f.correo.trim()
    if (!nombre || !correo) {
      alert('Por favor completa todos los campos obligatorios.')
      return
    }
    agregarUsuario({
      rut: f.rut.trim(),
      nombre: `${nombre} ${f.apellidos.trim()}`.trim(),
      correo,
      comuna: '—',
      rol: f.rol,
    })
    alert(`¡Usuario "${nombre} ${f.apellidos.trim()}" guardado!`)
    navigate('/admin/usuarios')
  }

  return (
    <main className="container py-4" style={{ maxWidth: 700 }}>
      <Link to="/admin/usuarios" className="fw-bold text-decoration-none">← Volver a Lista de Usuarios</Link>
      <div className="admin-card mt-3 p-4">
        <h2 className="h4 text-primary mb-4">👤 FORMULARIO DE USUARIO</h2>
        <form onSubmit={enviar}>
          <div className="mb-3">
            <label htmlFor="rut" className="form-label">RUN / RUT (Sin puntos ni guión):</label>
            <input type="text" id="rut" className="form-control" placeholder="19011022K" required value={f.rut} onChange={cambiar} />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="nombre" className="form-label">Nombre:</label>
              <input type="text" id="nombre" className="form-control" placeholder="Juan" required value={f.nombre} onChange={cambiar} />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="apellidos" className="form-label">Apellidos:</label>
              <input type="text" id="apellidos" className="form-control" placeholder="Pérez González" required value={f.apellidos} onChange={cambiar} />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo Electrónico:</label>
            <input type="email" id="correo" className="form-control" placeholder="ejemplo@duoc.cl" required value={f.correo} onChange={cambiar} />
          </div>
          <div className="mb-3">
            <label htmlFor="pass" className="form-label">Contraseña:</label>
            <input type="password" id="pass" className="form-control" placeholder="••••••••" required value={f.pass} onChange={cambiar} />
          </div>
          <div className="mb-3">
            <label htmlFor="rol" className="form-label">Rol de Usuario:</label>
            <select id="rol" className="form-select" value={f.rol} onChange={cambiar}>
              <option value="Cliente">Cliente</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">Dirección:</label>
            <input type="text" id="direccion" className="form-control" placeholder="Av. Siempre Viva 123" value={f.direccion} onChange={cambiar} />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-2">Guardar Usuario</button>
        </form>
      </div>
    </main>
  )
}
