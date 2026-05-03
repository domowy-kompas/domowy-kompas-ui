import type { ReactElement } from 'react'
import { TransactionRow } from './TransactionRow'
import type { Transaction } from '../types'

interface TransactionsListProps {
  transactions: Transaction[]
  pagination: {
    page: number
    setPage: (page: number) => void
    totalCount: number
    pageSize: number
    totalPages: number
  }
}

export function TransactionsList({ transactions, pagination }: TransactionsListProps): ReactElement {
  const startIdx = (pagination.page - 1) * pagination.pageSize + 1
  const endIdx = Math.min(pagination.page * pagination.pageSize, pagination.totalCount)

  return (
    <div className="transactions-container">
      <table className="transactions-table">
        <thead>
          <tr>
            <th style={{ width: '150px' }}>Data</th>
            <th>Kategoria & Opis</th>
            <th style={{ width: '200px' }}>Metoda</th>
            <th style={{ width: '150px', textAlign: 'right' }}>Kwota</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <TransactionRow key={tx.id} transaction={tx} />
          ))}
        </tbody>
      </table>
      
      <div className="transactions-footer">
        <div>
          Pokazano {startIdx}-{endIdx} z {pagination.totalCount} transakcji
        </div>
        <div className="pagination-controls">
          <button 
            className="page-btn" 
            disabled={pagination.page === 1}
            onClick={() => pagination.setPage(pagination.page - 1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
            const pageNum = i + 1
            return (
              <button 
                key={pageNum}
                className={`page-btn ${pagination.page === pageNum ? 'page-btn-active' : ''}`}
                onClick={() => pagination.setPage(pageNum)}
              >
                {pageNum}
              </button>
            )
          })}
          
          {pagination.totalPages > 5 && <span style={{ padding: '0 4px' }}>...</span>}
          {pagination.totalPages > 5 && (
            <button 
              className={`page-btn ${pagination.page === pagination.totalPages ? 'page-btn-active' : ''}`}
              onClick={() => pagination.setPage(pagination.totalPages)}
            >
              {pagination.totalPages}
            </button>
          )}

          <button 
            className="page-btn"
            disabled={pagination.page === pagination.totalPages}
            onClick={() => pagination.setPage(pagination.page + 1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
