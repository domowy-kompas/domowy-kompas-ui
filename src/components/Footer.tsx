import type { ReactElement } from 'react'
import './Footer.css'

export function Footer(): ReactElement {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>&copy; {currentYear} Domowy Kompas. All rights reserved.</p>
    </footer>
  )
}