// Artículos del blog. `resumen` se usa en las tarjetas; `contenido` en la página de detalle.
export const TARJETAS_BLOG = [
  { categoria: 'Películas', claseBadge: 'bg-primary', titulo: 'Lo nuevo en cines y streaming: estrenos del mes',
    imagen: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop', alt: 'Estrenos streaming',
    resumenCorto: 'Descubre las películas más esperadas del mes, desde grandes blockbusters hasta joyas independientes.',
    resumenLargo: 'Descubre las películas más esperadas del mes, desde grandes blockbusters hasta joyas independientes. Análisis detallado de los próximos lanzamientos.' },
  { categoria: 'Videojuegos', claseBadge: 'badge-fucsia', titulo: 'Los lanzamientos más esperados de este año',
    imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop', alt: 'Lanzamientos juegos',
    resumenCorto: 'Conoce los videojuegos que todos están esperando y que llegan en los próximos meses.',
    resumenLargo: 'Conoce los videojuegos que todos están esperando y que llegan en los próximos meses para todas las consolas y PC.' },
]

export const ARTICULOS = {
  1: {
    titulo: 'Los Lanzamientos Más Esperados del Año',
    meta: 'Publicado el 06 de Septiembre, 2026 | Categoría: Cine & Juegos',
    imagen: 'https://via.placeholder.com/800x400/2a2a2a/ffb6c1?text=Lanzamientos+Destacados',
    alt: 'Lanzamientos',
    contenido: [
      { p: 'El entretenimiento digital no se detiene y este año nos sorprende con títulos revolucionarios tanto en la pantalla grande como en las consolas de nueva generación. En esta edición revisamos en profundidad los lanzamientos más esperados.' },
      { h: 'Novedades en Cine y Streaming' },
      { p: 'Las grandes producciones cinematográficas están apostando por formatos de ultra alta definición en 4K UHD con sonido Dolby Atmos. La calidad visual alcanza niveles que antes solo eran posibles en salas de cine profesionales.' },
      { h: 'El Futuro de los Videojuegos' },
      { p: 'Por el lado de las consolas, las remasterizaciones y los títulos originales con trazado de rayos (Ray Tracing) continúan dominando las ventas. Mantente atento a nuestro catálogo para conseguir tus copias físicas y ediciones de colección antes de que se agoten.' },
    ],
  },
  2: {
    titulo: 'Guía Coleccionista: Formatos Físicos en 4K',
    meta: 'Publicado el 01 de Septiembre, 2026 | Categoría: Guías & Formatos',
    imagen: 'https://via.placeholder.com/800x400/2a2a2a/ffb6c1?text=Ediciones+Steelbook+y+4K',
    alt: 'Guía Coleccionista',
    contenido: [
      { p: 'En la era digital, la preservación y posesión del formato físico sigue siendo la prioridad número uno para cinéfilos y coleccionistas exigentes. Te explicamos los aspectos técnicos clave al momento de adquirir tus títulos favoritos.' },
      { h: '¿Por qué elegir un disco Ultra HD Blu-ray?' },
      { p: 'A diferencia de los servicios de streaming donde la compresión reduce el bit-rate, un disco 4K Blu-ray transmite la información audiovisual sin pérdidas significativas. Esto garantiza negros más profundos, un rango dinámico alto (HDR10+ / Dolby Vision) y pistas de audio DTS-X impecables.' },
      { h: 'Ediciones Especiales y Steelbooks' },
      { p: 'Las cajas metálicas (Steelbooks) y las ediciones con arte alternativo no solo protegen el material, sino que incrementan su valor coleccionable con el paso del tiempo. Asegúrate de revisar la disponibilidad en nuestro catálogo oficial.' },
    ],
  },
}
