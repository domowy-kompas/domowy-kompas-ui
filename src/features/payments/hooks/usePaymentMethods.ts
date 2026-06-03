import { useState, useCallback } from 'react'
import type { PaymentMethod } from '../types'
import { PAYMENT_METHODS_KEY } from '../../../constants/storage'

function loadMethods(): PaymentMethod[] {
  try {
    const stored = localStorage.getItem(PAYMENT_METHODS_KEY)
    if (stored) {
      return JSON.parse(stored) as PaymentMethod[]
    }
  } catch {
    // corrupted data — fall through to defaults
  }
  return defaultMethods
}

function saveMethods(methods: PaymentMethod[]): void {
  localStorage.setItem(PAYMENT_METHODS_KEY, JSON.stringify(methods))
}

const defaultMethods: PaymentMethod[] = [
  { id: '1', name: 'Karta mBank', icon: 'credit-card', type: 'card' },
  { id: '2', name: 'Gotówka', icon: 'wallet', type: 'cash' },
  { id: '3', name: 'Przelew', icon: 'landmark', type: 'transfer' },
]

function nextId(methods: PaymentMethod[]): number {
  return methods.length === 0
    ? 1
    : Math.max(...methods.map(m => Number(m.id))) + 1
}

export function usePaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>(loadMethods)

  const addMethod = useCallback((name: string, type: PaymentMethod['type']) => {
    setMethods(prev => {
      const id = String(nextId(prev))
      const newMethod: PaymentMethod = {
        id,
        name,
        icon: type === 'card' ? 'credit-card' : type === 'cash' ? 'wallet' : 'landmark',
        type,
      }
      const updated = [...prev, newMethod]
      saveMethods(updated)
      return updated
    })
  }, [])

  const removeMethod = useCallback((id: string) => {
    setMethods(prev => {
      const updated = prev.filter(m => m.id !== id)
      saveMethods(updated)
      return updated
    })
  }, [])

  return { methods, addMethod, removeMethod }
}
