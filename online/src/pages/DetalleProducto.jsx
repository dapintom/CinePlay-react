import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { PRODUCTOS } from '../data/productos'
import { clp } from '../utils/formato'

export default function DetalleProducto() {
  const { id } = useParams()
  const { addToCart } = useCarrito()
  const [cantidad, setCantidad] = useState(1)
  const p = PRODUCTOS.find((x) => x.id === Number(id))

  if (!p) {
    return (
      <main className="container my-5">
        <h2>Producto no encontrado</h2>
        <Link to="/productos" className="btn btn-primary mt-3">Ir al catálogo</Link>
      </main>
    )
  }

  return (
    <main className="container my-5">
      <div className="row g-4 contenedor-detalle">
        <div className="col-md-5 imagen-detalle">
          <img src={p.imagen} alt={p.titulo} className="img-fluid rounded border border-primary" />
        </div>
        <div className="col-md-7 info-detalle">
          <h2>{p.titulo}</h2>
          <p><strong>Categoría:</strong> {p.genero}</p>
          <p><strong>Formato:</strong> {p.tipo}{p.plataforma ? ` · ${p.plataforma}` : ''}</p>
          <p className="precio total-monto">{clp(p.compra)}</p>
          <div className="acciones-compra d-flex align-items-center gap-2 flex-wrap">
            <label htmlFor="quantity" className="form-label mb-0">Cantidad:</label>
            <input
              type="number" id="quantity" min="1" className="form-control" style={{ width: 90 }}
              value={cantidad} onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value, 10) || 1))}
            />
            <button className="btn btn-primary btn-primario" onClick={() => addToCart(p.titulo, p.compra, p.imagen, 'Compra', cantidad)}>
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
