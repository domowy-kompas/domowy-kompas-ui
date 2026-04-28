export interface KpiData {
  iconLabel: string
  label: string
  value: string
  badgeText: string
  badgeColor: 'green' | 'peach' | 'blue'
}

export interface BudgetItem {
  category: string
  current: number
  limit: number
  iconLabel: string
}

export interface GoalItem {
  name: string
  current: number
  target: number
  iconLabel: string
}

export interface OperationItem {
  id: string
  title: string
  category: string
  timeAgo: string
  amount: number
  iconLabel: string
}

export const kpiData: KpiData[] = [
  {
    iconLabel: 'Bank',
    label: 'Całkowite Saldo',
    value: '5 420,00 zł',
    badgeText: '+2.4%',
    badgeColor: 'green',
  },
  {
    iconLabel: 'Graph',
    label: 'Miesięczne Wydatki',
    value: '3 210,00 zł',
    badgeText: '32% dochodu',
    badgeColor: 'peach',
  },
  {
    iconLabel: 'TrendDown',
    label: 'Miesięczne Oszczędności',
    value: '1 210,00 zł',
    badgeText: '+8.1%',
    badgeColor: 'blue',
  },
]

export const budgetItems: BudgetItem[] = [
  { category: 'Jedzenie', current: 1200, limit: 1500, iconLabel: 'Cart' },
  { category: 'Transport', current: 800, limit: 1000, iconLabel: 'Fuel' },
  { category: 'Rozrywka', current: 450, limit: 500, iconLabel: 'Game' },
  { category: 'Rachunki', current: 1200, limit: 1300, iconLabel: 'Bill' },
]

export const goalItems: GoalItem[] = [
  { name: 'Samochód', current: 25000, target: 50000, iconLabel: 'Car' },
  { name: 'Fundusz Awaryjny', current: 15000, target: 20000, iconLabel: 'Umbrella' },
  { name: 'Wakacje', current: 3000, target: 8000, iconLabel: 'Beach' },
]

export const operationItems: OperationItem[] = [
  { id: '1', title: 'Lidl', category: 'Jedzenie', timeAgo: '2h temu', amount: -142.5, iconLabel: 'Cart' },
  { id: '2', title: 'Wypłata', category: 'Wynagrodzenie', timeAgo: '1d temu', amount: 8000, iconLabel: 'Money' },
  { id: '3', title: 'Orlen', category: 'Transport', timeAgo: '1d temu', amount: -250, iconLabel: 'Fuel' },
  { id: '4', title: 'Netflix', category: 'Rozrywka', timeAgo: '2d temu', amount: -59.99, iconLabel: 'TV' },
  { id: '5', title: 'Pensja dodatkowa', category: 'Wynagrodzenie', timeAgo: '3d temu', amount: 1200, iconLabel: 'Money' },
]
