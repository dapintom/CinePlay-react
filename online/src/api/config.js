// URL base configurable para localhost y despliegue web
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export function getToken() {
  return localStorage.getItem('cineplay_jwt') || ''
}

export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const token = getToken()
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  }

  const response = await fetch(url, config)
  if (!response.ok) {
    let mensaje = `Error HTTP ${response.status}`
    try {
      const errData = await response.json()
      if (errData.mensaje) mensaje = errData.mensaje
    } catch {}
    throw new Error(mensaje)
  }

  if (response.status === 204) return null
  return response.json()
}
