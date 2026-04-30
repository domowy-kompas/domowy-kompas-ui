import type { ReactElement } from 'react'
import { AddTransactionForm } from '../features/transactions/AddTransactionForm'

export function AddTransaction(): ReactElement {
  return (
    <div className="page-container">
      <AddTransactionForm />
    </div>
  )
}
