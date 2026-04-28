import type { AuthUser, LoginCredentials, RegisterCredentials } from '../types/auth'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

const mockUser: AuthUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test',
  surname: 'User',
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
  
  if (credentials.email && credentials.password && credentials.name && credentials.surname) {
    const newUser: AuthUser = {
      ...mockUser,
      name: credentials.name,
      surname: credentials.surname,
      email: credentials.email,
    }
    localStorage.setItem(TOKEN_KEY, 'mock-token')
    localStorage.setItem(USER_KEY, JSON.stringify(newUser))
    return { token: 'mock-token', user: newUser }
  }
  
  throw new Error('Registration failed')
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}