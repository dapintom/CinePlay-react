import { useCarrito } from '../context/CarritoContext'

// Tarjeta de un producto. Al hacer clic en el póster se abre el resumen (onVer).
export default function ProductCard({ producto: p, onVer }) {
  const { addToCart } = useCarrito()
  const ver = () => onVer(p)

  return (
    <div className="card-media h-100">
      <div
        className="poster-container"
        role="button"
        tabIndex={0}
        title="Ver resumen"
        onClick={ver}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ver() } }}
      >
        {p.plataforma && <span className="platform-badge">{p.plataforma}</span>}
        <img src={p.imagen} alt={p.titulo} />
      </div>
      <h4>{p.titulo}</h4>
      <p className="genero-tag">{p.genero}</p>
      <div className="media-actions">
        <button className="btn-card btn-outline" onClick={() => addToCart(p.titulo, p.arriendo, p.imagen, 'Arriendo')}>Arrendar</button>
        <button className="btn-card btn-solid" onClick={() => addToCart(p.titulo, p.compra, p.imagen, 'Compra')}>Comprar</button>
      </div>
    </div>
  )
}
