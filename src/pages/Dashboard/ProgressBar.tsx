import type { ReactElement } from 'react'
import './ProgressBar.css'

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps): ReactElement {
  const percentage = Math.min(Math.round((current / total) * 100), 100)
  let colorClass = 'progress-bar--green'
  if (percentage >= 80) colorClass = 'progress-bar--red'
  else if (percentage >= 70) colorClass = 'progress-bar--orange'

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-track">
        <div
          className={`progress-bar-fill ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {percentage >= 80 && (
        <p className="progress-bar-warning">⚠ Zbliżasz się do limitu</p>
      )}
    </div>
  )
}
