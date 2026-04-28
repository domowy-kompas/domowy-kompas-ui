import type { ReactElement } from 'react'
import { IconPlaceholder } from './IconPlaceholder'
import { ProgressBar } from './ProgressBar'
import { budgetItems } from './dashboardData'
import './CardWithList.css'

export function BudgetsCard(): ReactElement {
  return (
    <div className="dashboard-card">
      <h2 className="dashboard-card-title">Budżety miesięczne</h2>
      <div className="dashboard-card-list">
        {budgetItems.map((item) => (
          <div key={item.category} className="dashboard-card-item">
            <div className="dashboard-card-item-left">
              <IconPlaceholder label={item.iconLabel} size={24} />
              <div className="dashboard-card-item-info">
                <p className="dashboard-card-item-title">{item.category}</p>
                <p className="dashboard-card-item-amount">
                  {item.current.toLocaleString('pl-PL')} zł / {item.limit.toLocaleString('pl-PL')} zł
                </p>
              </div>
            </div>
            <div className="dashboard-card-item-progress">
              <ProgressBar current={item.current} total={item.limit} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
