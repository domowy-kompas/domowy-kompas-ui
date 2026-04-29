import type { ReactElement } from 'react'
import './ProgressBar.css'

interface ProgressBarProps {
  percentage: number
  colorClass?: string
  showWarning?: boolean
}

export function ProgressBar({ percentage, colorClass = 'green', showWarning = false }: ProgressBarProps): ReactElement {
  const boundedPercentage = Math.min(Math.max(percentage, 0), 100)
  
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-track">
        <div
          className={`progress-bar-fill progress-bar--${colorClass}`}
          style={{ width: `${boundedPercentage}%` }}
        />
      </div>
      {showWarning && boundedPercentage >= 90 && (
        <p className="progress-bar-warning">
          <span className="progress-bar-warning-icon">⚠</span> Zbliżasz się do limitu
        </p>
      )}
    </div>
  )
}
