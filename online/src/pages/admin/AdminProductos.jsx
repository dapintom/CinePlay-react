import { Link } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

const botonTexto = (color) => ({ background: 'transparent', border: 'none', color, cursor: 'pointer', fontWeight: 'bold' })

export default function AdminProductos() {
  const { productos, editarProducto, eliminarProducto } = useAdmin()

  const eliminar = (p) => {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) eliminarProducto(p.id)
  }

  // Edición rápida con ventanas del navegador, igual que en el sitio original
  const editar = (p) => {
    const cambios = {}
    const titulo = prompt('Editar título:', p.titulo)
    if (titulo !== null && titulo.trim() !== '') cambios.titulo = titulo
    const precio = prompt('Editar precio:', p.precio)
    if (precio !== null && precio.trim() !== '') cambios.precio = precio
    const stock = prompt('Editar stock:', p.stock)
    if (stock !== null && stock.trim() !== '') cambios.stock = stock
    editarProducto(p.id, cambios)
  }

  return (
    <main className="container py-4">
      <div className="seccion-header">
        <div><h2>📦 Gestión de Productos</h2><p className="subtitulo mb-0">Administra el catálogo de películas y videojuegos</p></div>
        <Link to="/admin/productos/nuevo" className="btn btn-primary">+ Agregar Producto</Link>
      </div>
      <div className="admin-card mt-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle tabla-admin mb-0">
            <thead><tr><th>ID</th><th>Imagen</th><th>Título</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    {p.imagen
                      ? <img src={p.imagen} width="40" height="55" style={{ borderRadius: 4, objectFit: 'cover' }} alt={p.titulo} />
                      : <span className="d-inline-block bg-secondary" style={{ width: 40, height: 55, borderRadius: 4 }} />}
                  </td>
                  <td>{p.titulo}</td>
                  <td>{p.categoria}</td>
                  <td>{p.precio}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button onClick={() => editar(p)} style={{ ...botonTexto('#00d2ff'), marginRight: 10 }}>Editar</button>
                    <button onClick={() => eliminar(p)} style={botonTexto('#ff4d4d')}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {productos.length === 0 && (
                <tr><td colSpan={7} className="text-secondary text-center">No hay productos.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
