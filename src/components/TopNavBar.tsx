import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './TopNavBar.css'

const ROUTE_NAMES: Record<string, string> = {
  '/': 'Panel główny',
  '/dashboard': 'Panel główny',
  '/transactions': 'Transakcje',
  '/budgets': 'Budżety',
  '/goals': 'Cele oszczędnościowe',
  '/reports': 'Raporty',
  '/help': 'Pomoc',
  '/settings': 'Ustawienia',
  '/transactions/create': 'Dodaj transakcję',
}

function UserAvatar() {
  const avatarUrl = localStorage.getItem('settings_avatar')
  if (avatarUrl) {
    return (
      <div className="top-navbar-avatar">
        <img src={avatarUrl} alt="Zdjęcie profilowe" className="top-navbar-avatar-img" />
      </div>
    )
  }
  return (
    <div className="top-navbar-avatar">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  )
}

export function TopNavBar() {
  const { user } = useAuth()
  const location = useLocation()
  const viewName = ROUTE_NAMES[location.pathname] || 'Panel główny'

  return (
    <header className="top-navbar">
      <span className="top-navbar-view-name">{viewName}</span>
      {user && (
        <div className="top-navbar-user-section">
          <span className="top-navbar-user-name">
            {user.name} {user.surname}
          </span>
          <UserAvatar />
        </div>
      )}
    </header>
  )
}
