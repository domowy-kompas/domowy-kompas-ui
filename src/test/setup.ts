import '@testing-library/jest-dom/vitest'

interface LocalStorageMock {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
  clear: () => void
}

const mockUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
}

const localStorageMock: LocalStorageMock = {
  getItem: (key: string) => {
    if (key === 'auth_user') return JSON.stringify(mockUser)
    if (key === 'auth_token') return 'mock-token'
    return null
  },
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
}
globalThis.localStorage = localStorageMock as unknown as Storage

const mockFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : (input as Request).url

  // Handle POST auth flows
  if (init?.method === 'POST') {
    return new Response(JSON.stringify({ token: 'mock-token', user: mockUser }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Basic routing for common endpoints used in components
  if (url.includes('/transactions-summary')) {
    return new Response(JSON.stringify({ totalIncome: 0, totalExpenses: 0, netBalance: 0 }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }

  if (url.includes('/transactions')) {
    return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }

  if (url.includes('/budgets')) {
    return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }

  if (url.includes('/goals')) {
    return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }

  if (url.includes('/summary')) {
    return new Response(JSON.stringify({ totalBalance: 0, monthlyIncome: 0, monthlyExpenses: 0 }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }

  if (url.includes('/budget-status')) {
    return new Response(JSON.stringify({ percentageUsed: 0, spentAmount: 0, totalLimit: 0 }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }

  // Default: return empty JSON object
  return new Response(JSON.stringify({}), { status: 200, headers: { 'Content-Type': 'application/json' } })
}

globalThis.fetch = mockFetch