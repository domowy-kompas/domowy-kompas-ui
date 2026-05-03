import { useState, useEffect } from 'react'
import { getReports } from '../api/firestore'
import { useAuth } from '../context/AuthContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

export interface ReportSummary {
  totalIncome: number
  incomeTrend: number
  totalExpenses: number
  expensesTrend: number
  netSavings: number
  savingsTrend: number
}

export interface HistoricalData {
  month: string
  income: number
  expenses: number
}

export interface ReportCategory {
  name: string
  amount: number
  percentage: number
  limit: number
  color: string
  icon: string
}

export interface ReportData {
  summary: ReportSummary
  historicalData: HistoricalData[]
  categories: ReportCategory[]
}

interface ReportsResponse {
  historicalData: HistoricalData[]
  [key: string]: ReportData | HistoricalData[]
}

export function useReportsData(period: string) {
  const { user } = useAuth()
  const [fullData, setFullData] = useState<ReportsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        setIsLoading(true)
        setError(null)

        // Fetch from Firestore
        const [reportsData, historicalSnapshot] = await Promise.all([
          getReports(user.uid),
          getDoc(doc(db, 'users', user.uid, 'metadata', 'historical'))
        ])

        const historicalData = historicalSnapshot.exists() ? (historicalSnapshot.data().data as HistoricalData[]) : []
        
        const response: ReportsResponse = { historicalData }
        
        // Map snapshots back to the expected keys (Miesiąc, Kwartał, Rok)
        reportsData.forEach((report) => {
          const rawId = (report.id || '').toLowerCase()
          const periodKey = rawId === 'miesiąc' ? 'Miesiąc' : 
                            rawId === 'kwartał' ? 'Kwartał' : 
                            rawId === 'rok' ? 'Rok' : rawId
          response[periodKey] = report
        })

        setFullData(response)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Wystąpił błąd')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user])

  return { 
    data: (fullData ? fullData[period] : null) as ReportData | null, 
    historicalData: fullData ? fullData.historicalData : [],
    isLoading: isLoading || !fullData, 
    error 
  }
}
