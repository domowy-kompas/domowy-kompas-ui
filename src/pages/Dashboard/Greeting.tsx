import type { ReactElement } from 'react'
import { useAuth } from '../../context/AuthContext'
import './Greeting.css'

export function Greeting(): ReactElement {
  const { user } = useAuth()
  const firstName = user?.name || 'Użytkowniku'

  return (
    <div className="greeting">
      <h1 className="greeting-title">Dzień dobry, {firstName}!</h1>
      <p className="greeting-subtext">Twoje finanse są pod kontrolą.</p>
    </div>
  )
}
