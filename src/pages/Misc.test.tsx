import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Goals, Reports, Help } from './Misc'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Goals', () => {
  it('renders heading', () => {
    renderWithRouter(<Goals />)
    expect(screen.getByRole('heading', { name: /cele oszczędnościowe/i })).toBeInTheDocument()
  })

  it('renders description', () => {
    renderWithRouter(<Goals />)
    expect(screen.getByText(/śledź swoje cele oszczędnościowe/i)).toBeInTheDocument()
  })
})

describe('Reports', () => {
  it('renders heading', () => {
    renderWithRouter(<Reports />)
    expect(screen.getByRole('heading', { name: /raporty/i })).toBeInTheDocument()
  })

  it('renders description', () => {
    renderWithRouter(<Reports />)
    expect(screen.getByText(/przeglądaj raporty/i)).toBeInTheDocument()
  })
})

describe('Help', () => {
  it('renders heading', () => {
    renderWithRouter(<Help />)
    expect(screen.getByRole('heading', { name: /pomoc/i })).toBeInTheDocument()
  })

  it('renders description', () => {
    renderWithRouter(<Help />)
    expect(screen.getByText(/pomoc i wsparcie/i)).toBeInTheDocument()
  })
})
