import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Dashboard } from './Dashboard'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Dashboard', () => {
  it('renders heading', () => {
    renderWithRouter(<Dashboard />)
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
  })

  it('renders welcome message', () => {
    renderWithRouter(<Dashboard />)
    expect(screen.getByText(/welcome to your home dashboard/i)).toBeInTheDocument()
  })
})
