import type { ReactElement } from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Register(): ReactElement {
  const navigate = useNavigate()
  const { register, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await register({ email, password, name })
      navigate('/dashboard', { replace: true })
    } catch {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Rejestracja</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="auth-error">{error}</p>}
          <div className="form-group">
            <label htmlFor="name">Imię</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            {isLoading ? 'Creating account...' : 'Zarejestruj się'}
          </button>
        </form>
        <p className="auth-link">
          Masz już konto? <Link to="/login">Zaloguj się</Link>
        </p>
      </div>
    </div>
  )
}