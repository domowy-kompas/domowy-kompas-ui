export interface PaymentMethod {
  id: string
  name: string
  icon: string
  type: 'card' | 'cash' | 'transfer'
}
