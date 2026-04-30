import { useState, useEffect } from 'react'

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
  const [fullData, setFullData] = useState<ReportsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const res = await fetch('http://localhost:3001/reports')
        if (!res.ok) throw new Error('Błąd pobierania danych raportów')
        const jsonData = await res.json()
        setFullData(jsonData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Wystąpił błąd')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { 
    data: (fullData ? fullData[period] : null) as ReportData | null, 
    historicalData: fullData ? fullData.historicalData : [],
    isLoading: isLoading || !fullData, 
    error 
  }
}
