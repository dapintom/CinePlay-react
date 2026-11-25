import { Navigate, Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import Footer from './Footer'
import { useAuth } from '../context/AuthContext'

export default function AdminLayout() {
  const { autenticado, esAdmin } = useAuth()

  if (!autenticado || !esAdmin) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <AdminNavbar />
      <Outlet />
      <Footer admin />
    </>
  )
}
