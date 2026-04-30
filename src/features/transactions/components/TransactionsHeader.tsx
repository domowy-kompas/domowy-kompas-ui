import type { ReactElement } from 'react'
interface Props {
  filters: {
    search: string
    period: string
    category: string
    type: string
  }
  updateFilters: (filters: Partial<Props['filters']>) => void
}

export function TransactionsHeader({ filters, updateFilters }: Props): ReactElement {

  return (
    <div className="transactions-header">
      <div className="filter-card">
        <label>Szukaj transakcji</label>
        <div className="filter-input-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#717171' }}>
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Np. zakupy spożywcze" 
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
          />
        </div>
      </div>

      <div className="filter-card">
        <label>Okres</label>
        <div className="filter-input-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#717171' }}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <select 
            value={filters.period}
            onChange={(e) => updateFilters({ period: e.target.value })}
          >
            <option>Wszystkie</option>
            <option>Ten miesiąc</option>
            <option>Poprzedni miesiąc</option>
            <option>Ostatnie 3 miesiące</option>
          </select>
        </div>
      </div>

      <div className="filter-card">
        <label>Kategoria</label>
        <div className="filter-input-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#717171' }}>
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <select 
            value={filters.category}
            onChange={(e) => updateFilters({ category: e.target.value })}
          >
            <option>Wszystkie</option>
            <option>Zakupy</option>
            <option>Dom</option>
            <option>Rozrywka</option>
            <option>Praca</option>
          </select>
        </div>
      </div>

      <div className="filter-card">
        <label>Filtry</label>
        <div style={{ display: 'flex', background: '#f0f0f0', borderRadius: '8px', padding: '4px' }}>
          <button 
            onClick={() => updateFilters({ type: 'Wszystkie' })}
            style={{ 
              flex: 1, 
              border: 'none', 
              padding: '6px 12px', 
              borderRadius: '6px', 
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              background: filters.type === 'Wszystkie' ? 'white' : 'transparent',
              color: filters.type === 'Wszystkie' ? '#006d5b' : '#717171',
              boxShadow: filters.type === 'Wszystkie' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Wszystkie
          </button>
          <button 
            onClick={() => updateFilters({ type: 'Wydatki' })}
            style={{ 
              flex: 1, 
              border: 'none', 
              padding: '6px 12px', 
              borderRadius: '6px', 
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              background: filters.type === 'Wydatki' ? 'white' : 'transparent',
              color: filters.type === 'Wydatki' ? '#006d5b' : '#717171',
              boxShadow: filters.type === 'Wydatki' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Wydatki
          </button>
        </div>
      </div>
    </div>
  )
}
