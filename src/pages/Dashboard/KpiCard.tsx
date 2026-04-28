import type { ReactElement } from 'react'
import { IconPlaceholder } from './IconPlaceholder'
import './KpiCard.css'

interface KpiCardProps {
  iconLabel: string
  label: string
  value: string
  badgeText: string
  badgeColor: 'green' | 'peach' | 'blue'
}

export function KpiCard({ iconLabel, label, value, badgeText, badgeColor }: KpiCardProps): ReactElement {
  return (
    <div className="kpi-card">
      <div className="kpi-card-header">
        <IconPlaceholder label={iconLabel} size={32} />
        <span className={`kpi-card-badge kpi-card-badge--${badgeColor}`}>{badgeText}</span>
      </div>
      <p className="kpi-card-label">{label}</p>
      <p className="kpi-card-value">{value}</p>
    </div>
  )
}
