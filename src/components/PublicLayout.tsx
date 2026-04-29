import type { ReactElement, ReactNode } from 'react'
import { Footer } from './Footer'
import { Outlet, useLocation } from 'react-router-dom'
import './PublicLayout.css'

interface PublicLayoutProps {
  children?: ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps): ReactElement {
  const location = useLocation()
  const isCenteredPage = location.pathname === '/login' || location.pathname === '/register'

  return (
    <div className="public-layout">
      <main className={`public-layout-content ${isCenteredPage ? 'centered' : ''}`}>
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  )
}
