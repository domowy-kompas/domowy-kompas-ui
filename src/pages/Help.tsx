import { type ReactElement, useState } from 'react'
import { Search, Rocket, Landmark, Shield } from 'lucide-react'
import './Help.css'

interface HelpTopicCardProps {
  title: string
  description: string
  icon: ReactElement
  variant: 'green' | 'blue' | 'peach'
}

function HelpTopicCard({ title, description, icon, variant }: HelpTopicCardProps): ReactElement {
  return (
    <div className="help-card">
      <div className={`help-card-icon-wrapper ${variant}`}>
        {icon}
      </div>
      <div>
        <h3 className="help-card-title">{title}</h3>
        <p className="help-card-description">{description}</p>
      </div>
    </div>
  )
}

export function Help(): ReactElement {
  const [searchQuery, setSearchQuery] = useState('')

  const helpTopics: HelpTopicCardProps[] = [
    {
      title: 'Pierwsze kroki',
      description: 'Naucz się podstaw zarządzania finansami w kilka minut.',
      icon: <Rocket size={24} />,
      variant: 'green'
    },
    {
      title: 'Budżety',
      description: 'Optymalizacja wydatków i planowanie oszczędności.',
      icon: <Landmark size={24} />,
      variant: 'blue'
    },
    {
      title: 'Bezpieczeństwo',
      description: 'Twoje dane są u nas bezpieczne. Dowiedz się jak je chronimy.',
      icon: <Shield size={24} />,
      variant: 'peach'
    }
  ]

  const filteredTopics = helpTopics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="help-container">
      <div className="help-header">
        <h1 className="help-title">Centrum Pomocy</h1>
      </div>

      <div className="help-search-container">
        <Search className="help-search-icon" size={20} />
        <input 
          type="text" 
          className="help-search-input" 
          placeholder="Szukaj pomocy..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="help-grid">
        {filteredTopics.map((topic, index) => (
          <HelpTopicCard 
            key={index}
            title={topic.title}
            description={topic.description}
            icon={topic.icon}
            variant={topic.variant}
          />
        ))}
      </div>
    </div>
  )
}
