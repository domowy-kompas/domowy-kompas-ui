import type { ReactElement } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import appIcon from '../assets/appIcon.png'
import panelGlownyWhite from '../assets/sidebar/white/PanelGlowny.png'
import transakcjeWhite from '../assets/sidebar/white/Transakcje.png'
import budzetyWhite from '../assets/sidebar/white/Budzety.png'
import celeOszczednoscioweWhite from '../assets/sidebar/white/CeleOszczednosciowe.png'
import raportyWhite from '../assets/sidebar/white/Raporty.png'
import pomocWhite from '../assets/sidebar/white/Pomoc.png'
import panelGlownyGreen from '../assets/sidebar/green/PanelGlowny.png'
import transakcjeGreen from '../assets/sidebar/green/Transakcje.png'
import budzetyGreen from '../assets/sidebar/green/Budzety.png'
import celeOszczednoscioweGreen from '../assets/sidebar/green/CeleOszczednosciowe.png'
import raportyGreen from '../assets/sidebar/green/Raporty.png'
import pomocGreen from '../assets/sidebar/green/Pomoc.png'
import ustawieniaWhite from '../assets/sidebar/white/Ustawienia.png'
import ustawieniaGreen from '../assets/sidebar/green/Ustawienia.png'
import plusIcon from '../assets/plus.png'
import logoutIcon from '../assets/logout.png'
import './Sidebar.css'

const navItems = [
  { to: '/dashboard', label: 'Panel główny', iconWhite: panelGlownyWhite, iconGreen: panelGlownyGreen },
  { to: '/transactions', label: 'Transakcje', iconWhite: transakcjeWhite, iconGreen: transakcjeGreen },
  { to: '/budgets', label: 'Budżety', iconWhite: budzetyWhite, iconGreen: budzetyGreen },
  { to: '/goals', label: 'Cele oszczędnościowe', iconWhite: celeOszczednoscioweWhite, iconGreen: celeOszczednoscioweGreen },
  { to: '/reports', label: 'Raporty', iconWhite: raportyWhite, iconGreen: raportyGreen },
  { to: '/help', label: 'Pomoc', iconWhite: pomocWhite, iconGreen: pomocGreen },
]

export function Sidebar(): ReactElement {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <img src={appIcon} alt="" className="sidebar-icon" />
          <div className="sidebar-titles">
            <h1 className="sidebar-title">Domowy Kompas</h1>
            <p className="sidebar-subtitle">Przejrzystość finansowa</p>
          </div>
        </div>
      </div>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {({ isActive }) => (
              <>
                <img src={isActive ? item.iconGreen : item.iconWhite} alt="" className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="sidebar-bottom-btn sidebar-bottom-btn-primary" onClick={() => navigate('/transactions/create')}>
          <img src={plusIcon} alt="" className="nav-icon" />
          <span className="nav-label">Nowa transakcja</span>
        </button>
        <NavLink to="/settings" className={({ isActive }) => (isActive ? 'sidebar-bottom-btn active' : 'sidebar-bottom-btn')}>
          {({ isActive }) => (
            <>
              <img src={isActive ? ustawieniaGreen : ustawieniaWhite} alt="" className="nav-icon" />
              <span className="nav-label">Ustawienia</span>
            </>
          )}
        </NavLink>
        <button className="sidebar-bottom-btn" onClick={handleLogout}>
          <img src={logoutIcon} alt="" className="nav-icon" />
          <span className="nav-label">Wyloguj</span>
        </button>
      </div>
    </aside>
  )
}