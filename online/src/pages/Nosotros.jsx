const VALORES = [
  { titulo: '🔒 Compra 100% Segura', texto: 'Garantizamos transacciones protegidas y privacidad total de tus datos personales en cada compra o arriendo.' },
  { titulo: '⚡ Entrega Inmediata', texto: 'Procesamos las órdenes al instante para que disfrutes de tu contenido digital o físico sin demoras si no Lucas se rapa al 0 jeje' },
  { titulo: '🎯 Catálogo Verificado', texto: 'Todos nuestros títulos y juegos cuentan con licencias oficiales y garantía directa de funcionamiento.' },
]

export default function Nosotros() {
  return (
    <main className="container py-4" style={{ maxWidth: 1000 }}>
      <h1 className="text-center">🎬 Sobre CinePlay</h1>
      <p className="subtitulo text-center">Conoce la historia y los valores detrás de tu plataforma de entretenimiento</p>
      <div className="historia-box">
        <h2 className="seccion-titulo">✨ Nuestra Historia ✨</h2>
        <p><strong>CinePlay</strong> nació de un sueño apasionado: unir en un solo lugar lo mejor de dos mundos increíbles, el cine de gran pantalla y la emoción sin límites de los videojuegos. Sabíamos exactamente lo que se sentía buscar un estreno épico o intentar conseguir esa edición especial que tanto querías, solo para encontrarte con procesos complicados o sitios de poco fiar.</p>
        <p className="mb-0">Por eso, decidimos cambiar las reglas del juego. Creamos una plataforma moderna, rápida y pensada 100% para la comunidad geek y cinéfila. Hoy nos mueve llevarte la mejor experiencia de entretenimiento digital y físico hasta la comodidad de tu hogar, con precios transparentes, atención dedicada y un catálogo que no para de crecer. ¡Gracias por ser parte de nuestra historia!</p>
      </div>
      <h2 className="mb-4">¿Por qué confiar en CinePlay?</h2>
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {VALORES.map((v) => (
          <div className="col" key={v.titulo}>
            <div className="card-nosotros h-100"><h3>{v.titulo}</h3><p className="mb-0">{v.texto}</p></div>
          </div>
        ))}
      </div>
    </main>
  )
}
