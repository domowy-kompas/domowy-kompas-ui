import { useEffect, type ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { trackEvent, trackPageView } from '../utils/analytics'
import { useBudgetsData } from '../hooks/useBudgetsData'
import { BudgetsSummarySkeleton, BudgetsGridSkeleton } from './BudgetsSkeletons'
import './Budgets.css'
import { formatCurrency } from '../utils/format'

// Icons
import foodIcon from '../assets/budgets/food.png'
import homeIcon from '../assets/budgets/home.png'
import entertainmentIcon from '../assets/budgets/entertainment.png'
import healthIcon from '../assets/budgets/health.png'
import transportIcon from '../assets/budgets/transport.png'
import otherIcon from '../assets/budgets/other.png'

const CATEGORY_ICONS: Record<string, string> = {
  'Jedzenie': foodIcon,
  'Dom': homeIcon,
  'Rozrywka': entertainmentIcon,
  'Zdrowie': healthIcon,
  'Transport': transportIcon,
  'Inne': otherIcon
}

export function Budgets(): ReactElement {
  useEffect(() => { trackPageView('budgets') }, [])

  const { isLoading, error, budgets, summary } = useBudgetsData()

  const getStatusColor = (percentage: number) => {
    if (percentage >= 100) return 'red'
    if (percentage >= 90) return 'orange'
    return 'teal'
  }

  if (error) {
    trackEvent('data_load_error', { page_name: 'budgets' })
    return (
      <div className="budgets-container">
        <header className="budgets-header">
          <div className="budgets-title-section">
            <h1>Twoje Budżety - Październik 2023</h1>
            <p>Przeglądaj i zarządzaj swoimi planami wydatków.</p>
          </div>
        </header>
        <div className="dashboard-error">Wystąpił błąd: {error}</div>
      </div>
    )
  }

  return (
    <div className="budgets-container">
      <header className="budgets-header">
        <div className="budgets-title-section">
          <h1>Twoje Budżety - Październik 2023</h1>
          <p>Przeglądaj i zarządzaj swoimi planami wydatków.</p>
        </div>
      </header>

      {isLoading ? (
        <>
          <BudgetsSummarySkeleton />
          <BudgetsGridSkeleton />
        </>
      ) : (
        <>
          <section className="budgets-summary-grid">
            <div className="summary-card total">
              <span className="summary-label">Całkowity Budżet</span>
              <div className="summary-value">{formatCurrency(summary?.totalLimit || 0)}</div>
            </div>

            <div className="summary-card spent">
              <span className="summary-label">Wydano</span>
              <div className="summary-value">
                {formatCurrency(summary?.spentAmount || 0)}
              </div>
              <div className="summary-progress-wrapper">
                <div 
                  className="summary-progress-bar" 
                  style={{ width: `${Math.min(summary?.percentageUsed || 0, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="summary-card remaining">
              <span className="summary-label">Pozostało</span>
              <div className="summary-value">
                {formatCurrency((summary?.totalLimit || 0) - (summary?.spentAmount || 0))}
              </div>
            </div>
          </section>

          <section className="categories-grid">
            {budgets.map(budget => {
              const percentage = budget.limit > 0 ? Math.round((budget.spent / budget.limit) * 100) : 0
              const status = getStatusColor(percentage)
              
              return (
                <div key={budget.id} className="category-card">
                  <div className="category-card-header">
                    <div className="category-icon-bg">
                      <img src={CATEGORY_ICONS[budget.name] || otherIcon} alt={budget.name} />
                    </div>
                    <Link to={`/budgets/${budget.id}`} className="details-link">Szczegóły</Link>
                  </div>
                  
                  <div className="category-info">
                    <h3>{budget.name}</h3>
                    <p className="category-limit">Limit: {formatCurrency(budget.limit)}</p>
                  </div>

                  <div className="category-stats">
                    <span className="category-spent-text">{formatCurrency(budget.spent)} wydane</span>
                    <span className={`category-percentage text-${status}`}>{percentage}%</span>
                  </div>

                  <div className="category-progress-wrapper">
                    <div 
                      className={`category-progress-bar progress-${status}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </section>
        </>
      )}
    </div>
  )
}