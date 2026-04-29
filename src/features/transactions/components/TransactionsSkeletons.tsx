import type { ReactElement } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const baseColor = "rgba(130, 130, 130, 0.15)"
const highlightColor = "rgba(130, 130, 130, 0.35)"

export function SummaryWidgetSkeleton(): ReactElement {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <div className="summary-card">
        {[1, 2, 3].map((i) => (
          <div key={i} className="summary-item">
            <div className="summary-icon">
              <Skeleton circle width={48} height={48} />
            </div>
            <div className="summary-info">
              <span className="summary-label"><Skeleton width={60} /></span>
              <span className="summary-value"><Skeleton width={80} /></span>
            </div>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  )
}

export function BudgetWidgetSkeleton(): ReactElement {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <div className="budget-card" style={{ minHeight: '220px' }}>
        <div className="budget-header">
          <Skeleton width={100} />
        </div>
        <div className="budget-title">
          <Skeleton width={200} />
        </div>
        <div className="budget-progress-container">
          <Skeleton height={8} borderRadius={4} />
        </div>
        <div className="budget-status-text">
          <Skeleton width={150} />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export function TransactionsTableSkeleton(): ReactElement {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <div className="transactions-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th style={{ width: '150px' }}><Skeleton width={60} /></th>
              <th><Skeleton width={150} /></th>
              <th style={{ width: '200px' }}><Skeleton width={80} /></th>
              <th style={{ width: '150px', textAlign: 'right' }}><Skeleton width={60} /></th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((i) => (
              <tr key={i} className="transaction-row">
                <td className="transaction-cell">
                  <div className="date-cell">
                    <Skeleton width={80} height={18} />
                    <Skeleton width={40} height={12} />
                  </div>
                </td>
                <td className="transaction-cell">
                  <div className="description-cell">
                    <Skeleton circle width={40} height={40} />
                    <div className="description-content">
                      <Skeleton width={140} height={18} />
                      <Skeleton width={80} height={14} />
                    </div>
                  </div>
                </td>
                <td className="transaction-cell">
                  <div className="method-cell">
                    <Skeleton circle width={16} height={16} />
                    <Skeleton width={100} />
                  </div>
                </td>
                <td className="transaction-cell amount-cell">
                  <Skeleton width={90} height={24} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SkeletonTheme>
  )
}
