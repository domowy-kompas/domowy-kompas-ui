import type { ReactElement, ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { Outlet } from 'react-router-dom'
import { TopNavBar } from './TopNavBar'
import './Layout.css'

interface LayoutProps {
  children?: ReactNode
}

export function Layout({ children }: LayoutProps): ReactElement {
  return (
    <div className="layout">
      <div className="layout-sidebar">
        <Sidebar />
      </div>
      <div className="layout-main">
        <TopNavBar />
        <main className="layout-content">{children || <Outlet />}</main>
        <Footer />
      </div>
    </div>
  )
}