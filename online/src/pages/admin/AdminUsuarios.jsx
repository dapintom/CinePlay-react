import { Link } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

export default function AdminUsuarios() {
  const { usuarios, eliminarUsuario } = useAdmin()

  const eliminar = (u) => {
    if (confirm('¿Estás seguro de que deseas eliminar a este usuario?')) eliminarUsuario(u.rut)
  }

  return (
    <main className="container py-4">
      <div className="seccion-header">
        <div><h2>👥 Gestión de Usuarios</h2><p className="subtitulo mb-0">Administra las cuentas y roles registrados en la plataforma</p></div>
        <Link to="/admin/usuarios/nuevo" className="btn btn-primary">+ Agregar Usuario</Link>
      </div>
      <div className="admin-card mt-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle tabla-admin mb-0">
            <thead><tr><th>RUT</th><th>Nombre Completo</th><th>Correo Electrónico</th><th>Comuna</th><th>Rol</th><th>Acciones</th></tr></thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.rut}>
                  <td>{u.rut}</td>
                  <td>{u.nombre}</td>
                  <td>{u.correo}</td>
                  <td>{u.comuna}</td>
                  <td>{u.rol}</td>
                  <td>
                    <Link to="/admin/usuarios/nuevo" style={{ color: '#00d2ff', textDecoration: 'none', marginRight: 10, fontWeight: 'bold' }}>Editar</Link>
                    <button onClick={() => eliminar(u)} style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold' }}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {usuarios.length === 0 && (
                <tr><td colSpan={6} className="text-secondary text-center">No hay usuarios.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
