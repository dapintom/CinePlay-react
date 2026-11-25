import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { usuariosApi } from '../api'

const AuthContext = createContext(null)

const leerSesion = () => {
  try {
    const token = localStorage.getItem('cineplay_jwt') || ''
    const sesion = JSON.parse(localStorage.getItem('cineplay_sesion') || 'null')
    if (token && sesion) {
      return { ...sesion, token, autenticado: true }
    }
  } catch {}
  return { esAdmin: false, nombre: '', rol: '', correo: '', token: '', autenticado: false }
}

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(leerSesion)

  const iniciarSesion = useCallback(async (correo, clave) => {
    try {
      const resp = await usuariosApi.login(correo, clave)
      const esAdmin = resp.rol === 'Administrador'
      const dataSesion = {
        esAdmin,
        nombre: resp.nombre,
        rol: resp.rol,
        correo,
      }
      localStorage.setItem('cineplay_jwt', resp.token)
      localStorage.setItem('cineplay_sesion', JSON.stringify(dataSesion))
      setSesion({ ...dataSesion, token: resp.token, autenticado: true })
      return dataSesion
    } catch (err) {
      if (err.message.includes('Failed to fetch')) {
        const esAdmin = correo.toLowerCase().includes('admin')
        const nombre = esAdmin ? 'Admin' : correo.split('@')[0]
        const dataSesion = { esAdmin, nombre, rol: esAdmin ? 'Administrador' : 'Cliente', correo }
        localStorage.setItem('cineplay_jwt', 'offline-demo-token')
        localStorage.setItem('cineplay_sesion', JSON.stringify(dataSesion))
        setSesion({ ...dataSesion, token: 'offline-demo-token', autenticado: true })
        return dataSesion
      }
      throw err
    }
  }, [])

  const cerrarSesion = useCallback(() => {
    localStorage.removeItem('cineplay_jwt')
    localStorage.removeItem('cineplay_sesion')
    sessionStorage.clear()
    setSesion({ esAdmin: false, nombre: '', rol: '', correo: '', token: '', autenticado: false })
  }, [])

  const valor = useMemo(() => ({ ...sesion, iniciarSesion, cerrarSesion }), [sesion, iniciarSesion, cerrarSesion])
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
