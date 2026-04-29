import type { ReactElement } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function KpiCardsSkeleton(): ReactElement {
  return (
    <SkeletonTheme baseColor="rgba(130, 130, 130, 0.15)" highlightColor="rgba(130, 130, 130, 0.35)">
      <div className="kpi-cards">
        {[1, 2, 3].map((i) => (
          <div key={i} className="kpi-card">
            <div className="kpi-card-header">
              <Skeleton circle width={40} height={40} />
              <Skeleton width={60} height={24} borderRadius={12} />
            </div>
            <p className="kpi-card-label" style={{ marginTop: '16px' }}>
              <Skeleton width="60%" />
            </p>
            <p className="kpi-card-value">
              <Skeleton width="80%" height={32} />
            </p>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  )
}

export function BudgetsCardSkeleton(): ReactElement {
  return (
    <SkeletonTheme baseColor="rgba(130, 130, 130, 0.15)" highlightColor="rgba(130, 130, 130, 0.35)">
      <div className="dashboard-card">
        <div className="dashboard-card-header-with-link">
          <h2 className="dashboard-card-title"><Skeleton width={150} /></h2>
          <Skeleton width={60} />
        </div>
        <div className="dashboard-card-list">
          {[1, 2, 3].map((i) => (
            <div key={i} className="budget-item">
              <div className="budget-item-header">
                <span className="budget-item-title"><Skeleton width={120} /></span>
                <span className="budget-item-percentage"><Skeleton width={40} /></span>
              </div>
              <div style={{ marginTop: '8px' }}>
                <Skeleton height={8} borderRadius={4} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  )
}

export function GoalsCardSkeleton(): ReactElement {
  return (
    <SkeletonTheme baseColor="rgba(130, 130, 130, 0.15)" highlightColor="rgba(130, 130, 130, 0.35)">
      <div className="dashboard-card">
        <div className="dashboard-card-header-with-icon">
          <h2 className="dashboard-card-title"><Skeleton width={180} /></h2>
          <Skeleton circle width={24} height={24} />
        </div>
        <div className="dashboard-card-list">
          {[1, 2].map((i) => (
            <div key={i} className="dashboard-card-item">
              <div className="dashboard-card-item-left" style={{ width: '100%' }}>
                <div className="goal-icon-wrapper" style={{ background: 'transparent' }}>
                  <Skeleton circle width={48} height={48} />
                </div>
                <div className="dashboard-card-item-info" style={{ flex: 1 }}>
                  <div className="budget-item-header">
                    <span className="budget-item-title"><Skeleton width={100} /></span>
                    <span className="budget-item-percentage"><Skeleton width={30} /></span>
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <Skeleton height={8} borderRadius={4} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  )
}

export function RecentOperationsSkeleton(): ReactElement {
  return (
    <SkeletonTheme baseColor="rgba(130, 130, 130, 0.15)" highlightColor="rgba(130, 130, 130, 0.35)">
      <div className="dashboard-card">
        <div className="recent-operations-header">
          <h2 className="dashboard-card-title"><Skeleton width={150} /></h2>
          <Skeleton width={100} height={32} borderRadius={16} />
        </div>
        <div className="recent-operations-list">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="recent-operations-item">
              <div className="recent-operations-item-left">
                <div className="operation-icon-wrapper" style={{ background: 'transparent' }}>
                  <Skeleton circle width={40} height={40} />
                </div>
                <div className="recent-operations-item-info">
                  <p className="recent-operations-item-title"><Skeleton width={140} /></p>
                  <p className="recent-operations-item-subtitle"><Skeleton width={90} /></p>
                </div>
              </div>
              <div className="recent-operations-item-right" style={{ alignItems: 'flex-end' }}>
                <p className="recent-operations-item-amount"><Skeleton width={80} /></p>
                <p className="recent-operations-item-method"><Skeleton width={60} /></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  )
}
