import { useEffect, type ReactElement } from 'react'
import { Greeting } from './Greeting'
import { trackPageView } from '../../utils/analytics'
import { KpiCards } from './KpiCards'
import { BudgetsCard } from './BudgetsCard'
import { GoalsCard } from './GoalsCard'
import { RecentOperations } from './RecentOperations'
import { useDashboardData } from '../../hooks/useDashboardData'
import { KpiCardsSkeleton, BudgetsCardSkeleton, GoalsCardSkeleton, RecentOperationsSkeleton } from './DashboardSkeletons'
import './Dashboard.css'

export function Dashboard(): ReactElement {
  useEffect(() => { trackPageView('dashboard') }, [])

  const { isLoading, error, kpiData, budgets, goals, transactions } = useDashboardData()

  if (error) {
    return (
      <div className="dashboard">
        <Greeting />
        <div className="dashboard-error">Wystąpił błąd: {error}</div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <Greeting />
      {isLoading ? (
        <>
          <KpiCardsSkeleton />
          <div className="dashboard-grid">
            <div className="dashboard-left-column">
              <BudgetsCardSkeleton />
              <GoalsCardSkeleton />
            </div>
            <div className="dashboard-right-column">
              <RecentOperationsSkeleton />
            </div>
          </div>
        </>
      ) : (
        <>
          <KpiCards data={kpiData} />
          <div className="dashboard-grid">
            <div className="dashboard-left-column">
              <BudgetsCard items={budgets} />
              <GoalsCard items={goals} />
            </div>
            <div className="dashboard-right-column">
              <RecentOperations items={transactions} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}