export interface KpiData {
  iconSrc: string
  label: string
  value: string
  badgeText: string
  badgeColor: 'green' | 'peach' | 'blue'
}

export interface BudgetItem {
  name: string
  iconSrc: string
  spent: number
  limit: number
  percent: number
  status: 'ok' | 'warning' | 'danger'
}

export interface GoalItem {
  name: string
  iconSrc: string
  saved: number
  target: number
  percent: number
}

export interface OperationItem {
  id: string
  title: string
  category: string
  timeAgo: string
  amount: number
  amountType: 'income' | 'outcome'
  iconSrc: string
  paymentMethod: string
}
