import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Transactions } from './Transactions'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Transactions', () => {
  it('renders heading', () => {
    renderWithRouter(<Transactions />)
    expect(screen.getByRole('heading', { name: /transactions/i })).toBeInTheDocument()
  })

  it('renders description', () => {
    renderWithRouter(<Transactions />)
    expect(screen.getByText(/view and manage your transactions/i)).toBeInTheDocument()
  })
})
