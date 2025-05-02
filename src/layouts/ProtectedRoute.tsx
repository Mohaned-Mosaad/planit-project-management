import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import { RefreshProvider, SharedDataProvider } from '@/contexts'

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to='/login' replace />
  }

  return (
    <RefreshProvider>
      <SharedDataProvider>
        <Outlet />
      </SharedDataProvider>
    </RefreshProvider>
  )
}

export default ProtectedRoute
