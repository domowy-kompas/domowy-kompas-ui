import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Budgets } from './Budgets'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Budgets', () => {
  it('renders heading', () => {
    renderWithRouter(<Budgets />)
    expect(screen.getByRole('heading', { name: /budżety/i })).toBeInTheDocument()
  })

  it('renders description', () => {
    renderWithRouter(<Budgets />)
    expect(screen.getByText(/zarządzaj swoimi budżetami/i)).toBeInTheDocument()
  })
})
