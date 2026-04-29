import type { ReactElement } from 'react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import compassIcon from '../assets/login/compass.png'
import './LoginCard.css'

export function LoginCard(): ReactElement {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const from = location.state?.from?.pathname || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch {
      setError('Nieprawidłowy email lub hasło')
    }
  }

  return (
    <div className="login-card">
      {/* Left Panel: Branding & Social Proof */}
      <div className="left-panel">
        <div className="branding">
          <div className="logo">
            <img src={compassIcon} alt="Domowy Kompas Logo" className="logo-img" />
            <span className="logo-text">Domowy Kompas</span>
          </div>
          <h2 className="branding-title">Przejmij kontrolę nad swoimi finansami.</h2>
          <p className="branding-subtitle">Twoja osobista nawigacja do finansowej wolności i spokoju ducha.</p>
        </div>

        {/* Testimonial Card */}
        <div className="testimonial-card">
          <div className="testimonial-content">
            <div className="testimonial-header">
              <div className="avatar">
                <img src="https://i.pravatar.cc/80?img=12" alt="Marek Wiśniewski" className="avatar-img" />
              </div>
              <div className="testimonial-author">
                <span className="author-name">Marek Wiśniewski</span>
                <span className="author-since">Użytkownik od 2 lat</span>
              </div>
            </div>
            <p className="quote">
              "Dzięki aplikacji Domowy Kompas w końcu wiem, gdzie uciekają moje pieniądze. Planowanie budżetu nigdy nie było tak proste."
            </p>
          </div>
          {/* Background wallet icon */}
          <div className="wallet-icon-bg">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="30" width="80" height="60" rx="12" fill="#004D40" fillOpacity="0.06" />
              <path d="M30 30H90" stroke="#004D40" strokeWidth="3" strokeOpacity="0.1" />
              <path d="M30 90H90" stroke="#004D40" strokeWidth="3" strokeOpacity="0.1" />
              <rect x="35" y="38" width="20" height="44" rx="4" fill="#004D40" fillOpacity="0.08" />
              <rect x="60" y="38" width="20" height="44" rx="4" fill="#004D40" fillOpacity="0.08" />
              <circle cx="50" cy="60" r="8" fill="#004D40" fillOpacity="0.1" />
            </svg>
          </div>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="right-panel">
        <h1 className="form-title">Witaj ponownie</h1>
        <p className="form-subtext">
          Zaloguj się, aby kontynuować zarządzanie swoim portfelem.
        </p>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="4" width="16" height="12" rx="2" stroke="#6B7280" strokeWidth="1.5" />
                <path d="M2 6L10 11L18 6" stroke="#6B7280" strokeWidth="1.5" />
              </svg>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="twoj@email.pl"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-wrapper">
              <label htmlFor="password" className="form-label">
                Hasło
              </label>
              <a href="#" className="forgot-password" onClick={(e) => {
                e.preventDefault();
                alert('Funkcja odzyskiwania hasła nie została jeszcze zaimplementowana');
              }}>
                Zapomniałeś hasła?
              </a>
            </div>
            <div className="input-wrapper password-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="8" width="14" height="10" rx="2" stroke="#6B7280" strokeWidth="1.5" />
                <circle cx="10" cy="13" r="2" stroke="#6B7280" strokeWidth="1.5" fill="none" />
                <path d="M7 8V6C7 4.3 8.3 3 10 3C11.7 3 13 4.3 13 6V8" stroke="#6B7280" strokeWidth="1.5" />
              </svg>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="twoje hasło"
                className="form-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
                aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4C5 4 2 10 2 10C2 10 5 16 10 16C15 16 18 10 18 10C18 10 15 4 10 4Z" stroke="#6B7280" strokeWidth="1.5" fill="none" />
                    <circle cx="10" cy="10" r="3" stroke="#6B7280" strokeWidth="1.5" fill="none" />
                    <line x1="6" y1="6" x2="14" y2="14" stroke="#6B7280" strokeWidth="1.5" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4C5 4 2 10 2 10C2 10 5 16 10 16C15 16 18 10 18 10C18 10 15 4 10 4Z" stroke="#6B7280" strokeWidth="1.5" fill="none" />
                    <circle cx="10" cy="10" r="3" stroke="#6B7280" strokeWidth="1.5" fill="none" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkbox-label">Zapamiętaj mnie</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" strokeDasharray="40,40" strokeDashoffset="20" />
                </svg>
                Logowanie...
              </>
            ) : (
              <>
                Zaloguj się
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="14" height="14" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
                  <path d="M8 10H14" stroke="white" strokeWidth="1.5" />
                  <path d="M11 7L14 10L11 13" stroke="white" strokeWidth="1.5" />
                </svg>
              </>
            )}
          </button>
        </form>

        <p className="auth-link">
          Nie masz konta? <a href="/register">Zarejestruj się</a>
        </p>
      </div>
    </div>
  )
}