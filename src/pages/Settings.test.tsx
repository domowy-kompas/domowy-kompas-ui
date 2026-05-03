import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Settings } from './Settings'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Settings', () => {
  it('renders heading', () => {
    renderWithRouter(<Settings />)
    // Match exact top-level heading text to avoid matching subsection headings
    expect(screen.getByRole('heading', { name: /^ustawienia$/i })).toBeInTheDocument()
  })

  it('renders description', () => {
    renderWithRouter(<Settings />)
    // The settings page copy is in Polish — assert on a stable substring
    expect(screen.getByText(/zarządzaj swoim profilem/i)).toBeInTheDocument()
  })
})
