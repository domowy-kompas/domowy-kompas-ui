import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <div className="layout-sidebar">
        <Sidebar />
      </div>
      <div className="layout-main">
        <main className="layout-content">{children}</main>
        <Footer />
      </div>
    </div>
  )
}