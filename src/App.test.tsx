import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders sidebar with navigation links', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: /panel główny/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /transakcje/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /budżety/i })).toBeInTheDocument()
  })

  it('renders footer with copyright', () => {
    render(<App />)

    expect(screen.getByRole('contentinfo')).toHaveTextContent(/domowy kompas/i)
  })

  it('renders dashboard by default', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
  })

  it('navigates to transactions when link clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: /transakcje/i }))

    expect(screen.getByRole('heading', { name: /transactions/i })).toBeInTheDocument()
  })
})