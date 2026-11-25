import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { clp } from '../utils/formato'

// ---------- Simulación de la transacción (igual que en src/pago.js) ----------

// Tarjetas de prueba (según los últimos 4 dígitos):
//   0002 -> rechazada por el banco | 0003 -> fondos insuficientes | 0004 -> error de conexión

// Para probar fallos aleatorios, sube PROB_ERROR (por ejemplo 0.2 = 20 %).
const PROB_ERROR = 0
const MOTIVOS = {
  '0002': 'Tu banco rechazó la tarjeta. Verifica los datos o usa otro medio de pago.',
  '0003': 'La tarjeta no tiene fondos suficientes para completar la compra.',
  '0004': 'No pudimos comunicarnos con el banco. Inténtalo nuevamente en unos instantes.',
}
const MOTIVO_GENERICO = 'Ocurrió un problema al procesar el pago. No se realizó ningún cargo.'

function procesarPago(tarjetaFin) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (MOTIVOS[tarjetaFin]) return resolve({ ok: false, motivo: MOTIVOS[tarjetaFin] })
      if (Math.random() < PROB_ERROR) return resolve({ ok: false, motivo: MOTIVO_GENERICO })
      resolve({ ok: true })
    }, 1500)
  })
}

const INICIAL = { nombre: '', direccion: '', depto: '', comuna: '', ciudad: '', referencias: '', tarjeta: '', expiracion: '', cvv: '' }

function validar(f) {
  const e = {}
  if (!f.direccion.trim()) e.direccion = 'Ingresa tu dirección de envío.'
  if (!f.comuna.trim()) e.comuna = 'Ingresa la comuna.'
  if (!f.ciudad.trim()) e.ciudad = 'Ingresa la ciudad.'
  if (f.tarjeta.replace(/\D/g, '').length !== 16) e.tarjeta = 'La tarjeta debe tener 16 dígitos.'

  const m = f.expiracion.match(/^(0[1-9]|1[0-2])\/(\d{2})$/)
  if (!m) e.expiracion = 'Usa el formato MM/AA.'
  else if (new Date(2000 + Number(m[2]), Number(m[1]), 1) <= new Date()) e.expiracion = 'La tarjeta está vencida.'

  if (!/^\d{3,4}$/.test(f.cvv)) e.cvv = 'El CVV debe tener 3 o 4 dígitos.'
  return e
}

export default function Pago() {
  const { items, total, vaciar } = useCarrito()
  const navigate = useNavigate()
  const [f, setF] = useState(INICIAL)
  const [errores, setErrores] = useState({})
  const [cargando, setCargando] = useState(false)
  const [falla, setFalla] = useState(null) // { motivo, ref }

  const cambiar = (e) => {
    const { id, value } = e.target
    let v = value
    if (id === 'tarjeta') v = value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1-')
    if (id === 'expiracion') {
      const d = value.replace(/\D/g, '').slice(0, 4)
      v = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d
    }
    setF((prev) => ({ ...prev, [id]: v }))
  }

  const enviar = async (e) => {
    e.preventDefault()
    if (cargando) return
    const errs = validar(f)
    setErrores(errs)
    if (Object.keys(errs).length) return

    if (items.length === 0) {
      alert('Tu carrito está vacío. Agrega productos antes de pagar.')
      navigate('/productos')
      return
    }

    const tarjetaFin = f.tarjeta.replace(/\D/g, '').slice(-4) // solo se guardan los últimos 4 dígitos
    setCargando(true)
    const resultado = await procesarPago(tarjetaFin)

    if (!resultado.ok) {
      setCargando(false)
      setFalla({ motivo: resultado.motivo, ref: 'ERR-' + Date.now().toString().slice(-6) })
      return // el carrito NO se vacía
    }

    const orden = {
      numero: 'CP-' + Date.now().toString().slice(-8),
      fecha: new Date().toISOString(),
      cliente: f.nombre.trim(),
      tarjetaFin,
      envio: {
        direccion: f.direccion.trim(), depto: f.depto.trim(), comuna: f.comuna.trim(),
        ciudad: f.ciudad.trim(), referencias: f.referencias.trim(),
      },
      items: items.map((i) => ({ nombre: i.nombre, precio: i.precio, cantidad: i.cantidad, tipo: i.tipo, img: i.imagen })),
      total,
    }
    localStorage.setItem('ultimaCompra', JSON.stringify(orden))
    vaciar() // el carrito se vacía solo si el pago fue exitoso
    navigate('/resumen-compra')
  }

  const reintentar = () => {
    setFalla(null)
    setF((prev) => ({ ...prev, cvv: '' })) // por seguridad se vuelve a pedir el CVV
    setTimeout(() => document.getElementById('tarjeta')?.focus(), 0)
  }

  const err = (campo) => <span className="error-message">{errores[campo]}</span>

  return (
    <main className="container my-5" style={{ maxWidth: 600 }}>
      <div className="card"><div className="card-body p-4">
        <h2 className="text-center">💳 Pago</h2>
        <p className="subtitulo text-center">Completa los datos para procesar tu orden.</p>
        <form className="mt-3" noValidate onSubmit={enviar}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre completo</label>
            <input type="text" id="nombre" className="form-control" placeholder="Juan Pérez" value={f.nombre} onChange={cambiar} />
          </div>

          <h3 className="h6 text-primary mt-4 mb-3">📦 Dirección de envío</h3>
          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">Calle y número</label>
            <input type="text" id="direccion" className="form-control" placeholder="Av. Siempre Viva 123" value={f.direccion} onChange={cambiar} />
            {err('direccion')}
          </div>
          <div className="mb-3">
            <label htmlFor="depto" className="form-label">Depto / Casa <span className="text-secondary">(opcional)</span></label>
            <input type="text" id="depto" className="form-control" placeholder="Depto 402" value={f.depto} onChange={cambiar} />
          </div>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label htmlFor="comuna" className="form-label">Comuna</label>
              <input type="text" id="comuna" className="form-control" placeholder="Providencia" value={f.comuna} onChange={cambiar} />
              {err('comuna')}
            </div>
            <div className="col-md-6">
              <label htmlFor="ciudad" className="form-label">Ciudad</label>
              <input type="text" id="ciudad" className="form-control" placeholder="Santiago" value={f.ciudad} onChange={cambiar} />
              {err('ciudad')}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="referencias" className="form-label">Indicaciones para la entrega <span className="text-secondary">(opcional)</span></label>
            <textarea id="referencias" rows={2} className="form-control" placeholder="Ej: dejar con conserjería" value={f.referencias} onChange={cambiar} />
          </div>

          <h3 className="h6 text-primary mt-4 mb-3">💳 Datos de pago</h3>
          <div className="mb-3">
            <label htmlFor="tarjeta" className="form-label">Número de tarjeta</label>
            <input type="text" id="tarjeta" className="form-control" placeholder="XXXX-XXXX-XXXX-XXXX" maxLength={19} inputMode="numeric" autoComplete="cc-number" value={f.tarjeta} onChange={cambiar} />
            {err('tarjeta')}
          </div>
          <div className="row g-3 mb-3">
            <div className="col-6">
              <label htmlFor="expiracion" className="form-label">Vencimiento</label>
              <input type="text" id="expiracion" className="form-control" placeholder="MM/AA" maxLength={5} inputMode="numeric" autoComplete="cc-exp" value={f.expiracion} onChange={cambiar} />
              {err('expiracion')}
            </div>
            <div className="col-6">
              <label htmlFor="cvv" className="form-label">CVV</label>
              <input type="password" id="cvv" className="form-control" placeholder="123" maxLength={4} inputMode="numeric" autoComplete="cc-csc" value={f.cvv} onChange={cambiar} />
              {err('cvv')}
            </div>
          </div>

          <div className="resumen-pago-box">
            <span>Total a Pagar:</span><strong className="monto-pago">{clp(total)}</strong>
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={cargando}>
            {cargando ? (<><span className="spinner-border spinner-border-sm me-2" />Procesando pago...</>) : 'Pagar Ahora'}
          </button>
        </form>
      </div></div>

      {falla && (
        <>
          <div className="modal fade show d-block" tabIndex={-1} role="alertdialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content resumen-modal text-center p-3">
                <div className="modal-body">
                  <div style={{ fontSize: '3rem' }}>❌</div>
                  <h2 className="h4 mt-2">No pudimos procesar tu pago</h2>
                  <p className="text-secondary mb-2">{falla.motivo}</p>
                  <p className="small text-secondary mb-4">Referencia: {falla.ref} · No se realizó ningún cargo y tu carrito sigue intacto.</p>
                  <div className="d-flex justify-content-center gap-2 flex-wrap">
                    <button type="button" className="btn btn-primary" onClick={reintentar}>Volver a intentar</button>
                    <Link to="/carrito" className="btn btn-secondary">Volver al carrito</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </main>
  )
}
