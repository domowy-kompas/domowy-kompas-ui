import { type ReactElement, useState, useEffect, type FormEvent } from 'react'
import { ChevronDown, ChevronUp, Send, Loader2 } from 'lucide-react'
import { trackEvent, trackPageView } from '../utils/analytics'
import { useNotification } from '../context/NotificationContext'
import mailIcon from '../assets/help/mail.png'
import chatIcon from '../assets/help/chat.png'
import './Help.css'

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Jak dodać nową transakcję?',
    answer: 'Użyj przycisku "Nowa transakcja" w menu bocznym. Wybierz typ (wydatek lub dochód), wpisz kwotę, wybierz kategorię, metodę płatności i datę. Transakcja pojawi się na liście i wpłynie na Twoje budżety.'
  },
  {
    question: 'Jak kontrolować wydatki?',
    answer: 'Przejdź do zakładki Budżety. Zobaczysz podsumowanie (limit, wydano, pozostało) oraz kategorie z kolorowymi paskami postępu — zielony poniżej 90%, pomarańczowy przy 90–99%, czerwony po przekroczeniu limitu.'
  },
  {
    question: 'Jak ustawić cel oszczędnościowy i śledzić postępy?',
    answer: 'Wejdź w Cele oszczędnościowe, kliknij "Dodaj nowy cel". Podaj nazwę, kwotę docelową, termin i miesięczną składkę. Postęp zobaczysz zarówno na stronie celu, jak i na Panelu głównym.'
  },
  {
    question: 'Jak przeglądać raporty finansowe?',
    answer: 'W zakładce Raporty wybierz okres (miesiąc, kwartał lub rok). Zobaczysz wykres słupkowy przychodów i wydatków, wykres kołowy wydatków według kategorii oraz szczegółową analizę każdej kategorii.'
  },
  {
    question: 'Jak zmienić ustawienia profilu lub dodać metodę płatności?',
    answer: 'W Ustawieniach możesz edytować swoje dane, zmienić walutę i język. W zakładce Płatności dodasz metody płatności używane przy transakcjach.'
  }
]

function FAQSection(): ReactElement {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(1)

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h2 className="faq-title">Najczęściej zadawane pytania</h2>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => {
          const isExpanded = expandedIndex === index
          return (
            <div 
              key={index} 
              className={`faq-item ${isExpanded ? 'expanded' : ''}`}
            >
              <button 
                className="faq-question-btn"
                onClick={() => {
                  const next = isExpanded ? null : index
                  setExpandedIndex(next)
                  if (next !== null) {
                    trackEvent('faq_expanded', { faq_index: index })
                  }
                }}
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
        })}
      </div>
    </div>
  )
}

function ContactSection(): ReactElement {
  const { showNotification } = useNotification()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isValid = name.trim().length > 0 && message.trim().length > 0

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    showNotification('Wiadomość wysłana pomyślnie', 'success')
    setName('')
    setMessage('')
    setIsSubmitting(false)
  }

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
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Twoje Imię</label>
            <input
              type="text"
              id="name"
              placeholder="Jan Kowalski"
              className="help-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Wiadomość</label>
            <textarea
              id="message"
              placeholder="W czym możemy Ci pomóc?"
              className="help-textarea"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className="contact-submit-btn"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              <Loader2 size={18} className="spin" />
            ) : (
              <Send size={18} />
            )}
            {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
          </button>
        </form>
      </div>
    </div>
  )
}

export function Help(): ReactElement {
  useEffect(() => { trackPageView('help') }, [])

  return (
    <div className="help-container">
      <div className="help-header">
        <h1 className="help-title">Centrum Pomocy</h1>
      </div>

      <FAQSection />

      <ContactSection />
    </div>
  )
}
