import type { ReactElement } from 'react'
import type { GoalItem } from './dashboardData'
import pigIcon from '../../assets/dashboard/saving-goals-pig.png'
import './CardWithList.css'

interface GoalsCardProps {
  items: GoalItem[]
}

export function GoalsCard({ items }: GoalsCardProps): ReactElement {
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' zł'
  }

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header-with-icon">
        <h2 className="dashboard-card-title">Cele oszczędnościowe</h2>
        <img src={pigIcon} alt="Pig" className="dashboard-header-icon" />
      </div>
      <div className="dashboard-card-list">
        {items.map((item) => {
          const missing = item.target - item.saved
          return (
            <div key={item.name} className="goal-item-new">
              {/* Icon wrapper */}
              {/* icon removed per design */}

              {/* Content wrapper */}
              <div className="goal-item-content">
                {/* Top row: name | percent */}
                <div className="goal-item-header">
                  <span className="goal-item-name">{item.name}</span>
                  <span className="goal-item-percent">{item.percent}%</span>
                </div>

                {/* Progress bar */}
                <div className="goal-progress-wrapper">
                  <div 
                    className="goal-progress-bar" 
                    style={{
                      width: `${Math.min(item.percent, 100)}%`,
                      backgroundColor: '#1D9E75',
                    }}
                  />
                </div>

                {/* Bottom row: saved amount | missing or achieved */}
                <div className="goal-item-footer">
                  <span className="goal-item-saved">
                    {formatCurrency(item.saved)} z {formatCurrency(item.target)}
                  </span>
                  <span className="goal-item-missing">
                    {item.percent >= 100 ? 'Cel osiągnięty ✓' : `brakuje ${formatCurrency(missing)}`}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
