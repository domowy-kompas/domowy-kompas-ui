/* eslint-disable react-refresh/only-export-components */
import type { ReactNode, ReactElement } from 'react'
import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'
import type { AuthUser, LoginCredentials, RegisterCredentials } from '../types/auth'
import { login as apiLogin, register as apiRegister, logout as apiLogout, observeAuthState, mapFirebaseUser } from '../api/auth'
import { auth } from '../config/firebase'
import { trackEvent } from '../utils/analytics'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  isSubmitting: boolean
  login: (credentials: LoginCredentials, rememberMe?: boolean) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)
export { AuthContext }

export function AuthProvider({ children }: { children: ReactNode }): ReactElement {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const currentUser = auth.currentUser
    return currentUser ? mapFirebaseUser(currentUser) : null
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const unsubscribe = observeAuthState((nextUser) => {
      setUser(nextUser)
      setIsLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const login = useCallback(async (credentials: LoginCredentials, rememberMe = true): Promise<void> => {
    setIsSubmitting(true)
    try {
      const data = await apiLogin(credentials, rememberMe)
      setUser(data.user)
      setIsLoading(false)
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const register = useCallback(async (credentials: RegisterCredentials): Promise<void> => {
    setIsSubmitting(true)
    try {
      const data = await apiRegister(credentials)
      setUser(data.user)
      trackEvent('user_registration_completed')
      setIsLoading(false)
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const logout = useCallback(() => {
    void apiLogout()
    setUser(null)
    trackEvent('user_logout')
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      isSubmitting,
      login,
      register,
      logout,
    }),
    [user, isLoading, isSubmitting, login, register, logout],
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