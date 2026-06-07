import { useState, useEffect } from 'react'
import { getGoals } from '../api/firestore'
import { useAuth } from '../context/AuthContext'

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
  const { user } = useAuth()
  const [goals, setGoals] = useState<Goal[]>([])
  const [summary, setSummary] = useState<SavingsSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    if (!user) return

    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const goalsData = await getGoals(user.uid)
        setGoals(goalsData)
        
        const totalSavings = goalsData.reduce((acc, g) => acc + g.current, 0)
        setSummary({
          totalSavings,
          percentageChange: 4.2,
          dailyTip: "Twoje oszczędności rosną! Pamiętaj o regularnych wpłatach."
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Wystąpił błąd')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user, refreshTrigger])

  return { goals, summary, isLoading, error, refreshGoals: () => setRefreshTrigger(t => t + 1) }
}
