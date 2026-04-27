import type { ReactElement, ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Spinner } from './Spinner'

interface ProtectedRouteProps {
  children?: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps): ReactElement {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <Spinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children ? <>{children}</> : <Outlet />
}