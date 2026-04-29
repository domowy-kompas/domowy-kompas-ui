import type { ReactElement } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const baseColor = "rgba(130, 130, 130, 0.15)"
const highlightColor = "rgba(130, 130, 130, 0.35)"

export function GoalsSummarySkeleton(): ReactElement {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <div className="goals-summary-row">
        <div className="goals-summary-card skeleton">
          <div className="summary-icon-box">
            <Skeleton width={48} height={48} borderRadius={12} />
          </div>
          <div className="summary-text-content">
            <Skeleton width={120} height={14} />
            <Skeleton width={180} height={32} style={{ marginTop: '8px' }} />
            <Skeleton width={140} height={12} style={{ marginTop: '8px' }} />
          </div>
        </div>
        <div className="daily-tip-card skeleton">
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Skeleton circle width={32} height={32} />
              <Skeleton width={120} height={14} />
            </div>
            <Skeleton count={2} width="90%" />
          </div>
          <Skeleton width={120} height={120} borderRadius={16} />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export function GoalsGridSkeleton(): ReactElement {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <div className="goals-grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="goal-card skeleton">
            <Skeleton height={200} borderRadius="16px 16px 0 0" />
            <div className="goal-card-content">
              <div className="goal-card-header">
                <Skeleton width={150} height={20} />
                <Skeleton width={24} height={24} />
              </div>
              <div style={{ marginTop: '20px' }}>
                <Skeleton height={8} borderRadius={4} />
              </div>
              <div className="goal-card-details" style={{ marginTop: '20px' }}>
                <div>
                  <Skeleton width={60} height={12} />
                  <Skeleton width={80} height={18} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Skeleton width={40} height={12} />
                  <Skeleton width={80} height={18} />
                </div>
              </div>
              <div className="goal-card-footer" style={{ marginTop: '24px' }}>
                <Skeleton width={100} height={14} />
                <Skeleton width={80} height={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  )
}
