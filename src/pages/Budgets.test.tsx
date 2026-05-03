import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Budgets } from './Budgets'

import { AuthProvider } from '../context/AuthContext'

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Budgets', () => {
  it('renders heading', () => {
    renderWithProviders(<Budgets />)
    expect(screen.getByRole('heading', { name: /budżety/i })).toBeInTheDocument()
  })

  it('renders description', () => {
    renderWithProviders(<Budgets />)
    expect(screen.getByText(/przeglądaj i zarządzaj swoimi/i)).toBeInTheDocument()
  })
})
