import './Footer.css'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>&copy; {currentYear} Domowy Kompas. All rights reserved.</p>
    </footer>
  )
}