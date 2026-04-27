import type { ReactElement, ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Spinner } from './Spinner'

interface PublicOnlyRouteProps {
  children?: ReactNode
}

export function PublicOnlyRoute({ children }: PublicOnlyRouteProps): ReactElement {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <Spinner />
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return children ? <>{children}</> : <Outlet />
}