import { useEffect, type ReactElement } from 'react'
import { useTransactions } from './hooks/useTransactions'
import { trackPageView } from '../../utils/analytics'
import { TransactionsHeader } from './components/TransactionsHeader'
import { TransactionsList } from './components/TransactionsList'
import { SummaryWidget } from './components/SummaryWidget'
import { BudgetWidget } from './components/BudgetWidget'
import { 
  TransactionsTableSkeleton, 
  SummaryWidgetSkeleton, 
  BudgetWidgetSkeleton 
} from './components/TransactionsSkeletons'
import './transactions.css'

export function TransactionsPage(): ReactElement {
  useEffect(() => { trackPageView('transactions') }, [])

  const { 
    transactions, 
    summary, 
    budget, 
    isLoading, 
    error, 
    filters, 
    updateFilters, 
    pagination 
  } = useTransactions()

  if (error) {
    return <div className="transactions-page">Błąd: {error}</div>
  }

  return (
    <div className="transactions-page">
      <TransactionsHeader filters={filters} updateFilters={updateFilters} />
      
      {isLoading ? (
        <TransactionsTableSkeleton />
      ) : (
        <TransactionsList transactions={transactions} pagination={pagination} />
      )}

      <div className="bottom-widgets">
        {isLoading || !summary ? (
          <SummaryWidgetSkeleton />
        ) : (
          <SummaryWidget summary={summary} />
        )}
        
        {isLoading || !budget ? (
          <BudgetWidgetSkeleton />
        ) : (
          <BudgetWidget budget={budget} />
        )}
      </div>
    </div>
  )
}
