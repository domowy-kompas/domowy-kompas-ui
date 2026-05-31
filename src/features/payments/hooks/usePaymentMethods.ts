import { useState, useCallback } from 'react'
import type { PaymentMethod } from '../types'

const defaultMethods: PaymentMethod[] = [
  { id: '1', name: 'Karta mBank', icon: 'credit-card', type: 'card' },
  { id: '2', name: 'Gotówka', icon: 'wallet', type: 'cash' },
  { id: '3', name: 'Przelew', icon: 'bank', type: 'transfer' },
]

let nextId = 4

export function usePaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>(defaultMethods)

  const addMethod = useCallback((name: string, type: PaymentMethod['type']) => {
    const newMethod: PaymentMethod = {
      id: String(nextId++),
      name,
      icon: type === 'card' ? 'credit-card' : type === 'cash' ? 'wallet' : 'bank',
      type,
    }
    setMethods(prev => [...prev, newMethod])
  }, [])

  const removeMethod = useCallback((id: string) => {
    setMethods(prev => prev.filter(m => m.id !== id))
  }, [])

  return { methods, addMethod, removeMethod }
}
