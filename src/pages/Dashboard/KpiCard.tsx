import type { ReactElement } from 'react'
import './KpiCard.css'

interface KpiCardProps {
  iconSrc: string
  label: string
  value: string
  badgeText: string
  badgeColor: 'green' | 'peach' | 'blue'
}

export function KpiCard({ iconSrc, label, value, badgeText, badgeColor }: KpiCardProps): ReactElement {
  return (
    <div className="kpi-card">
      <div className="kpi-card-header">
        <img src={iconSrc} alt={label} className="kpi-card-icon" />
        <span className={`kpi-card-badge kpi-card-badge--${badgeColor}`}>{badgeText}</span>
      </div>
      <p className="kpi-card-label">{label}</p>
      <p className="kpi-card-value">{value}</p>
    </div>
  )
}
