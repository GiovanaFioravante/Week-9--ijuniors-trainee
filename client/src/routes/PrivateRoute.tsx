import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-zinc-400">
        Carregando...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}