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

const mockFetch = async (_input: RequestInfo | URL, init?: RequestInit) => {
  if (init?.method === 'POST') {
    return new Response(JSON.stringify({ token: 'mock-token', user: mockUser }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response('', { status: 200 })
}

globalThis.fetch = mockFetch