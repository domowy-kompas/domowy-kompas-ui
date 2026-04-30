import { type ReactElement, useState } from 'react'
import './Settings.css'

export function Settings(): ReactElement {
  const [activeTab, setActiveTab] = useState('Profil')

  const tabs = ['Profil', 'Powiadomienia', 'Bezpieczeństwo', 'Preferencje']

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

        {activeTab !== 'Profil' && (
          <div className="settings-card">
            <h2 className="section-title">{activeTab}</h2>
            <p style={{ color: '#3e4947', marginTop: '16px' }}>Ta sekcja jest w trakcie przygotowania.</p>
          </div>
        )}
      </div>
    </div>
  )
}
