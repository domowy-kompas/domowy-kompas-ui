import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { NotificationProvider } from '../context/NotificationContext'
import { Settings } from './Settings'

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          {ui}
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  )
}

describe('Settings', () => {
  it('renders heading', () => {
    renderWithProviders(<Settings />)
    expect(screen.getByRole('heading', { name: /^ustawienia$/i })).toBeInTheDocument()
  })

  it('renders description', () => {
    renderWithProviders(<Settings />)
    expect(screen.getByText(/zarządzaj swoim profilem/i)).toBeInTheDocument()
  })
})
