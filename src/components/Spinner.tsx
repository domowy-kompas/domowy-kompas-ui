import type { ReactElement } from 'react'
import './Spinner.css'

export function Spinner(): ReactElement {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  )
}