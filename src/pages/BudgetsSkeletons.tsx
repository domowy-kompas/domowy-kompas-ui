import type { ReactElement } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SKELETON_COLORS = {
  baseColor: "rgba(130, 130, 130, 0.15)",
  highlightColor: "rgba(130, 130, 130, 0.35)"
}

export function BudgetsSummarySkeleton(): ReactElement {
  return (
    <SkeletonTheme {...SKELETON_COLORS}>
      <div className="budgets-summary-grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="summary-card">
            <span className="summary-label"><Skeleton width={100} /></span>
            <div className="summary-value"><Skeleton width={150} height={40} /></div>
            {i === 2 && (
              <div style={{ marginTop: '16px' }}>
                <Skeleton height={8} borderRadius={4} />
              </div>
            )}
          </div>
        ))}
      </div>
    </SkeletonTheme>
  )
}

export function BudgetsGridSkeleton(): ReactElement {
  return (
    <SkeletonTheme {...SKELETON_COLORS}>
      <div className="categories-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="category-card">
            <div className="category-card-header">
              <Skeleton width={48} height={48} borderRadius={12} />
              <Skeleton width={60} />
            </div>
            
            <div className="category-info" style={{ marginTop: '16px' }}>
              <Skeleton width={120} height={24} />
              <div style={{ marginTop: '4px' }}>
                <Skeleton width={80} />
              </div>
            </div>

            <div className="category-stats" style={{ marginTop: '20px' }}>
              <Skeleton width={100} />
              <Skeleton width={30} />
            </div>

            <div style={{ marginTop: '8px' }}>
              <Skeleton height={6} borderRadius={3} />
            </div>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  )
}
