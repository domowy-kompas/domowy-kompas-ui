import type { ReactElement } from 'react'
import type { Transaction } from '../types'
import { formatCurrencySigned } from '../../../utils/format'

interface TransactionRowProps {
  transaction: Transaction
}

export function TransactionRow({ transaction }: TransactionRowProps): ReactElement {
  const isPositive = transaction.amount > 0
  
  const getIconColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'zakupy': return { bg: '#edf2ff', color: '#4c6ef5' }
      case 'praca': return { bg: '#ebfbee', color: '#40c057' }
      case 'dom': return { bg: '#fff4e6', color: '#fd7e14' }
      case 'rozrywka': return { bg: '#f3f0ff', color: '#7950f2' }
      case 'transport': return { bg: '#e3f2fd', color: '#1976d2' }
      default: return { bg: '#f8f9fa', color: '#495057' }
    }
  }

  const iconStyle = getIconColor(transaction.category)

  const formatAmount = (amount: number) => formatCurrencySigned(amount)

  const renderIcon = (name: string) => {
    switch (name) {
      case 'shopping-cart':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
      case 'banknote':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>
      case 'home':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      case 'ticket':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path></svg>
      case 'car':
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>
      default:
        return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
    }
  }

  const renderMethodIcon = (name: string) => {
    switch (name) {
      case 'credit-card':
        return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
      case 'landmark':
        return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="21" x2="21" y2="21"></line><line x1="3" y1="10" x2="21" y2="10"></line><polyline points="5 6 12 3 19 6"></polyline><line x1="4" y1="10" x2="4" y2="21"></line><line x1="20" y1="10" x2="20" y2="21"></line><line x1="8" y1="10" x2="8" y2="21"></line><line x1="12" y1="10" x2="12" y2="21"></line><line x1="16" y1="10" x2="16" y2="21"></line></svg>
      case 'wallet':
        return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
      case 'blik':
        return <span style={{ fontSize: '10px', fontWeight: 'bold' }}>BLIK</span>
      default:
        return null
    }
  }

  return (
    <tr className="transaction-row">
      <td className="transaction-cell">
        <div className="date-cell">
          <span className="date-text">{new Date(transaction.date).toLocaleDateString('pl-PL', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          <span className="time-text">{transaction.time}</span>
        </div>
      </td>
      <td className="transaction-cell">
        <div className="description-cell">
          <div className="category-icon-circle" style={{ backgroundColor: iconStyle.bg, color: iconStyle.color }}>
            {renderIcon(transaction.categoryIcon)}
          </div>
          <div className="description-content">
            <span className="description-title">{transaction.title}</span>
            <span className="description-category">{transaction.category}</span>
          </div>
        </div>
      </td>
      <td className="transaction-cell">
        <div className="method-cell">
          <span style={{ color: '#717171' }}>{renderMethodIcon(transaction.methodIcon)}</span>
          <span>{transaction.method}</span>
        </div>
      </td>
      <td className={`transaction-cell amount-cell ${isPositive ? 'amount-positive' : 'amount-negative'}`}>
        {formatAmount(transaction.amount)}
      </td>
    </tr>
  )
}
