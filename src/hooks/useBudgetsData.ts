import { useState, useEffect } from 'react'
import { fetchApi } from '../api/client'

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
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [summary, setSummary] = useState<BudgetsSummary | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        setError(null)

        const [budgetsData, summaryData] = await Promise.all([
          fetchApi<Budget[]>('/budgets'),
          fetchApi<BudgetsSummary>('/budget-status')
        ])

        setBudgets(budgetsData)
        setSummary(summaryData)
      } catch (err: any) {
        setError(err.message || 'Wystąpił błąd podczas pobierania danych budżetowych')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  return { isLoading, error, budgets, summary }
}
