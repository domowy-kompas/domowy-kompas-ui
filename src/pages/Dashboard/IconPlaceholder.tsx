import type { ReactElement } from 'react'
import './IconPlaceholder.css'

interface IconPlaceholderProps {
  label: string
  size?: number
  circular?: boolean
}

export function IconPlaceholder({ label, size = 24, circular = false }: IconPlaceholderProps): ReactElement {
  return (
    <div
      className={`icon-placeholder ${circular ? 'icon-placeholder--circular' : ''}`}
      style={{ width: size, height: size }}
    >
      {label.charAt(0)}
    </div>
  )
}
