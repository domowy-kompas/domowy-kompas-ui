import type { ReactElement } from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import compassIcon from '../assets/login/compass.png'
import '../components/LoginCard.css'

export function Register(): ReactElement {
  const navigate = useNavigate()
  const { register, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await register({ email, password, name, surname })
      navigate('/dashboard', { replace: true })
    } catch {
      setError('Rejestracja nie powiodła się. Spróbuj ponownie.')
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
          <h2 className="branding-title">Zacznij swoją drogę do wolności finansowej.</h2>
          <p className="branding-subtitle">Dołącz do tysięcy osób, które już teraz mądrzej zarządzają swoim domowym budżetem.</p>
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
              "Domowy Kompas to najlepsza inwestycja w mój spokój ducha. W końcu mam pełną kontrolę nad wydatkami."
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel: Registration Form */}
      <div className="right-panel">
        <h1 className="form-title">Stwórz konto</h1>
        <p className="form-subtext">
          Wypełnij poniższe dane, aby dołączyć do naszej społeczności.
        </p>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Imię</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Jan"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="surname" className="form-label">Nazwisko</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                id="surname"
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
                placeholder="Kowalski"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
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
            <label htmlFor="password" className="form-label">Hasło</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="minimum 8 znaków"
                className="form-input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? 'Tworzenie konta...' : 'Zarejestruj się'}
          </button>
        </form>

        <p className="auth-link">
          Masz już konto? <Link to="/login">Zaloguj się</Link>
        </p>
      </div>
    </div>
  )
}