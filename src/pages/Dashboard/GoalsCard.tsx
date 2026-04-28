import type { ReactElement } from 'react'
import { IconPlaceholder } from './IconPlaceholder'
import { ProgressBar } from './ProgressBar'
import { goalItems } from './dashboardData'
import './CardWithList.css'

export function GoalsCard(): ReactElement {
  return (
    <div className="dashboard-card" style={{ marginTop: '24px' }}>
      <h2 className="dashboard-card-title">Cele oszczędnościowe</h2>
      <div className="dashboard-card-list">
        {goalItems.map((item) => (
          <div key={item.name} className="dashboard-card-item">
            <div className="dashboard-card-item-left">
              <IconPlaceholder label={item.iconLabel} size={24} circular />
              <div className="dashboard-card-item-info">
                <p className="dashboard-card-item-title">{item.name}</p>
                <p className="dashboard-card-item-amount">
                  {item.current.toLocaleString('pl-PL')} zł / {item.target.toLocaleString('pl-PL')} zł
                </p>
              </div>
            </div>
            <div className="dashboard-card-item-progress">
              <ProgressBar current={item.current} total={item.target} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
