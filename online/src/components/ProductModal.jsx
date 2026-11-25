import { useEffect } from 'react'
import { useCarrito } from '../context/CarritoContext'
import { clp } from '../utils/formato'

// Ventana con el resumen del producto (antes se armaba con la clase Modal de Bootstrap vía JS).
export default function ProductModal({ producto: p, onCerrar }) {
  const { addToCart } = useCarrito()

  useEffect(() => {
    if (!p) return
    const alTeclear = (e) => { if (e.key === 'Escape') onCerrar() }
    document.addEventListener('keydown', alTeclear)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', alTeclear)
      document.body.classList.remove('modal-open')
    }
  }, [p, onCerrar])

  if (!p) return null

  const agregar = (precio, tipo) => {
    addToCart(p.titulo, precio, p.imagen, tipo)
    onCerrar()
  }

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true" aria-label={p.titulo} onClick={onCerrar}>
        <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content resumen-modal">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title text-primary">Resumen del producto</h5>
              <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCerrar} />
            </div>
            <div className="modal-body">
              <div className="row g-4">
                <div className="col-md-5">
                  <img className="img-fluid rounded border border-primary" src={p.imagen} alt={p.titulo} />
                </div>
                <div className="col-md-7">
                  <h3>{p.titulo}</h3>
                  <p className="mb-1">
                    <span className="badge bg-primary">{p.tipo}</span>{' '}
                    {p.plataforma && <span className="badge bg-secondary">{p.plataforma}</span>}
                  </p>
                  <p className="genero-tag">{p.genero}</p>
                  <p className="text-secondary">{p.sinopsis}</p>
                  <ul className="list-unstyled mb-3">
                    <li>Arriendo: <strong className="total-monto fs-5">{clp(p.arriendo)}</strong></li>
                    <li>Compra: <strong className="total-monto fs-5">{clp(p.compra)}</strong></li>
                  </ul>
                  <div className="d-flex gap-2 flex-wrap">
                    <button className="btn btn-outline-primary" onClick={() => agregar(p.arriendo, 'Arriendo')}>Arrendar</button>
                    <button className="btn btn-primary" onClick={() => agregar(p.compra, 'Compra')}>Comprar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  )
}
