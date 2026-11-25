import { Link, useParams } from 'react-router-dom'
import { ARTICULOS } from '../data/blog'

export default function DetalleBlog() {
  const { id } = useParams()
  const a = ARTICULOS[id]

  if (!a) {
    return (
      <main className="container my-4" style={{ maxWidth: 820 }}>
        <Link to="/blog" className="text-decoration-none">&larr; Volver a Blogs</Link>
        <h1 className="mt-3">Artículo no encontrado</h1>
      </main>
    )
  }

  return (
    <main className="container my-4" style={{ maxWidth: 820 }}>
      <Link to="/blog" className="text-decoration-none">&larr; Volver a Blogs</Link>
      <article className="mt-3">
        <header className="mb-3">
          <h1>{a.titulo}</h1>
          <p className="subtitulo">{a.meta}</p>
        </header>
        <img src={a.imagen} alt={a.alt} className="img-fluid rounded mb-4 border border-secondary" />
        <div className="post-content">
          {a.contenido.map((b, i) =>
            b.h ? <h2 className="h4 mt-4" key={i}>{b.h}</h2> : <p key={i}>{b.p}</p>,
          )}
        </div>
      </article>
    </main>
  )
}
