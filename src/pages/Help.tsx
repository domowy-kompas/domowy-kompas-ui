import { type ReactElement, useState, useEffect } from 'react'
import { Search, Rocket, Landmark, Shield, ChevronDown, ChevronUp, ArrowRight, Send } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import mailIcon from '../assets/help/mail.png'
import chatIcon from '../assets/help/chat.png'
import './Help.css'

interface HelpTopicCardProps {
  title: string
  description: string
  icon: ReactElement
  variant: 'green' | 'blue' | 'peach'
}

function HelpTopicCard({ title, description, icon, variant }: HelpTopicCardProps): ReactElement {
  return (
    <div className="help-card">
      <div className={`help-card-icon-wrapper ${variant}`}>
        {icon}
      </div>
      <div>
        <h3 className="help-card-title">{title}</h3>
        <p className="help-card-description">{description}</p>
      </div>
    </div>
  )
}

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Jak dodać moje pierwsze konto bankowe?',
    answer: 'Aby dodać pierwsze konto, przejdź do zakładki Panel główny i kliknij "Nowa transakcja" lub użyj opcji w Ustawieniach.'
  },
  {
    question: 'Czy moje dane są widoczne dla pracowników?',
    answer: 'Absolutnie nie. Wszystkie Twoje dane finansowe są szyfrowane end-to-end. Nasi pracownicy nie mają dostępu do Twoich transakcji ani sald. Korzystamy z tych samych standardów bezpieczeństwa co nowoczesna bankowość elektroniczna.'
  },
  {
    question: 'Jak mogę wyeksportować raport do pliku PDF?',
    answer: 'W zakładce Raporty znajdziesz przycisk "Eksportuj". Wybierz format PDF i odpowiedni zakres dat.'
  },
  {
    question: 'Czy mogę współdzielić budżet z partnerem?',
    answer: 'Tak, funkcja współdzielenia budżetów jest dostępna w Ustawieniach Konta w sekcji "Rodzina i partnerzy".'
  }
]

function FAQSection(): ReactElement {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(1)
  const [isLoading, setIsLoading] = useState(true)

  // Symulacja ładowania danych
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h2 className="faq-title">Najczęściej zadawane pytania</h2>
        <button className="faq-see-all-btn" disabled={isLoading}>
          Zobacz wszystkie <ArrowRight size={16} />
        </button>
      </div>
      <div className="faq-list">
        {isLoading ? (
          <div style={{ padding: '24px 32px' }}>
            <Skeleton count={4} height={60} style={{ marginBottom: '12px' }} baseColor="var(--tx-bg-color)" highlightColor="#ffffff" />
          </div>
        ) : (
          faqs.map((faq, index) => {
            const isExpanded = expandedIndex === index
            return (
              <div 
                key={index} 
                className={`faq-item ${isExpanded ? 'expanded' : ''}`}
              >
                <button 
                  className="faq-question-btn"
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                >
                  <span>{faq.question}</span>
                  {isExpanded ? <ChevronUp size={20} className="faq-icon" /> : <ChevronDown size={20} className="faq-icon-inactive" />}
                </button>
                <div className="faq-answer-wrapper">
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

function ContactSection(): ReactElement {
  return (
    <div className="contact-section">
      <div className="contact-info">
        <h2 className="contact-title">Nadal potrzebujesz pomocy?</h2>
        <p className="contact-description">
          Nasz zespół wsparcia jest dostępny od poniedziałku do piątku w godzinach 9:00 - 17:00. Odpowiadamy zazwyczaj w ciągu 24 godzin.
        </p>
        
        <div className="contact-methods">
          <div className="contact-method">
            <img src={mailIcon} alt="Email" className="contact-custom-icon" />
            <div className="contact-method-text">
              <span className="contact-method-label">Email</span>
              <span className="contact-method-value">kontakt@domowykompas.pl</span>
            </div>
          </div>
          
          <div className="contact-method">
            <img src={chatIcon} alt="Czat na żywo" className="contact-custom-icon" />
            <div className="contact-method-text">
              <span className="contact-method-label">Czat na żywo</span>
              <span className="contact-method-value">Dostępny w aplikacji mobilnej</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="contact-form-card">
        <h3 className="contact-form-title">Napisz do nas</h3>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Twoje Imię</label>
            <input type="text" id="name" placeholder="Jan Kowalski" className="help-input" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Wiadomość</label>
            <textarea id="message" placeholder="W czym możemy Ci pomóc?" className="help-textarea" rows={4}></textarea>
          </div>
          <button type="submit" className="contact-submit-btn">
            Wyślij wiadomość <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}

export function Help(): ReactElement {
  const [searchQuery, setSearchQuery] = useState('')

  const helpTopics: HelpTopicCardProps[] = [
    {
      title: 'Pierwsze kroki',
      description: 'Naucz się podstaw zarządzania finansami w kilka minut.',
      icon: <Rocket size={24} />,
      variant: 'green'
    },
    {
      title: 'Budżety',
      description: 'Optymalizacja wydatków i planowanie oszczędności.',
      icon: <Landmark size={24} />,
      variant: 'blue'
    },
    {
      title: 'Bezpieczeństwo',
      description: 'Twoje dane są u nas bezpieczne. Dowiedz się jak je chronimy.',
      icon: <Shield size={24} />,
      variant: 'peach'
    }
  ]

  const filteredTopics = helpTopics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="help-container">
      <div className="help-header">
        <h1 className="help-title">Centrum Pomocy</h1>
      </div>

      <div className="help-search-container">
        <Search className="help-search-icon" size={20} />
        <input 
          type="text" 
          className="help-search-input" 
          placeholder="Szukaj pomocy..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="help-grid">
        {filteredTopics.map((topic, index) => (
          <HelpTopicCard 
            key={index}
            title={topic.title}
            description={topic.description}
            icon={topic.icon}
            variant={topic.variant}
          />
        ))}
      </div>

      <FAQSection />

      <ContactSection />
    </div>
  )
}
