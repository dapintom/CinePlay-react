import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { PELICULAS, VIDEOJUEGOS, GENEROS } from '../data/productos'
import { TARJETAS_BLOG } from '../data/blog'

export default function Home() {
  const [bannerVisible, setBannerVisible] = useState(true)

  return (
    <main className="container pb-5">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Arrienda o compra tus películas y videojuegos</h1>
          <p>Las mejores historias y aventuras, en un solo lugar.</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/productos?categoria=videojuegos" className="btn btn-primary btn-lg">🎮 Ver Videojuegos</Link>
            <Link to="/productos?categoria=peliculas" className="btn btn-outline-light btn-lg">🎬 Ver Películas</Link>
          </div>
        </div>
      </section>

      {bannerVisible && (
        <div className="banner-promo alert alert-dismissible fade show" role="alert">
          <div className="d-flex align-items-center justify-content-center flex-wrap gap-3 text-center">
            <span className="banner-promo-icono">🎁</span>
            <div>
              <strong className="banner-promo-titulo">¡15% de descuento en tu primera compra!</strong>
              <div className="banner-promo-texto">Regístrate hoy y aprovecha esta oferta de bienvenida en películas y videojuegos.</div>
            </div>
            <Link to="/registro" className="btn btn-light btn-sm fw-bold">Crear cuenta</Link>
          </div>
          <button type="button" className="btn-close" aria-label="Cerrar" onClick={() => setBannerVisible(false)} />
        </div>
      )}

      <section className="seccion-home">
        <div className="seccion-header">
          <div><h2>📰 Blog</h2><p className="subtitulo mb-0">Lo último en películas y videojuegos</p></div>
          <Link to="/blog" className="ver-mas">Ver todo el blog &rarr;</Link>
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
                  <p>{t.resumenCorto}</p>
                  <Link to="/blog" className="link-leer">Leer más &rarr;</Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="seccion-home">
        <div className="seccion-header">
          <div><h2>🎬 Películas</h2></div>
          <Link to="/productos?categoria=peliculas" className="ver-mas">Ver todas las películas &rarr;</Link>
        </div>
        <ProductGrid productos={PELICULAS} />
      </section>

      <section className="seccion-home">
        <div className="seccion-header">
          <div><h2>🎮 Videojuegos</h2></div>
          <Link to="/productos?categoria=videojuegos" className="ver-mas">Ver todos los videojuegos &rarr;</Link>
        </div>
        <ProductGrid productos={VIDEOJUEGOS} />
      </section>

      <section className="seccion-home">
        <div className="seccion-header">
          <div>
            <h2>🏷️ Explorar por Géneros y Categorías</h2>
            <p className="subtitulo mb-0">Encuentra tus títulos favoritos según tu categoría preferida</p>
          </div>
        </div>
        <div className="row row-cols-2 row-cols-md-3 g-3">
          {GENEROS.map((g) => (
            <div className="col" key={g}>
              <Link to="/productos" className="card-genero">{g}</Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
