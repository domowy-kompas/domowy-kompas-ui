import type { ReactElement } from 'react'
import type { BudgetStatus } from '../types'

interface BudgetWidgetProps {
  budget: BudgetStatus | null
}

export function BudgetWidget({ budget }: BudgetWidgetProps): ReactElement {
  if (!budget) return <div className="budget-card">Ładowanie budżetu...</div>

  return (
    <div className="budget-card">
      <div className="budget-bg-pattern">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 150L50 100L100 150L150 100L200 150V200H0V150Z" fill="white" fillOpacity="0.1" />
          <path d="M0 170L50 120L100 170L150 120L200 170V200H0V170Z" fill="white" fillOpacity="0.1" />
        </svg>
      </div>
      
      <div className="budget-header">PLANOWANY BUDŻET</div>
      <div className="budget-title">Utrzymujesz się w normie!</div>
      
      <div className="budget-progress-container">
        <div className="budget-progress-bar">
          <div className="budget-progress-fill" style={{ width: `${budget.percentageUsed}%` }}></div>
        </div>
      </div>
      
      <div className="budget-status-text">
        Wykorzystano {budget.percentageUsed}% miesięcznego limitu ({budget.spentAmount.toLocaleString('pl-PL')} zł / {budget.totalLimit.toLocaleString('pl-PL')} zł)
      </div>
    </div>
  )
}
