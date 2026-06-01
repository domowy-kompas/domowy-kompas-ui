import { useEffect, type ReactElement, useState } from 'react'
import { trackPageView } from '../utils/analytics'
import { Loader2 } from 'lucide-react'
import { usePaymentMethods } from '../features/payments/hooks/usePaymentMethods'
import type { PaymentMethod } from '../features/payments/types'
import './Settings.css'

function PaymentMethodIcon({ type }: { type: PaymentMethod['type'] }) {
  if (type === 'card') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    )
  }
  if (type === 'cash') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
      <line x1="13" y1="19" x2="19" y2="13" />
      <line x1="16" y1="16" x2="20" y2="20" />
      <line x1="19" y1="21" x2="21" y2="19" />
      <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
      <line x1="5" y1="14" x2="9" y2="18" />
    </svg>
  )
}

export function Settings(): ReactElement {
  useEffect(() => { trackPageView('settings') }, [])

  const [activeTab, setActiveTab] = useState('Profil')
  const { methods, addMethod, removeMethod } = usePaymentMethods()
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState<PaymentMethod['type']>('card')
  const [isSaving, setIsSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const tabs = ['Profil', 'Płatności']

  const handleAdd = async () => {
    const name = newName.trim()
    if (!name) return
    setIsSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    addMethod(name, newType)
    setNewName('')
    setIsSaving(false)
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Ustawienia</h1>
        <p>Zarządzaj swoim profilem i preferencjami aplikacji.</p>
      </div>

      <div className="settings-content-wrapper">
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button 
              key={tab}
              className={`settings-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Profil' && (
          <>
            <div className="settings-card">
              <div className="profile-section">
                <h2 className="section-title">Informacje o profilu</h2>
                <div className="profile-avatar-row">
                  <div className="avatar-wrapper">
                    <div className="avatar-icon-placeholder"></div>
                    <div className="avatar-icon-placeholder-body"></div>
                    <button className="avatar-edit-btn" aria-label="Zmień zdjęcie">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="profile-avatar-info">
                    <h3>Zdjęcie profilowe</h3>
                    <p>JPG, GIF lub PNG. Maksymalny rozmiar 2MB.</p>
                    <button className="btn-link">Zmień zdjęcie</button>
                  </div>
                </div>
                
                <div className="settings-form-grid">
                  <div className="form-group">
                    <label>Imię i nazwisko</label>
                    <input type="text" className="form-control" defaultValue="Jan Kowalski" />
                  </div>
                  <div className="form-group">
                    <label>Adres e-mail</label>
                    <input type="email" className="form-control" defaultValue="jan.kowalski@example.com" />
                  </div>
                </div>
              </div>

              <div className="regional-section">
                <h2 className="section-title">Ustawienia regionalne</h2>
                <div className="settings-form-grid">
                  <div className="form-group">
                    <label>Waluta główna</label>
                    <select className="form-control" defaultValue="PLN">
                      <option value="PLN">PLN - Polski Złoty</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="USD">USD - Dolar amerykański</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Język aplikacji</label>
                    <select className="form-control" defaultValue="PL">
                      <option value="PL">Polski</option>
                      <option value="EN">English</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button className="btn-secondary">Anuluj</button>
                <button className="btn-primary">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                  Zapisz zmiany
                </button>
              </div>
            </div>

            <div className="danger-zone">
              <div className="danger-zone-info">
                <div className="danger-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <div className="danger-text-container">
                  <p className="danger-title">Strefa Niebezpieczna</p>
                  <p className="danger-description">Usuń swoje konto i wszystkie powiązane dane finansowe na zawsze.</p>
                </div>
              </div>
              <button className="btn-danger">Usuń konto</button>
            </div>
          </>
        )}

        {activeTab === 'Płatności' && (
          <div className="settings-card">
            <h2 className="section-title">Metody płatności</h2>

            <div className="payment-method-list">
              {methods.map(method => (
                <div key={method.id} className="payment-method-row">
                  <div className="payment-method-icon">
                    <PaymentMethodIcon type={method.type} />
                  </div>
                  <span className="payment-method-name">{method.name}</span>
                  <button
                    className="payment-method-remove"
                    onClick={() => setDeleteTarget(method.id)}
                    aria-label={`Usuń ${method.name}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="payment-method-add">
              <h3 className="section-subtitle">Dodaj metodę płatności</h3>
              <div className="payment-method-form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nazwa metody"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleAdd() }}
                />
                <select
                  className="form-control"
                  value={newType}
                  onChange={e => setNewType(e.target.value as PaymentMethod['type'])}
                >
                  <option value="card">Karta</option>
                  <option value="cash">Gotówka</option>
                  <option value="transfer">Przelew</option>
                </select>
                <button className="btn-primary" onClick={handleAdd} disabled={isSaving}>
                  {isSaving ? (
                    <Loader2 size={16} className="spinner" />
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  )}
                  Dodaj
                </button>
              </div>
            </div>
          </div>
        )}

        {deleteTarget && (
          <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <h3 className="modal-title">Usunąć metodę płatności?</h3>
              <p className="modal-text">
                Czy na pewno chcesz usunąć <strong>{methods.find(m => m.id === deleteTarget)?.name}</strong>?
                Tej operacji nie można cofnąć.
              </p>
              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setDeleteTarget(null)}>Anuluj</button>
                <button className="btn-danger modal-confirm" onClick={() => { removeMethod(deleteTarget); setDeleteTarget(null) }}>
                  Usuń
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
