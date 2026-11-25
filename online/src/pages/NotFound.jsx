import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="container my-5 text-center">
      <h1>Página no encontrada</h1>
      <p className="text-secondary">La dirección que buscas no existe o fue movida.</p>
      <Link to="/" className="btn btn-primary">Volver al inicio</Link>
    </main>
  )
}
