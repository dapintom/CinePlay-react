import { Link } from 'react-router-dom'
import { clp } from '../utils/formato'

const leerOrden = () => {
  try {
    const o = JSON.parse(localStorage.getItem('ultimaCompra'))
    return o && o.items ? o : null
  } catch {
    return null
  }
}

export default function ResumenCompra() {
  const orden = leerOrden()

  if (!orden) {
    return (
      <main className="container my-5" style={{ maxWidth: 820 }}>
        <div className="admin-card text-center">
          <h2 className="h4">No hay una compra reciente</h2>
          <p className="text-secondary">Cuando finalices un pago, el resumen aparecerá aquí.</p>
          <Link to="/productos" className="btn btn-primary">Ir al catálogo</Link>
        </div>
      </main>
    )
  }

  const e = orden.envio
  return (
    <main className="container my-5" style={{ maxWidth: 820 }}>
      <div className="text-center mb-4">
        <div style={{ fontSize: '3rem' }}>✅</div>
        <h1 className="h3">¡Gracias por tu compra!</h1>
        <p className="subtitulo mb-0">Tu pago fue procesado correctamente.</p>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6"><div className="admin-card h-100">
          <h2 className="h6 text-primary">🧾 Datos de la orden</h2>
          <p className="mb-1"><strong>N° de orden:</strong> {orden.numero}</p>
          <p className="mb-1"><strong>Fecha:</strong> {new Date(orden.fecha).toLocaleString('es-CL', { dateStyle: 'long', timeStyle: 'short' })}</p>
          <p className="mb-1"><strong>Cliente:</strong> {orden.cliente}</p>
          <p className="mb-0"><strong>Pago con tarjeta:</strong> •••• {orden.tarjetaFin}</p>
        </div></div>
        <div className="col-md-6"><div className="admin-card h-100">
          <h2 className="h6 text-primary">📦 Dirección de envío</h2>
          <p className="mb-1">{e.direccion}{e.depto ? ', ' + e.depto : ''}</p>
          <p className="mb-1">{e.comuna}, {e.ciudad}</p>
          <p className="mb-0 text-secondary">{e.referencias ? 'Indicaciones: ' + e.referencias : ''}</p>
        </div></div>
      </div>

      <div className="admin-card">
        <h2 className="h6 text-primary">🛒 Productos</h2>
        <div className="table-responsive">
          <table className="table tabla-admin align-middle mb-0">
            <thead><tr><th>Producto</th><th>Precio</th><th>Cant.</th><th className="text-end">Subtotal</th></tr></thead>
            <tbody>
              {orden.items.map((i) => (
                <tr key={i.nombre + '|' + i.tipo}>
                  <td>
                    <div className="col-producto">
                      {i.img && <img src={i.img} alt="" className="img-miniatura" />}
                      <div>
                        {i.nombre}
                        {i.tipo && <div className="texto-tipo">{i.tipo}</div>}
                      </div>
                    </div>
                  </td>
                  <td>{clp(i.precio)}</td>
                  <td>{i.cantidad}</td>
                  <td className="text-end texto-subtotal">{clp(i.precio * i.cantidad)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="resumen-pago-box mb-0">
          <span>Total pagado:</span><strong className="monto-pago">{clp(orden.total)}</strong>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-2 flex-wrap mt-4">
        <Link to="/" className="btn btn-primary">Volver al inicio</Link>
        <button type="button" className="btn btn-secondary" onClick={() => window.print()}>🖨️ Imprimir resumen</button>
      </div>
    </main>
  )
}
