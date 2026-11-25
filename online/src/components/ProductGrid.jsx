import { useCallback, useState } from 'react'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'

// Cuadrícula de tarjetas + el modal de resumen que se abre al hacer clic en un póster.
export default function ProductGrid({ productos, columnas = 'row-cols-2 row-cols-md-3 row-cols-lg-5' }) {
  const [seleccionado, setSeleccionado] = useState(null)
  const cerrar = useCallback(() => setSeleccionado(null), [])

  return (
    <>
      <div className={`row ${columnas} g-3`}>
        {productos.map((p) => (
          <div className="col" key={p.id}>
            <ProductCard producto={p} onVer={setSeleccionado} />
          </div>
        ))}
      </div>
      <ProductModal producto={seleccionado} onCerrar={cerrar} />
    </>
  )
}
