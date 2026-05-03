import currentStateIcon from '../../assets/dashboard/current-state.png'
import monthIncomeIcon from '../../assets/dashboard/month-income.png'
import monthOutcomeIcon from '../../assets/dashboard/month-outcome.png'

import carIcon from '../../assets/dashboard/saving-goals-car.png'
import vacationIcon from '../../assets/dashboard/saving-goals-vacation.png'

import cartIcon from '../../assets/dashboard/transactions-biedronka.png'
import tvIcon from '../../assets/dashboard/transactions-netflix.png'
import fuelIcon from '../../assets/dashboard/transactions-orlen.png'
import moneyIcon from '../../assets/dashboard/transactions-pay.png'
import foodIcon from '../../assets/dashboard/transactions-pizza.png'

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

export const kpiData: KpiData[] = [
  {
    iconSrc: currentStateIcon,
    label: 'Całkowite Saldo',
    value: '5 420,00 zł',
    badgeText: '+2.4%',
    badgeColor: 'green',
  },
  {
    iconSrc: monthIncomeIcon,
    label: 'Miesięczne Dochody',
    value: '8 000,00 zł',
    badgeText: 'W tym miesiącu',
    badgeColor: 'blue',
  },
  {
    iconSrc: monthOutcomeIcon,
    label: 'Miesięczne Wydatki',
    value: '2 580,00 zł',
    badgeText: '32% dochodu',
    badgeColor: 'peach',
  },
]

export const budgetItems: BudgetItem[] = [
  { category: 'Artykuły spożywcze', percentage: 60, colorClass: 'green' },
  { category: 'Rozrywka', percentage: 92, colorClass: 'brown' },
  { category: 'Transport', percentage: 20, colorClass: 'blue' },
]

export const goalItems: GoalItem[] = [
  { name: 'Nowy samochód', percentage: 45, iconSrc: carIcon, colorClass: 'green' },
  { name: 'Wakacje', percentage: 15, iconSrc: vacationIcon, colorClass: 'blue' },
]

export const operationItems: OperationItem[] = [
  { id: '1', title: 'Biedronka Supermarket', category: 'Artykuły spożywcze', timeAgo: 'Dziś, 10:24', amount: -142.5, iconSrc: cartIcon, paymentMethod: 'Karta płatnicza' },
  { id: '2', title: 'Wynagrodzenie - TechCorp', category: 'Dochód', timeAgo: '2 dni temu', amount: 8000, iconSrc: moneyIcon, paymentMethod: 'Przelew przychodzący' },
  { id: '3', title: 'Orlen Stacja Paliw', category: 'Transport', timeAgo: '3 dni temu', amount: -280, iconSrc: fuelIcon, paymentMethod: 'Karta płatnicza' },
  { id: '4', title: 'Subskrypcja Netflix', category: 'Rozrywka', timeAgo: '4 dni temu', amount: -60, iconSrc: tvIcon, paymentMethod: 'Subskrypcja' },
  { id: '5', title: 'Pizzeria Bella Italia', category: 'Rozrywka', timeAgo: '5 dni temu', amount: -124, iconSrc: foodIcon, paymentMethod: 'Karta płatnicza' },
]
