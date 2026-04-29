import type { ReactElement } from 'react'
import { ProgressBar } from './ProgressBar'
import { goalItems } from './dashboardData'
import pigIcon from '../../assets/dashboard/saving-goals-pig.png'
import './CardWithList.css'

export function GoalsCard(): ReactElement {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header-with-icon">
        <h2 className="dashboard-card-title">Cele oszczędnościowe</h2>
        <img src={pigIcon} alt="Pig" className="dashboard-header-icon" />
      </div>
      <div className="dashboard-card-list">
        {goalItems.map((item) => (
          <div key={item.name} className="dashboard-card-item">
            <div className="dashboard-card-item-left">
              <div className="goal-icon-wrapper">
                <img src={item.iconSrc} alt={item.name} className="goal-icon" />
              </div>
              <div className="dashboard-card-item-info">
                <div className="budget-item-header">
                  <span className="budget-item-title">{item.name}</span>
                  <span className="budget-item-percentage percentage--gray">
                    {item.percentage}%
                  </span>
                </div>
                <ProgressBar 
                  percentage={item.percentage} 
                  colorClass={item.colorClass} 
                  showWarning={false} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
