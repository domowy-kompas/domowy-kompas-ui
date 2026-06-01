import { useEffect, type ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { trackPageView } from '../utils/analytics'
import './LandingPage.css'

// Assets
import laptopImg from '../assets/landing-page/laptop.png'
import checkIcon from '../assets/landing-page/check.png'
import trendIcon from '../assets/landing-page/increasing-trend.png'
import lockIcon from '../assets/landing-page/lock.png'
import shieldIcon from '../assets/landing-page/shield.png'
import shieldEmptyIcon from '../assets/landing-page/shield-empty.png'
import planningBudgetIcon from '../assets/landing-page/planning-budget.png'
import trackExpensesIcon from '../assets/landing-page/track-expenses.png'
import savingGoalsIcon from '../assets/landing-page/saving-goals.png'
import avatar1 from '../assets/landing-page/avatar1.png'
import avatar2 from '../assets/landing-page/avatar2.png'
import avatar3 from '../assets/landing-page/avatar3.png'
import vectorImg from '../assets/landing-page/Vector.png'

export function LandingPage(): ReactElement {
  useEffect(() => { trackPageView('landing') }, [])

  return (
    <div className="landing-page">
      <header className="landing-header">
        <Link to="/" className="landing-brand">Domowy Kompas</Link>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <img src={checkIcon} alt="Check" className="hero-badge-icon" />
              <span>Zaufany partner finansowy</span>
            </div>

            <h1 className="hero-headline">
              Przejmij kontrolę nad swoimi finansami z <span>Domowym Kompasem</span>.
            </h1>

            <p className="hero-subheadline">
              Intuicyjne narzędzie do planowania budżetu, oszczędzania i analizy wydatków.
              Bez zbędnego skomplikowania, prosto i skutecznie.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="btn-primary">
                Zacznij za darmo
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              <Link to="#" className="btn-secondary">
                Zobacz demo
              </Link>
            </div>

            <div className="trust-section">
              <span className="trust-label">Bezpieczeństwo</span>
              <div className="trust-icons">
                <img src={shieldIcon} alt="Shield" className="trust-icon" />
                <img src={lockIcon} alt="Lock" className="trust-icon" />
                <img src={shieldEmptyIcon} alt="Safety" className="trust-icon" />
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <img src={laptopImg} alt="Platform Dashboard" className="laptop-image" />

            <div className="stats-card">
              <img src={trendIcon} alt="Trend" className="stats-trend-icon" />
              <div className="stats-info">
                <span className="stats-label">Średnie oszczędności</span>
                <span className="stats-value">+24% / mc</span>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="features-header">
            <h2>Zaprojektowane dla Twojego spokoju</h2>
            <p>
              Nasze funkcje zostały stworzone, aby zdjąć z Ciebie ciężar zarządzania
              domowym budżetem.
            </p>
          </div>

          <div className="features-grid">
            {/* Card 1 */}
            <div className="feature-card">
              <img src={planningBudgetIcon} alt="Budget" className="feature-icon" />
              <h3>Planowanie Budżetu</h3>
              <p>
                Twórz elastyczne kategorie budżetowe i kontroluj limity wydatków w czasie
                rzeczywistym. Widzisz dokładnie, gdzie idą Twoje pieniądze.
              </p>
              <div className="feature-visual">
                <div className="feature-progress-container">
                  <div className="feature-progress-bar">
                    <div className="feature-progress-fill" style={{ width: '66%' }}></div>
                  </div>
                  <div className="feature-progress-labels">
                    <span>Budżet: Żywność</span>
                    <span className="feature-progress-value">66%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="feature-card">
              <img src={trackExpensesIcon} alt="Expenses" className="feature-icon" />
              <h3>Śledzenie Wydatków</h3>
              <p>
                Błyskawicznie dodawaj transakcje i kategoryzuj je automatycznie.
                Synchronizacja z kontami bankowymi oszczędza Twój cenny czas.
              </p>
              <div className="feature-visual">
                <div className="feature-checklist">
                  <div className="feature-check-item">
                    <span className="check-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Automatyczny import
                  </div>
                  <div className="feature-check-item">
                    <span className="check-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Skanowanie paragonów
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="feature-card">
              <img src={savingGoalsIcon} alt="Goals" className="feature-icon" />
              <h3>Cele Oszczędnościowe</h3>
              <p>
                Wyznaczaj cele na wakacje, nowy dom lub poduszkę finansową. Obliczamy
                tempo oszczędzania, byś szybciej osiągnął marzenia.
              </p>
              <div className="feature-visual">
                <div className="feature-avatars">
                  <img src={avatar1} alt="User" className="feature-avatar" />
                  <img src={avatar2} alt="User" className="feature-avatar" />
                  <img src={avatar3} alt="User" className="feature-avatar" />
                  <div className="feature-avatar-more">+12</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="cta-section">
          <div className="cta-card">
            <img src={vectorImg} aria-hidden="true" className="hero-blob" alt="" />
            <h2>Dołącz do tysięcy użytkowników, którzy oszczędzają więcej każdego miesiąca.</h2>
            <p className="landing-page-testimonial-text">
              "Domowy Kompas zmienił sposób, w jaki patrzę na pieniądze. W końcu
              przestałem się martwić o koniec miesiąca."
            </p>
            <div className="landing-page-testimonial-author">
              <img src={avatar2} alt="Marek Wiśniewski" className="author-avatar" />
              <span className="author-info">Marek Wiśniewski, użytkownik od 2 lat</span>
            </div>
            <Link to="/register" className="btn-cta-white">
              Załóż darmowe konto teraz
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
