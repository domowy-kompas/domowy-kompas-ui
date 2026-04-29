import type { AuthUser, LoginCredentials, RegisterCredentials } from '../types/auth'
import { fetchApi } from './client'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

interface AuthResponse {
  token: string
  user: AuthUser
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const data = await fetchApi<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })

  localStorage.setItem(TOKEN_KEY, data.token)
  localStorage.setItem(USER_KEY, JSON.stringify(data.user))
  
  return data
}

export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  const data = await fetchApi<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })

  localStorage.setItem(TOKEN_KEY, data.token)
  localStorage.setItem(USER_KEY, JSON.stringify(data.user))
  
  return data
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  // Optional: ping server to logout
  // fetchApi('/auth/logout', { method: 'POST' }).catch(() => {})
}