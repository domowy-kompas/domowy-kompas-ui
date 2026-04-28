import type { ReactElement } from 'react'
import { Greeting } from './Greeting'
import { KpiCards } from './KpiCards'
import { BudgetsCard } from './BudgetsCard'
import { GoalsCard } from './GoalsCard'
import { RecentOperations } from './RecentOperations'
import './Dashboard.css'

export function Dashboard(): ReactElement {
  return (
    <div className="dashboard">
      <Greeting />
      <KpiCards />
      <div className="dashboard-grid">
        <div className="dashboard-left-column">
          <BudgetsCard />
          <GoalsCard />
        </div>
        <div className="dashboard-right-column">
          <RecentOperations />
        </div>
      </div>
    </div>
  )
}