import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Settings } from './Settings'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Settings', () => {
  it('renders heading', () => {
    renderWithRouter(<Settings />)
    expect(screen.getByRole('heading', { name: /ustawienia/i })).toBeInTheDocument()
  })

  it('renders description', () => {
    renderWithRouter(<Settings />)
    expect(screen.getByText(/zarządzaj ustawieniami aplikacji/i)).toBeInTheDocument()
  })
})
