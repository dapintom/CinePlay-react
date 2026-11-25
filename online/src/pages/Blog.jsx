import { TARJETAS_BLOG } from '../data/blog'

export default function Blog() {
  return (
    <main className="container pb-5">
      <section className="seccion-home mt-4">
        <div className="seccion-header">
          <div>
            <h2>📰 Últimas Noticias y Artículos</h2>
            <p className="subtitulo mb-0">Mantente al día con lo último en cine y videojuegos</p>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {TARJETAS_BLOG.map((t) => (
            <div className="col" key={t.titulo}>
              <article className="card-blog-home h-100">
                <div className="img-wrapper">
                  <span className={`badge-cat ${t.claseBadge}`}>{t.categoria}</span>
                  <img src={t.imagen} alt={t.alt} />
                </div>
                <div className="card-blog-body">
                  <h3>{t.titulo}</h3>
                  <p>{t.resumenLargo}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
