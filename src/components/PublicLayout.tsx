import type { ReactElement, ReactNode } from 'react'
import { Footer } from './Footer'
import { Outlet } from 'react-router-dom'
import './PublicLayout.css'

interface PublicLayoutProps {
  children?: ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps): ReactElement {
  return (
    <div className="public-layout">
      <main className="public-layout-content">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  )
}
