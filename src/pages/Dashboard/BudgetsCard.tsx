import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import type { BudgetItem } from './dashboardData'
import './CardWithList.css'

interface BudgetsCardProps {
  items: BudgetItem[]
}

export function BudgetsCard({ items }: BudgetsCardProps): ReactElement {
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' zł'
  }

  const getStatusColor = (status: 'ok' | 'warning' | 'danger') => {
    switch (status) {
      case 'danger': return '#E24B4A'
      case 'warning': return '#BA7517'
      case 'ok': return '#378ADD'
    }
  }

  const getStatusTextColor = (status: 'ok' | 'warning' | 'danger') => {
    switch (status) {
      case 'danger': return '#E24B4A'
      case 'warning': return '#BA7517'
      case 'ok': return '#378ADD'
    }
  }

  const getStatusBgColor = (status: 'ok' | 'warning' | 'danger') => {
    switch (status) {
      case 'danger': return 'rgba(226, 75, 74, 0.1)'
      case 'warning': return 'rgba(186, 117, 23, 0.1)'
      case 'ok': return 'rgba(55, 138, 221, 0.1)'
    }
  }

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header-with-link">
        <h2 className="dashboard-card-title">Budżety miesięczne</h2>
        <Link to="/budgets" className="dashboard-card-link-green">Szczegóły</Link>
      </div>
      <div className="dashboard-card-list">
        {items.map((item) => {
          const remaining = item.limit - item.spent
          return (
            <div key={item.name} className="budget-item-new">
              {/* Top row: icon + name | amount + limit */}
              <div className="budget-item-top">
                <div className="budget-item-left">
                  <span className="budget-item-name">{item.name}</span>
                </div>
                <div className="budget-item-right">
                  <span className="budget-item-spent" style={{ color: getStatusTextColor(item.status) }}>
                    {formatCurrency(item.spent)}
                  </span>
                  <span className="budget-item-divider">/</span>
                  <span className="budget-item-limit">{formatCurrency(item.limit)}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="budget-progress-wrapper">
                <div 
                  className="budget-progress-bar" 
                  style={{
                    width: `${Math.min(item.percent, 100)}%`,
                    backgroundColor: getStatusColor(item.status),
                  }}
                />
              </div>

              {/* Bottom row: remaining amount | percentage badge */}
              <div className="budget-item-bottom">
                <span className="budget-item-remaining" style={{ color: getStatusTextColor(item.status) }}>
                  {item.percent >= 100 ? 'Limit wyczerpany' : `Zostało ${formatCurrency(remaining)}`}
                </span>
                <span 
                  className="budget-item-badge"
                  style={{
                    backgroundColor: getStatusBgColor(item.status),
                    color: getStatusTextColor(item.status),
                  }}
                >
                  {item.percent}%
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
