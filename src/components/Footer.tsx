import type { ReactElement } from 'react'
import './Footer.css'

export function Footer(): ReactElement {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-left">
        <p className="footer-app-name">Domowy Kompas</p>
        <p className="footer-copyright">&copy; {currentYear} Domowy Kompas. Wspieramy Twoją finansową przyszłość.</p>
      </div>
    </footer>
  )
}