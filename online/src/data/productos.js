// Catálogo de CinePlay: una sola fuente de datos para Inicio, Catálogo y el resumen (modal).
export const PRODUCTOS = [
  { id: 1, titulo: 'Dune: Parte 2', tipo: 'Película', genero: 'Acción · Ciencia ficción', imagen: '/imagenes/dune2.jpg', arriendo: 3990, compra: 14990,
    sinopsis: 'Paul Atreides se une a los Fremen y emprende un camino de venganza contra quienes destruyeron a su familia, mientras debe elegir entre el amor y el destino del universo.' },
  { id: 2, titulo: 'Deadpool y Wolverine', tipo: 'Película', genero: 'Acción · Comedia', imagen: '/imagenes/deadpool.jpg', arriendo: 3990, compra: 14990,
    sinopsis: 'Wade Wilson es reclutado para una misión que cambiará la historia y se ve obligado a formar un improbable equipo con un Wolverine reacio.' },
  { id: 3, titulo: 'Intensamente 2', tipo: 'Película', genero: 'Animación · Familia', imagen: '/imagenes/intensamente2.jpg', arriendo: 3490, compra: 12990,
    sinopsis: 'Riley entra en la adolescencia y llegan nuevas emociones a su mente, que ponen a prueba a Alegría y al resto del equipo.' },
  { id: 4, titulo: 'El hombre gris', tipo: 'Película', genero: 'Acción · Suspense', imagen: '/imagenes/hombre-gris.jpg', arriendo: 2990, compra: 9990,
    sinopsis: 'Un agente de la CIA que trabaja en las sombras se convierte en objetivo de un exagente que lo persigue por todo el mundo.' },
  { id: 5, titulo: 'Barbie', tipo: 'Película', genero: 'Comedia · Fantasía', imagen: '/imagenes/barbie.jpg', arriendo: 2990, compra: 11990,
    sinopsis: 'Barbie vive en Barbieland, pero una crisis existencial la lleva al mundo real en busca de respuestas junto a Ken.' },
  { id: 6, titulo: 'Spider-Man 2', tipo: 'Videojuego', plataforma: 'PS4', genero: 'Acción · Aventura', imagen: '/imagenes/spiderman2.jpg', arriendo: 5990, compra: 49990,
    sinopsis: 'Peter Parker y Miles Morales unen fuerzas para proteger Nueva York de nuevas amenazas, con el simbionte como gran desafío.' },
  { id: 7, titulo: 'EA SPORTS FC 24', tipo: 'Videojuego', plataforma: 'PC', genero: 'Deportes · Simulación', imagen: '/imagenes/fc24.jpg', arriendo: 4990, compra: 39990,
    sinopsis: 'Simulador de fútbol con equipos y jugadores de todo el mundo, modos online y la experiencia de juego más realista de la serie.' },
  { id: 8, titulo: 'God of War Ragnarök', tipo: 'Videojuego', plataforma: 'PC', genero: 'Acción · Aventura', imagen: '/imagenes/god-of-war.jpg', arriendo: 5990, compra: 44990,
    sinopsis: 'Kratos y Atreus viajan por los nueve reinos en busca de respuestas mientras se acerca el Ragnarök.' },
  { id: 9, titulo: 'The Last of Us Parte I', tipo: 'Videojuego', plataforma: 'PC', genero: 'Acción · Aventura', imagen: '/imagenes/tlou.avif', arriendo: 4990, compra: 39990,
    sinopsis: 'Joel y Ellie cruzan unos Estados Unidos devastados por una pandemia en una historia de supervivencia y vínculos.' },
  { id: 10, titulo: 'Hogwarts Legacy', tipo: 'Videojuego', plataforma: 'PC', genero: 'RPG · Aventura', imagen: '/imagenes/hogwarts.jpg', arriendo: 4990, compra: 42990,
    sinopsis: 'RPG de mundo abierto ambientado en el siglo XIX: vive como estudiante de Hogwarts y descubre un antiguo secreto.' },
]

export const PELICULAS = PRODUCTOS.filter((p) => p.tipo === 'Película')
export const VIDEOJUEGOS = PRODUCTOS.filter((p) => p.tipo === 'Videojuego')

export const GENEROS = [
  '💥 Acción y Aventura', '🚀 Ciencia Ficción', '😂 Comedia',
  '🎨 Animación y Familia', '⚽ Deportes y Simulación', '🪄 RPG y Fantasía',
]
