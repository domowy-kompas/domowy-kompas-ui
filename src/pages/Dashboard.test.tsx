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
  it('renders greeting with user name', async () => {
    renderWithProviders(<Dashboard />)
    expect(await screen.findByRole('heading', { name: /dzień dobry/i })).toBeInTheDocument()
  })

  it('renders subtext', async () => {
    renderWithProviders(<Dashboard />)
    expect(await screen.findByText(/twoje finanse są pod kontrolą/i)).toBeInTheDocument()
  })
})
