import { useEffect, useState, type ReactElement } from 'react'
import { useGoalsData } from '../hooks/useGoalsData'
import { trackEvent, trackPageView } from '../utils/analytics'
import { GoalsSummarySkeleton, GoalsGridSkeleton } from './GoalsSkeletons'
import './Goals.css'
import { formatCurrency } from '../utils/format'
import { Loader2, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { addGoal } from '../api/firestore'

// Assets
import savingSumIcon from '../assets/goals/saving-sum.png'
import tipIcon from '../assets/goals/tip.png'
import tipIllustration from '../assets/goals/tip-2.png'
import plusIcon from '../assets/plus.png'

// New Icons for Goal Cards
import goalCalendarIcon from '../assets/goals/goal-calendar.png'
import goalCashIcon from '../assets/goals/goal-cash.png'

// Goal Images & Category Icons
import carImage from '../assets/goals/goal-car.png'
import carIcon from '../assets/goals/goal-car-2.png'
import vacationImage from '../assets/goals/vacation-goal.png'
import vacationIcon from '../assets/goals/goal-vacation-2.png'
import cushionImage from '../assets/goals/cushion.png'
import cushionIcon from '../assets/goals/goal-cushion-2.png'

const GOAL_IMAGES: Record<string, string> = {
  'goal-car.png': carImage,
  'vacation-goal.png': vacationImage,
  'cushion.png': cushionImage
}

const GOAL_ICONS: Record<string, string> = {
  'goal-car.png': carIcon,
  'vacation-goal.png': vacationIcon,
  'cushion.png': cushionIcon
}

export function Goals(): ReactElement {
  useEffect(() => { trackPageView('goals') }, [])

  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [name, setName] = useState('')
  const [current, setCurrent] = useState('')
  const [target, setTarget] = useState('')
  const [deadline, setDeadline] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')

  const resetForm = () => {
    setName('')
    setCurrent('')
    setTarget('')
    setDeadline('')
    setMonthlyContribution('')
  }

  const handleSave = async () => {
    if (!user || !name || !target) return
    setIsSaving(true)
    try {
      const currentNum = parseFloat(current) || 0
      const targetNum = parseFloat(target)
      const contributionNum = parseFloat(monthlyContribution) || 0
      const percentage = targetNum > 0 ? Math.round((currentNum / targetNum) * 100) : 0

      await addGoal(user.uid, {
        name,
        current: currentNum,
        target: targetNum,
        deadline,
        monthlyContribution: contributionNum,
        percentage,
        image: 'cushion.png',
        category: 'Inne',
      })

      trackEvent('goal_created', { name })
      setShowModal(false)
      resetForm()
      refreshGoals()
    } catch {
      trackEvent('data_load_error', { page_name: 'goals' })
    } finally {
      setIsSaving(false)
    }
  }

  const { goals, summary, isLoading, error, refreshGoals } = useGoalsData()

  useEffect(() => {
    if (!isLoading && goals.length > 0) {
      const avgProgress = Math.round(goals.reduce((sum, g) => sum + g.percentage, 0) / goals.length)
      trackEvent('goal_progress_tracked', { progress_percent: avgProgress, goal_count: goals.length })
    }
  }, [isLoading, goals])

  // use centralized formatter

  if (error) {
    trackEvent('data_load_error', { page_name: 'goals' })
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
                <img src={savingSumIcon} aria-hidden="true" />
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
                  <img src={tipIcon} aria-hidden="true" />
                </div>
                <span>Codzienna porada</span>
              </div>
              <p className="tip-text">
                "{summary?.dailyTip}"
              </p>
            </div>
            <img src={tipIllustration} aria-hidden="true" className="tip-illustration" />
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
                  <img src={GOAL_ICONS[goal.image]} aria-hidden="true" className="goal-category-icon" />
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
                    <img src={goalCalendarIcon} aria-hidden="true" className="footer-icon" />
                    <span>{goal.deadline}</span>
                  </div>
                  <div className="footer-item">
                    <img src={goalCashIcon} aria-hidden="true" className="footer-icon" />
                    <span>{goal.monthlyContribution} PLN/mc</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="add-goal-card" onClick={() => { resetForm(); setShowModal(true) }}>
            <div className="plus-circle">
              <img src={plusIcon} aria-hidden="true" />
            </div>
            <h3>Dodaj nowy cel</h3>
            <p>Masz nowe marzenie? Zacznij na nie oszczędzać już dziś.</p>
          </div>
        </div>
      )}

      {showModal && (
        <div className="goal-modal-overlay" onClick={() => { if (!isSaving) { resetForm(); setShowModal(false) } }}>
          <div className="goal-modal-box" onClick={e => e.stopPropagation()}>
            <div className="goal-modal-header">
              <h3>Dodaj nowy cel</h3>
              <button className="goal-modal-close" onClick={() => { resetForm(); setShowModal(false) }} disabled={isSaving}>
                <X size={20} />
              </button>
            </div>

            <div className="goal-modal-body">
              <div className="goal-form-group">
                <label className="goal-form-label">Nazwa celu</label>
                <input className="goal-form-input" type="text" placeholder="Np. Wakacje w Grecji" value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div className="goal-form-row">
                <div className="goal-form-group">
                  <label className="goal-form-label">Zebrano (PLN)</label>
                  <input className="goal-form-input" type="number" placeholder="0" min="0" value={current} onChange={e => setCurrent(e.target.value)} />
                </div>
                <div className="goal-form-group">
                  <label className="goal-form-label">Cel (PLN)</label>
                  <input className="goal-form-input" type="number" placeholder="0" min="0" value={target} onChange={e => setTarget(e.target.value)} />
                </div>
              </div>

              <div className="goal-form-row">
                <div className="goal-form-group">
                  <label className="goal-form-label">Termin</label>
                  <input className="goal-form-input" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
                </div>
                <div className="goal-form-group">
                  <label className="goal-form-label">Miesięczna składka (PLN)</label>
                  <input className="goal-form-input" type="number" placeholder="0" min="0" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="goal-modal-footer">
              <button className="goal-btn-cancel" onClick={() => { resetForm(); setShowModal(false) }} disabled={isSaving}>
                Anuluj
              </button>
              <button className="goal-btn-save" onClick={handleSave} disabled={isSaving || !name || !target}>
                {isSaving ? (
                  <>
                    <Loader2 size={20} className="goal-spinner" />
                    Zapisywanie...
                  </>
                ) : (
                  'Zapisz'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
