import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

const CATEGORIAS = ['Película / Acción', 'Película / Sci-Fi', 'Juego / Acción', 'Juego / Aventura']

export default function AdminNuevoProducto() {
  const { agregarProducto } = useAdmin()
  const navigate = useNavigate()
  const [f, setF] = useState({ titulo: '', categoria: CATEGORIAS[0], precio: '', stock: '' })
  const cambiar = (e) => setF((prev) => ({ ...prev, [e.target.id]: e.target.value }))

  const enviar = (e) => {
    e.preventDefault()
    const precio = f.precio.trim()
    agregarProducto({
      titulo: f.titulo.trim(),
      categoria: f.categoria,
      precio: precio.startsWith('$') ? precio : '$' + precio,
      stock: Number(f.stock) || 0,
    })
    navigate('/admin/productos')
  }

  return (
    <main className="container py-4" style={{ maxWidth: 700 }}>
      <Link to="/admin/productos" className="fw-bold text-decoration-none">← Volver a Lista de Productos</Link>
      <div className="admin-card mt-3 p-4">
        <h2 className="h4 text-primary mb-4">📦 FORMULARIO DE PRODUCTO</h2>
        <form onSubmit={enviar}>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Título del Producto:</label>
            <input type="text" id="titulo" className="form-control" placeholder="Ej: Matrix Resurrections" required value={f.titulo} onChange={cambiar} />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="categoria" className="form-label">Categoría:</label>
              <select id="categoria" className="form-select" value={f.categoria} onChange={cambiar}>
                {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="precio" className="form-label">Precio ($):</label>
              <input type="text" id="precio" className="form-control" placeholder="$19.990" required value={f.precio} onChange={cambiar} />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="stock" className="form-label">Stock Inicial:</label>
            <input type="number" id="stock" min="0" className="form-control" placeholder="10" required value={f.stock} onChange={cambiar} />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-2">Guardar Producto</button>
        </form>
      </div>
    </main>
  )
}
