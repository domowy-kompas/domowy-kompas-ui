import { NavLink } from 'react-router-dom'
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
import './Sidebar.css'

const navItems = [
  { to: '/dashboard', label: 'Panel główny', iconWhite: panelGlownyWhite, iconGreen: panelGlownyGreen },
  { to: '/transactions', label: 'Transakcje', iconWhite: transakcjeWhite, iconGreen: transakcjeGreen },
  { to: '/budgets', label: 'Budżety', iconWhite: budzetyWhite, iconGreen: budzetyGreen },
  { to: '/goals', label: 'Cele oszczędnościowe', iconWhite: celeOszczednoscioweWhite, iconGreen: celeOszczednoscioweGreen },
  { to: '/reports', label: 'Raporty', iconWhite: raportyWhite, iconGreen: raportyGreen },
  { to: '/help', label: 'Pomoc', iconWhite: pomocWhite, iconGreen: pomocGreen },
]

export function Sidebar() {
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
      <nav className="sidebar-nav">
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
    </aside>
  )
}