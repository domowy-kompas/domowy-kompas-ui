import type { ReactElement } from 'react'
import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Login(): ReactElement {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from = location.state?.from?.pathname || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Logowanie</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="auth-error">{error}</p>}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Hasło</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Zaloguj się'}
          </button>
        </form>
        <p className="auth-link">
          Nie masz konta? <Link to="/register">Zarejestruj się</Link>
        </p>
      </div>
    </div>
  )
}