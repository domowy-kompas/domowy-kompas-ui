import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { Dashboard } from './Dashboard'

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <AuthProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthProvider>
  )
}

describe('Dashboard', () => {
  it('renders greeting with user name', () => {
    renderWithProviders(<Dashboard />)
    expect(screen.getByRole('heading', { name: /dzień dobry/i })).toBeInTheDocument()
  })

  it('renders subtext', () => {
    renderWithProviders(<Dashboard />)
    expect(screen.getByText(/twoje finanse są pod kontrolą/i)).toBeInTheDocument()
  })
})
