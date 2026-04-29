import type { ReactElement } from 'react'
import { KpiCard } from './KpiCard'
import type { KpiData } from './dashboardData'
import './KpiCards.css'

interface KpiCardsProps {
  data: KpiData[]
}

export function KpiCards({ data }: KpiCardsProps): ReactElement {
  return (
    <div className="kpi-cards">
      {data.map((item, index) => (
        <KpiCard key={index} {...item} />
      ))}
    </div>
  )
}
