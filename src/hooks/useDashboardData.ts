import { useState, useEffect } from 'react'
import { getBudgets, getGoals, getTransactions } from '../api/firestore'
import { useAuth } from '../context/AuthContext'
import { formatCurrency } from '../utils/format'

// API Types
interface ApiSummary {
  totalBalance: number
  monthlyIncome: number
  monthlyExpenses: number
}

interface ApiBudget {
  id: string
  name: string
  spent: number
  limit: number
  color: string
}

interface ApiGoal {
  id: string
  name: string
  current: number
  target: number
  color: string
}

interface ApiTransaction {
  id: string
  date: string
  title: string
  amount: number
  category: string
  status: string
}

// Frontend mapped types
import currentStateIcon from '../assets/dashboard/current-state.png'
import monthIncomeIcon from '../assets/dashboard/month-income.png'
import monthOutcomeIcon from '../assets/dashboard/month-outcome.png'
import cartIcon from '../assets/dashboard/transactions-biedronka.png'
import tvIcon from '../assets/dashboard/transactions-netflix.png'
import fuelIcon from '../assets/dashboard/transactions-orlen.png'
import moneyIcon from '../assets/dashboard/transactions-pay.png'
import foodIcon from '../assets/dashboard/transactions-pizza.png'
import pigIcon from '../assets/dashboard/saving-goals-pig.png'
import carIcon from '../assets/dashboard/saving-goals-car.png'
import vacationIcon from '../assets/dashboard/saving-goals-vacation.png'

import type { KpiData, BudgetItem, GoalItem, OperationItem } from '../pages/Dashboard/dashboardData'

export function useDashboardData() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [kpiData, setKpiData] = useState<KpiData[]>([])
  const [budgets, setBudgets] = useState<BudgetItem[]>([])
  const [goals, setGoals] = useState<GoalItem[]>([])
  const [transactions, setTransactions] = useState<OperationItem[]>([])

  useEffect(() => {
    async function loadData() {
      if (!user) return

      try {
        setIsLoading(true)
        setError(null)

        const [fBudgets, fGoals, fTransactions] = await Promise.all([
          getBudgets(user.uid),
          getGoals(user.uid),
          getTransactions(user.uid)
        ])

        const budgetsData = fBudgets as unknown as ApiBudget[]
        const goalsData = fGoals as unknown as ApiGoal[]
        const txData = fTransactions as unknown as ApiTransaction[]

        // Calculate summary locally
        const now = new Date('2026-04-29') // Consistent with mock data
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()

        const monthlyIncome = fTransactions
          .filter(t => {
            const d = new Date(t.date)
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear && t.amount > 0
          })
          .reduce((acc, t) => acc + t.amount, 0)

        const monthlyExpenses = Math.abs(fTransactions
          .filter(t => {
            const d = new Date(t.date)
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear && t.amount < 0
          })
          .reduce((acc, t) => acc + t.amount, 0))

        const totalBalance = fTransactions.reduce((acc, t) => acc + t.amount, 0)

        const summaryData: ApiSummary = { totalBalance, monthlyIncome, monthlyExpenses }

        // 1. Map KPI
        setKpiData([
          {
            iconSrc: currentStateIcon,
            label: 'Całkowite Saldo',
            value: formatCurrency(summaryData.totalBalance),
            badgeText: '+2.4%', 
            badgeColor: 'green',
          },
          {
            iconSrc: monthIncomeIcon,
            label: 'Miesięczne Dochody',
            value: formatCurrency(summaryData.monthlyIncome),
            badgeText: 'W tym miesiącu',
            badgeColor: 'blue',
          },
          {
            iconSrc: monthOutcomeIcon,
            label: 'Miesięczne Wydatki',
            value: formatCurrency(summaryData.monthlyExpenses),
            badgeText: summaryData.monthlyIncome > 0 
              ? `${Math.round((summaryData.monthlyExpenses / summaryData.monthlyIncome) * 100)}% dochodu`
              : '0% dochodu',
            badgeColor: 'peach',
          },
        ])

        // 2. Map Budgets - sorted by percentage descending, limited to 3
        const getBudgetIcon = (name: string) => {
          // Map budget categories to asset icons
          const iconMap: Record<string, string> = {
            'dom': pigIcon,
            'rozrywka': tvIcon,
            'jedzenie': foodIcon,
            'transport': fuelIcon,
            'zakupy': cartIcon,
            'podróże': vacationIcon,
          }
          return iconMap[name.toLowerCase()] || moneyIcon
        }

        setBudgets(
          budgetsData
            .map(b => {
              const percent = Math.round((b.spent / b.limit) * 100)
              let status: 'ok' | 'warning' | 'danger' = 'ok'
              if (percent >= 100) status = 'danger'
              else if (percent >= 80) status = 'warning'

              return {
                name: b.name,
                iconSrc: getBudgetIcon(b.name),
                spent: b.spent,
                limit: b.limit,
                percent,
                status,
              }
            })
            .sort((a, b) => b.percent - a.percent)
            .slice(0, 3)
        )

        // 3. Map Goals - sorted by percentage descending, limited to 2
        const getGoalIcon = (idx: number) => {
          // Alternate between car and vacation icons for goal types
          const icons = [carIcon, vacationIcon]
          return icons[idx % icons.length]
        }

        setGoals(
          goalsData
            .map((g, idx) => {
              const percent = Math.round((g.current / g.target) * 100)
              return {
                name: g.name,
                iconSrc: getGoalIcon(idx),
                saved: g.current,
                target: g.target,
                percent,
              }
            })
            .sort((a, b) => b.percent - a.percent)
            .slice(0, 2)
        )

        // 4. Map Transactions
        const getIconForCategory = (cat: string) => {
          switch (cat.toLowerCase()) {
            case 'jedzenie': return cartIcon
            case 'rozrywka': return tvIcon
            case 'transport': return fuelIcon
            case 'wpływy': return moneyIcon
            case 'praca': return moneyIcon
            case 'zakupy': return cartIcon
            default: return foodIcon
          }
        }

        const formatDate = (dateString: string) => {
          const date = new Date(dateString)
          return date.toLocaleDateString('pl-PL', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
        }

        setTransactions(txData.slice(0, 5).map(t => ({
          id: t.id,
          title: t.title,
          category: t.category,
          timeAgo: formatDate(t.date),
          amount: t.amount,
          amountType: t.amount >= 0 ? 'income' : 'outcome',
          iconSrc: getIconForCategory(t.category),
          paymentMethod: 'Karta/Przelew',
        })))

      } catch (err) {
        const message = err instanceof Error ? err.message : 'Wystąpił błąd podczas pobierania danych z serwera'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [user])

  return { isLoading, error, kpiData, budgets, goals, transactions }
}
