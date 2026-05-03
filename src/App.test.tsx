import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders sidebar with navigation links', () => {
    render(<App />)

    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /panel główny/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /transakcje/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /budżety/i }).length).toBeGreaterThan(0)
  })

  it('renders footer with copyright', () => {
    render(<App />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveTextContent(/domowy kompas/i)
    expect(footer).toHaveTextContent(/Wspieramy Twoją finansową przyszłość/i)
  })

  it('renders dashboard by default', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /dzień dobry/i })).toBeInTheDocument()
  })

  it('navigates to transactions when sidebar link clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const sidebar = screen.getByRole('navigation', { name: /main navigation/i })
    const transactionLink = sidebar.querySelector('a[href="/transactions"]')
    await user.click(transactionLink!)

    // Transactions page loads content asynchronously; wait for a stable element
    await screen.findByPlaceholderText(/np. zakupy spożywcze/i)
  })
})