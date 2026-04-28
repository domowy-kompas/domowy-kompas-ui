import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { IconPlaceholder } from './IconPlaceholder'
import { operationItems } from './dashboardData'
import './RecentOperations.css'

export function RecentOperations(): ReactElement {
  return (
    <div className="dashboard-card">
      <div className="recent-operations-header">
        <h2 className="dashboard-card-title">Ostatnie operacje</h2>
        <Link to="/transactions" className="recent-operations-link">Zobacz wszystkie</Link>
      </div>
      <div className="recent-operations-list">
        {operationItems.map((item) => (
          <div key={item.id} className="recent-operations-item">
            <div className="recent-operations-item-left">
              <IconPlaceholder label={item.iconLabel} size={32} circular />
              <div className="recent-operations-item-info">
                <p className="recent-operations-item-title">{item.title}</p>
                <p className="recent-operations-item-subtitle">
                  {item.category} • {item.timeAgo}
                </p>
              </div>
            </div>
            <p className={`recent-operations-item-amount ${item.amount >= 0 ? 'amount-positive' : 'amount-negative'}`}>
              {item.amount >= 0 ? '+' : '-'} {Math.abs(item.amount).toLocaleString('pl-PL', { minimumFractionDigits: 2 })} zł
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
