import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { ProgressBar } from './ProgressBar'
import type { BudgetItem } from './dashboardData'
import './CardWithList.css'

interface BudgetsCardProps {
  items: BudgetItem[]
}

export function BudgetsCard({ items }: BudgetsCardProps): ReactElement {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header-with-link">
        <h2 className="dashboard-card-title">Budżety miesięczne</h2>
        <Link to="/budgets" className="dashboard-card-link-green">Szczegóły</Link>
      </div>
      <div className="dashboard-card-list">
        {items.map((item) => (
          <div key={item.category} className="budget-item">
            <div className="budget-item-header">
              <span className="budget-item-title">{item.category}</span>
              <span className={`budget-item-percentage percentage--${item.colorClass}`}>
                {item.percentage}%
              </span>
            </div>
            <ProgressBar 
              percentage={item.percentage} 
              colorClass={item.colorClass} 
              showWarning={true} 
            />
          </div>
        ))}
      </div>
    </div>
  )
}
