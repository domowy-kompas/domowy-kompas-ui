import { useState, useEffect, useCallback, useMemo } from 'react'
import { getTransactions, getBudgets } from '../../../api/firestore'
import { useAuth } from '../../../context/AuthContext'
import type { Transaction, TransactionsSummary, BudgetStatus } from '../types'

export function useTransactions() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [allTransactions, setAllTransactions] = useState<Transaction[]>([])
  const [summary, setSummary] = useState<TransactionsSummary | null>(null)
  const [budget, setBudget] = useState<BudgetStatus | null>(null)

  const [filters, setFilters] = useState({
    search: '',
    period: 'Wszystkie',
    category: 'Wszystkie',
    type: 'Wszystkie' // Wszystkie / Wydatki
  })
  const [page, setPage] = useState(1)
  const pageSize = 4

  const loadData = useCallback(async () => {
    if (!user) return

    try {
      setIsLoading(true)
      setError(null)

      // Fetch from Firestore
      const [txData, budgetsData] = await Promise.all([
        getTransactions(user.uid),
        getBudgets(user.uid)
      ])

      setAllTransactions(txData)

      // Calculate summary locally
      const totalIncome = txData.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0)
      const totalExpenses = Math.abs(txData.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0))
      const netBalance = totalIncome - totalExpenses
      setSummary({ totalIncome, totalExpenses, netBalance })

      // Calculate budget status from budgets
      const spentAmount = budgetsData.reduce((acc, b) => acc + b.spent, 0)
      const totalLimit = budgetsData.reduce((acc, b) => acc + b.limit, 0)
      const percentageUsed = totalLimit > 0 ? Math.round((spentAmount / totalLimit) * 100) : 0
      setBudget({ spentAmount, totalLimit, percentageUsed })

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Wystąpił błąd podczas pobierania danych'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    Promise.resolve().then(() => {
      loadData()
    })
  }, [loadData])
// ... (rest of hook unchanged)

  // Frontend Filtering
  const filteredTransactions = useMemo(() => {
    const now = new Date('2026-04-29') // Hardcoded current date for consistent mock experience
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth()

    return allTransactions.filter(tx => {
      const txDate = new Date(tx.date)
      
      // 1. Period filter
      if (filters.period === 'Ten miesiąc') {
        if (txDate.getFullYear() !== currentYear || txDate.getMonth() !== currentMonth) {
          return false
        }
      } else if (filters.period === 'Poprzedni miesiąc') {
        const prevMonthDate = new Date(currentYear, currentMonth - 1, 1)
        if (txDate.getFullYear() !== prevMonthDate.getFullYear() || txDate.getMonth() !== prevMonthDate.getMonth()) {
          return false
        }
      } else if (filters.period === 'Ostatnie 3 miesiące') {
        const threeMonthsAgo = new Date(currentYear, currentMonth - 2, 1)
        if (txDate < threeMonthsAgo) {
          return false
        }
      }

      // 2. Search filter
      if (filters.search && !tx.title.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }
      
      // 3. Category filter
      if (filters.category !== 'Wszystkie' && tx.category !== filters.category) {
        return false
      }
      
      // 4. Type filter (Wydatki)
      if (filters.type === 'Wydatki' && tx.amount >= 0) {
        return false
      }
      
      return true
    })
  }, [allTransactions, filters])

  // Frontend Pagination
  const paginatedTransactions = useMemo(() => {
    const startIndex = (page - 1) * pageSize
    return filteredTransactions.slice(startIndex, startIndex + pageSize)
  }, [filteredTransactions, page])

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    setPage(1) // Reset to first page on filter change
  }

  return {
    transactions: paginatedTransactions,
    summary,
    budget,
    isLoading,
    error,
    filters,
    updateFilters,
    pagination: {
      page,
      setPage,
      totalCount: filteredTransactions.length,
      pageSize,
      totalPages: Math.ceil(filteredTransactions.length / pageSize)
    }
  }
}
