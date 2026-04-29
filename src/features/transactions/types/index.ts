export interface Transaction {
  id: string
  date: string // ISO string or short date e.g. "2024-10-12"
  time: string // e.g. "14:30"
  title: string // e.g. "Biedronka - Zakupy spożywcze"
  category: string // e.g. "Zakupy"
  categoryIcon: string // identifier for the icon, e.g. "cart", "money", "home", "ticket"
  method: string // e.g. "Karta mBank"
  methodIcon: string // identifier for the method icon, e.g. "credit-card", "bank"
  amount: number
}

export interface TransactionsSummary {
  totalIncome: number
  totalExpenses: number
  netBalance: number
}

export interface BudgetStatus {
  spentAmount: number
  totalLimit: number
  percentageUsed: number
}
