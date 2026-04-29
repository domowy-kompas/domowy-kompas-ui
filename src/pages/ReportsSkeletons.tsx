import type { ReactElement } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const baseColor = "rgba(130, 130, 130, 0.15)"
const highlightColor = "rgba(130, 130, 130, 0.35)"

export function ReportsGridSkeleton(): ReactElement {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <div className="reports-grid">
        {/* Summary Card Skeleton */}
        <div className="report-card kpi-card skeleton">
          <Skeleton width={150} height={18} />
          <div style={{ marginTop: '32px' }}>
            <Skeleton count={3} height={60} style={{ marginBottom: '24px' }} />
          </div>
        </div>

        {/* Bar Chart Card Skeleton */}
        <div className="report-card chart-card skeleton">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <Skeleton width={200} height={18} />
            <Skeleton width={120} height={18} />
          </div>
          <Skeleton height={240} />
        </div>

        {/* Donut Chart Card Skeleton */}
        <div className="report-card donut-card skeleton">
          <Skeleton width={180} height={18} style={{ marginBottom: '40px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Skeleton circle width={220} height={220} />
            <div style={{ marginTop: '40px', width: '100%' }}>
              <Skeleton count={4} height={14} style={{ marginBottom: '12px' }} />
            </div>
          </div>
        </div>

        {/* Deep Analysis Card Skeleton */}
        <div className="report-card analysis-card skeleton">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
            <Skeleton width={200} height={18} />
            <Skeleton width={80} height={14} />
          </div>
          <Skeleton count={5} height={60} style={{ marginBottom: '20px' }} />
        </div>
      </div>
    </SkeletonTheme>
  )
}
