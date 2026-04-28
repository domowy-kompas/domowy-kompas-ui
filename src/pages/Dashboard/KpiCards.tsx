import type { ReactElement } from 'react'
import { KpiCard } from './KpiCard'
import { kpiData } from './dashboardData'
import './KpiCards.css'

export function KpiCards(): ReactElement {
  return (
    <div className="kpi-cards">
      {kpiData.map((item, index) => (
        <KpiCard key={index} {...item} />
      ))}
    </div>
  )
}
