import type { ReactElement } from 'react'
import { LoginCard } from '../components/LoginCard'
import './Login.css'

export function Login(): ReactElement {
  return (
    <div className="login-page">
      <LoginCard />
    </div>
  )
}