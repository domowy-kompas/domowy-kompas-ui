import type { ReactElement } from 'react'
import type { TransactionsSummary } from '../types'
import { formatCurrencySigned } from '../../../utils/format'

interface SummaryWidgetProps {
  summary: TransactionsSummary | null
}

export function SummaryWidget({ summary }: SummaryWidgetProps): ReactElement {
  const formatCurrency = (val: number) => formatCurrencySigned(val)

  if (!summary) return <div className="summary-card">Ładowanie podsumowania...</div>

  return (
    <div className="summary-card">
      <div className="summary-item">
        <div className="summary-icon" style={{ backgroundColor: '#ebfbee', color: '#40c057' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
        </div>
        <div className="summary-info">
          <span className="summary-label">Suma przychodów</span>
          <span className="summary-value" style={{ color: '#10b981' }}>{formatCurrency(summary.totalIncome)}</span>
        </div>
      </div>

      <div className="summary-item">
        <div className="summary-icon" style={{ backgroundColor: '#fff5f5', color: '#fa5252' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
        </div>
        <div className="summary-info">
          <span className="summary-label">Suma wydatków</span>
          <span className="summary-value">{formatCurrency(-summary.totalExpenses)}</span>
        </div>
      </div>

      <div className="summary-item">
        <div className="summary-icon" style={{ backgroundColor: '#e7f5ff', color: '#228be6' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 1 0-4Z"></path><circle cx="18" cy="12" r="1"></circle></svg>
        </div>
        <div className="summary-info">
          <span className="summary-label">Bilans netto</span>
          <span className="summary-value" style={{ color: '#228be6' }}>{formatCurrency(summary.netBalance)}</span>
        </div>
      </div>
    </div>
  )
}
