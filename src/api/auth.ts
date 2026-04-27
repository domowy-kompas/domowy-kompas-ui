import type { AuthUser, LoginCredentials, RegisterCredentials } from '../types/auth'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

const mockUser: AuthUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function login(credentials: LoginCredentials): Promise<{ token: string; user: AuthUser }> {
  await delay(300)
  
  if (credentials.email && credentials.password) {
    localStorage.setItem(TOKEN_KEY, 'mock-token')
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser))
    return { token: 'mock-token', user: mockUser }
  }
  
  throw new Error('Login failed')
}

export async function register(credentials: RegisterCredentials): Promise<{ token: string; user: AuthUser }> {
  await delay(300)
  
  if (credentials.email && credentials.password && credentials.name) {
    localStorage.setItem(TOKEN_KEY, 'mock-token')
    localStorage.setItem(USER_KEY, JSON.stringify({ ...mockUser, name: credentials.name, email: credentials.email }))
    return { token: 'mock-token', user: { ...mockUser, name: credentials.name, email: credentials.email } }
  }
  
  throw new Error('Registration failed')
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}