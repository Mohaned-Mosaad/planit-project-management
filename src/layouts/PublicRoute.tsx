import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'

export default function PublicRoute() {
  const { isLoggedIn } = useAuth()

  if (isLoggedIn) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}
