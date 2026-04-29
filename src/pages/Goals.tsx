import type { ReactElement } from 'react'
import { useGoalsData } from '../hooks/useGoalsData'
import { GoalsSummarySkeleton, GoalsGridSkeleton } from './GoalsSkeletons'
import './Goals.css'

// Assets
import savingSumIcon from '../assets/goals/saving-sum.png'
import tipIcon from '../assets/goals/tip.png'
import tipIllustration from '../assets/goals/tip-2.png'
import plusIcon from '../assets/plus.png'
import calendarIcon from '../assets/budgets/calendar.png'

// Category Icons (assuming some mapping or using generic for now)
import transportIcon from '../assets/budgets/transport.png'
import homeIcon from '../assets/budgets/home.png' // using home as placeholder for cushion/shield if needed

// Goal Images
import carImage from '../assets/goals/goal-car.png'
import vacationImage from '../assets/goals/vacation-goal.png'
import cushionImage from '../assets/goals/cushion.png'

const GOAL_IMAGES: Record<string, string> = {
  'goal-car.png': carImage,
  'vacation-goal.png': vacationImage,
  'cushion.png': cushionImage
}

export function Goals(): ReactElement {
  const { goals, summary, isLoading, error } = useGoalsData()

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(val)

  if (error) {
    return <div className="goals-page">Błąd: {error}</div>
  }

  return (
    <div className="goals-page">
      {isLoading ? (
        <GoalsSummarySkeleton />
      ) : (
        <section className="goals-summary-row">
          <div className="goals-summary-card">
            <div className="summary-content-wrapper">
              <div className="summary-icon-box">
                <img src={savingSumIcon} alt="" />
              </div>
              <div className="summary-text-group">
                <span className="label">Suma oszczędności</span>
                <span className="value">{formatCurrency(summary?.totalSavings || 0)}</span>
              </div>
            </div>
            <div className="trend">
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 6 6 1 11 6"></polyline></svg>
              <span>+{summary?.percentageChange}% od zeszłego miesiąca</span>
            </div>
          </div>

          <div className="daily-tip-card">
            <div className="tip-content">
              <div className="tip-content-header">
                <div className="tip-icon">
                  <img src={tipIcon} alt="" />
                </div>
                <span>Codzienna porada</span>
              </div>
              <p className="tip-text">
                "{summary?.dailyTip}"
              </p>
            </div>
            <img src={tipIllustration} alt="" className="tip-illustration" />
          </div>
        </section>
      )}

      {isLoading ? (
        <GoalsGridSkeleton />
      ) : (
        <div className="goals-grid">
          {goals.map((goal) => (
            <div key={goal.id} className="goal-card">
              <div className="goal-hero">
                <img src={GOAL_IMAGES[goal.image] || goal.image} alt={goal.name} className="goal-image" />
                <div className="goal-percentage-badge">{goal.percentage}%</div>
              </div>
              <div className="goal-card-content">
                <div className="goal-card-header">
                  <h3>{goal.name}</h3>
                  <img src={transportIcon} alt="" className="goal-category-icon" />
                </div>

                <div className="goal-progress-wrapper">
                  <div className="goal-progress-fill" style={{ width: `${goal.percentage}%` }}></div>
                </div>

                <div className="goal-card-details">
                  <div className="detail-item">
                    <span className="label">Zebrano</span>
                    <span className="value">{formatCurrency(goal.current)}</span>
                  </div>
                  <div className="detail-item" style={{ textAlign: 'right' }}>
                    <span className="label">Cel</span>
                    <span className="value">{formatCurrency(goal.target)}</span>
                  </div>
                </div>

                <div className="goal-card-footer">
                  <div className="footer-item">
                    <img src={calendarIcon} alt="" className="footer-icon" />
                    <span>{goal.deadline}</span>
                  </div>
                  <div className="footer-item">
                    <svg className="footer-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 1 0-4Z"></path><circle cx="18" cy="12" r="1"></circle></svg>
                    <span>{goal.monthlyContribution} PLN/mc</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="add-goal-card">
            <div className="plus-circle">
              <img src={plusIcon} alt="" />
            </div>
            <h3>Dodaj nowy cel</h3>
            <p>Masz nowe marzenie? Zacznij na nie oszczędzać już dziś.</p>
          </div>
        </div>
      )}
    </div>
  )
}
