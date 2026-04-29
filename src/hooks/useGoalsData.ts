import { useState, useEffect } from 'react'

export interface Goal {
  id: string
  name: string
  current: number
  target: number
  deadline: string
  monthlyContribution: number
  percentage: number
  image: string
  category: string
}

export interface SavingsSummary {
  totalSavings: number
  percentageChange: number
  dailyTip: string
}

export function useGoalsData() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [summary, setSummary] = useState<SavingsSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // Simulate loading like the mock server middleware does
        const [goalsRes, summaryRes] = await Promise.all([
          fetch('http://localhost:3001/goals'),
          fetch('http://localhost:3001/savings-summary')
        ])

        if (!goalsRes.ok || !summaryRes.ok) throw new Error('Błąd pobierania danych')

        const goalsData = await goalsRes.json()
        const summaryData = await summaryRes.json()

        setGoals(goalsData)
        setSummary(summaryData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Wystąpił błąd')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { goals, summary, isLoading, error }
}
