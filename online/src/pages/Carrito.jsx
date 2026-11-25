import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { clp } from '../utils/formato'

// Input controlado con texto local: permite borrar el número antes de escribir otro
function CantidadInput({ valor, onCambio }) {
  const [texto, setTexto] = useState(String(valor))
  useEffect(() => setTexto(String(valor)), [valor])
  return (
    <input
      type="number" min="1" className="input-cantidad" value={texto}
      onChange={(e) => { setTexto(e.target.value); onCambio(e.target.value) }}
      onBlur={() => setTexto(String(valor))}
    />
  )
}

export default function Carrito() {
  const { items, total, cambiarCantidad, eliminar, vaciar } = useCarrito()
  const navigate = useNavigate()

  const finalizar = () => {
    if (items.length === 0) {
      alert('Tu carrito está vacío. Agrega productos antes de pagar.')
      return
    }
    navigate('/pago')
  }

  return (
    <main className="container my-5">
      <h2 className="mb-4">🛒 Tu Carrito de Compras</h2>
      <div className="table-responsive">
        <table className="table table-hover align-middle tabla-carrito">
          <thead>
            <tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th>Acción</th></tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan={5} className="sin-items">El carrito está vacío.</td></tr>
            ) : (
              items.map((it) => (
                <tr key={it.nombre + '|' + it.tipo}>
                  <td>
                    <div className="col-producto">
                      {it.imagen && <img src={it.imagen} className="img-miniatura" alt="" />}
                      <div>
                        <strong>{it.nombre}</strong><br />
                        <small className="texto-tipo">Modalidad: {it.tipo}</small>
                      </div>
                    </div>
                  </td>
                  <td>{clp(it.precio)}</td>
                  <td>
                    <CantidadInput valor={it.cantidad} onCambio={(v) => cambiarCantidad(it.nombre, it.tipo, v)} />
                  </td>
                  <td className="texto-subtotal">{clp(it.precio * it.cantidad)}</td>
                  <td>
                    <button onClick={() => eliminar(it.nombre, it.tipo)} className="btn-eliminar" aria-label={`Quitar ${it.nombre}`}>X</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="resumen-carrito d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">
        <button onClick={vaciar} className="btn btn-secondary">Vaciar Carrito</button>
        <div className="text-end">
          <h3>Total: <span className="total-monto">{clp(total)}</span></h3>
          <button onClick={finalizar} className="btn btn-primary">Finalizar Compra</button>
        </div>
      </div>
    </main>
  )
}
