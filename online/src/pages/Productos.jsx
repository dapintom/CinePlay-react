import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { PELICULAS, VIDEOJUEGOS } from '../data/productos'

const TEXTOS = {
  peliculas: ['🎬 Catálogo de Películas', 'Explora nuestras películas disponibles para arriendo y compra'],
  videojuegos: ['🎮 Catálogo de Videojuegos', 'Explora todos los títulos disponibles para PC y Consolas'],
  todo: ['Catálogo Completo', 'Explora nuestras películas y videojuegos disponibles'],
}

const COLUMNAS = 'row-cols-1 row-cols-sm-2 row-cols-lg-4'

// La categoría llega por la URL (categoria=peliculas | videojuegos) en vez de sessionStorage.

// También se puede filtrar por género (genero=Comedia)
export default function Productos() {
  const [params] = useSearchParams()
  const categoria = params.get('categoria')
  const genero = (params.get('genero') || '').toLowerCase()

  const clave = categoria === 'peliculas' || categoria === 'videojuegos' ? categoria : 'todo'
  const [titulo, subtitulo] = TEXTOS[clave]
  const filtrar = (lista) => (genero ? lista.filter((p) => p.genero.toLowerCase().includes(genero)) : lista)

  const peliculas = clave === 'videojuegos' ? [] : filtrar(PELICULAS)
  const videojuegos = clave === 'peliculas' ? [] : filtrar(VIDEOJUEGOS)

  return (
    <main className="container pb-5">
      <div className="seccion-header my-4">
        <div>
          <h1>{titulo}</h1>
          <p className="subtitulo mb-0">{subtitulo}</p>
        </div>
      </div>

      {peliculas.length > 0 && (
        <section className="seccion-home">
          <h2 className="mb-3">🎬 Películas</h2>
          <ProductGrid productos={peliculas} columnas={COLUMNAS} />
        </section>
      )}
      {videojuegos.length > 0 && (
        <section className="seccion-home">
          <h2 className="mb-3">🎮 Videojuegos</h2>
          <ProductGrid productos={videojuegos} columnas={COLUMNAS} />
        </section>
      )}
      {peliculas.length === 0 && videojuegos.length === 0 && (
        <p className="text-secondary">No hay productos que coincidan con tu búsqueda.</p>
      )}
    </main>
  )
}
