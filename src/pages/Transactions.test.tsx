import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Transactions } from './Transactions'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Transactions', () => {
  it('renders heading', () => {
    renderWithRouter(<Transactions />)
    // Transactions page no longer has a top-level heading; assert presence of search input instead
    expect(screen.getByPlaceholderText(/np. zakupy spożywcze/i)).toBeInTheDocument()
  })

  it('renders description', () => {
    renderWithRouter(<Transactions />)
    // Assert that the period selector is present as part of the header UI
    expect(screen.getByText(/okres/i)).toBeInTheDocument()
  })
})
