import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Contacto() {
  const [f, setF] = useState({ nombre: '', email: '', mensaje: '' })
  const navigate = useNavigate()
  const cambiar = (e) => setF((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const enviar = (e) => {
    e.preventDefault() // los campos "required" ya los valida el navegador
    alert('¡Mensaje enviado con éxito!')
    navigate('/')
  }

  return (
    <main className="container my-5" style={{ maxWidth: 640 }}>
      <h2>📩 Contáctanos</h2>
      <p className="text-secondary mb-4">¿Tienes dudas o consultas? Envíanos un mensaje.</p>
      <form onSubmit={enviar}>
        <div className="mb-3">
          <label htmlFor="c-nombre" className="form-label">Nombre:</label>
          <input type="text" id="c-nombre" name="nombre" className="form-control" required placeholder="Tu nombre" value={f.nombre} onChange={cambiar} />
        </div>
        <div className="mb-3">
          <label htmlFor="c-email" className="form-label">Correo Electrónico:</label>
          <input type="email" id="c-email" name="email" className="form-control" required placeholder="correo@ejemplo.com" value={f.email} onChange={cambiar} />
        </div>
        <div className="mb-3">
          <label htmlFor="c-mensaje" className="form-label">Mensaje:</label>
          <textarea id="c-mensaje" name="mensaje" rows={4} className="form-control" required placeholder="Escribe tu mensaje aquí..." value={f.mensaje} onChange={cambiar} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Enviar Mensaje</button>
      </form>
    </main>
  )
}
