import type { AuthUser, LoginCredentials, RegisterCredentials } from '../types/auth'
import { fetchApi } from './client'
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '../constants/storage'

interface AuthResponse {
  token: string
  user: AuthUser
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const data = await fetchApi<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })

  localStorage.setItem(AUTH_TOKEN_KEY, data.token)
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user))
  
  return data
}

export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  const data = await fetchApi<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })

  localStorage.setItem(AUTH_TOKEN_KEY, data.token)
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user))
  
  return data
}

export function logout(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(AUTH_USER_KEY)
  // Optional: ping server to logout
  // fetchApi('/auth/logout', { method: 'POST' }).catch(() => {})
}