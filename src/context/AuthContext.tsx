/* eslint-disable react-refresh/only-export-components */
import type { ReactNode, ReactElement } from 'react'
import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import type { AuthUser, LoginCredentials, RegisterCredentials } from '../types/auth'
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../api/auth'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)
export { AuthContext }

function getStoredUser(): AuthUser | null {
  const stored = localStorage.getItem(USER_KEY)
  return stored ? JSON.parse(stored) : null
}

function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

function getInitialUser(): AuthUser | null {
  const token = getStoredToken()
  const storedUser = getStoredUser()
  return token && storedUser ? storedUser : null
}

export function AuthProvider({ children }: { children: ReactNode }): ReactElement {
  const [user, setUser] = useState<AuthUser | null>(getInitialUser)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true)
    try {
      const data = await apiLogin(credentials)
      setUser(data.user)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (credentials: RegisterCredentials): Promise<void> => {
    setIsLoading(true)
    try {
      const data = await apiRegister(credentials)
      setUser(data.user)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    apiLogout()
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}