export default function Footer({ admin = false }) {
  return (
    <footer>
      <p className="mb-0">
        &copy; 2026 CinePlay. {admin ? 'Panel Administrativo Interno.' : 'Todos los derechos reservados.'}
      </p>
    </footer>
  )
}
