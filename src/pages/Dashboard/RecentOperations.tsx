import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import type { OperationItem } from './dashboardData'
import './RecentOperations.css'

interface RecentOperationsProps {
  items: OperationItem[]
}

export function RecentOperations({ items }: RecentOperationsProps): ReactElement {
  return (
    <div className="dashboard-card">
      <div className="recent-operations-header">
        <h2 className="dashboard-card-title">Ostatnie operacje</h2>
        <Link to="/transactions" className="recent-operations-button">Zobacz wszystkie</Link>
      </div>
      <div className="recent-operations-list">
        {items.map((item) => (
          <div key={item.id} className="recent-operations-item">
            <div className="recent-operations-item-left">
              <div className="operation-icon-wrapper">
                <img src={item.iconSrc} alt={item.category} className="operation-icon" />
              </div>
              <div className="recent-operations-item-info">
                <p className="recent-operations-item-title">{item.title}</p>
                <p className="recent-operations-item-subtitle">
                  {item.category} • {item.timeAgo}
                </p>
              </div>
            </div>
            <div className="recent-operations-item-right">
              <p className={`recent-operations-item-amount ${item.amountType === 'income' ? 'amount-income' : 'amount-outcome'}`}>
                {item.amount >= 0 ? '+' : '-'} {Math.abs(item.amount).toLocaleString('pl-PL', { minimumFractionDigits: 2 })} zł
              </p>
              <p className="recent-operations-item-method">{item.paymentMethod}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
