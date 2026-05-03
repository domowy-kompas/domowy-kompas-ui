import { useState, useEffect } from 'react'
import { getBudgets } from '../api/firestore'
import { useAuth } from '../context/AuthContext'

export interface Budget {
  id: string
  name: string
  spent: number
  limit: number
  color: string
}

export interface BudgetsSummary {
  spentAmount: number
  totalLimit: number
  percentageUsed: number
}

export function useBudgetsData() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [summary, setSummary] = useState<BudgetsSummary | null>(null)

  useEffect(() => {
    async function loadData() {
      if (!user) return

      try {
        setIsLoading(true)
        setError(null)

        const budgetsData = await getBudgets(user.uid)
        setBudgets(budgetsData)
        
        // Calculate summary locally from Firestore data
        const spentAmount = budgetsData.reduce((acc, b) => acc + b.spent, 0)
        const totalLimit = budgetsData.reduce((acc, b) => acc + b.limit, 0)
        const percentageUsed = totalLimit > 0 ? Math.round((spentAmount / totalLimit) * 100) : 0
        
        setSummary({ spentAmount, totalLimit, percentageUsed })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Wystąpił błąd podczas pobierania danych budżetowych'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [user])

  return { isLoading, error, budgets, summary }
}
