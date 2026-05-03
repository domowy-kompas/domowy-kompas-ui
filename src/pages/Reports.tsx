import { useState, type ReactElement } from 'react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell 
} from 'recharts'
import { useReportsData } from '../hooks/useReportsData'
import { formatCurrency } from '../utils/format'
import { ReportsGridSkeleton } from './ReportsSkeletons'
import './Reports.css'

// Icons
import homeIcon from '../assets/budgets/home.png'
import transportIcon from '../assets/budgets/transport.png'
import foodIcon from '../assets/budgets/food.png'
import entertainmentIcon from '../assets/budgets/entertainment.png'
import otherIcon from '../assets/budgets/other.png'

const ICON_MAP: Record<string, string> = {
  home: homeIcon,
  utensils: foodIcon,
  film: entertainmentIcon,
  car: transportIcon,
  circle: otherIcon
}

export function Reports(): ReactElement {
  const [period, setPeriod] = useState('Miesiąc')
  const { data, historicalData, isLoading, error } = useReportsData(period)

  // use centralized formatter

  if (error) return <div className="reports-page">Błąd: {error}</div>

  return (
    <div className="reports-page">
      {/* Filters Top Bar */}
      <section className="reports-filters">
        <div className="period-toggle">
          {['Miesiąc', 'Kwartał', 'Rok'].map((p) => (
            <button 
              key={p} 
              className={`period-btn ${period === p ? 'active' : ''}`}
              onClick={() => setPeriod(p)}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="date-navigator">
          <button className="date-nav-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span className="current-date">Październik 2024</span>
          <button className="date-nav-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </section>

      {isLoading ? (
        <ReportsGridSkeleton />
      ) : (
        <div className="reports-grid">
          {/* Section 1: Summary KPI */}
          <div className="report-card kpi-card">
            <h3>Podsumowanie okresu</h3>
            <div className="summary-list">
              <div className="summary-item income">
                <span className="label">Całkowity Przychód</span>
                <div className="value-row">
                  <span className="value">{formatCurrency(data?.summary.totalIncome || 0)}</span>
                  <span className="trend-badge positive">+{data?.summary.incomeTrend}%</span>
                </div>
              </div>
              <div className="summary-item expenses">
                <span className="label">Całkowite Wydatki</span>
                <div className="value-row">
                  <span className="value">{formatCurrency(data?.summary.totalExpenses || 0)}</span>
                  <span className="trend-badge negative">+{data?.summary.expensesTrend}%</span>
                </div>
              </div>
              <div className="summary-item savings">
                <span className="label">Oszczędności netto</span>
                <div className="value-row">
                  <span className="value">{formatCurrency(data?.summary.netSavings || 0)}</span>
                  <span className="trend-badge savings">{data?.summary.savingsTrend}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Income vs Expenses Chart */}
          <div className="report-card chart-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3>Przychody vs Wydatki (6 miesięcy)</h3>
            </div>
            <div style={{ width: '100%', height: 450 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historicalData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="custom-tooltip">
                            <p className="label">{payload[0].payload.month}</p>
                            <p className="value" style={{ color: '#005C55' }}>Przychód: {formatCurrency(payload[0].value as number)}</p>
                            <p className="value" style={{ color: '#94a3b8' }}>Wydatki: {formatCurrency(payload[1].value as number)}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend verticalAlign="top" align="right" iconType="circle" iconSize={8} wrapperStyle={{ top: -40 }} />
                  <Bar dataKey="income" name="Przychody" fill="#005C55" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="expenses" name="Wydatki" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Section 3: Expenses by Category */}
          <div className="report-card donut-card">
            <h3>Wydatki wg kategorii</h3>
            <div className="donut-chart-container">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={data?.categories}
                    innerRadius={80}
                    outerRadius={105}
                    paddingAngle={2}
                    dataKey="amount"
                    stroke="none"
                  >
                    {data?.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-center-label">
                <span className="label">RAZEM</span>
                <span className="total-value">{Math.round(data?.summary.totalExpenses || 0)} zł</span>
              </div>
            </div>

            <div className="custom-legend">
              {data?.categories.map((cat, index) => (
                <div key={index} className="legend-item">
                  <div className="legend-dot" style={{ backgroundColor: cat.color }}></div>
                  <div className="legend-info">
                    <span className="legend-name">{cat.name.split(' ')[0]}</span>
                    <span className="legend-details">{cat.percentage}% • {formatCurrency(cat.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Deep Analysis List */}
          <div className="report-card analysis-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h3>Głęboka analiza wydatków</h3>
              <button style={{ background: 'none', border: 'none', color: '#005C55', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Szczegóły</button>
            </div>
            <div className="analysis-list">
              {data?.categories.map((cat, index) => (
                <div key={index} className="analysis-item">
                  <div className="category-icon-box">
                    <img src={ICON_MAP[cat.icon]} aria-hidden="true" />
                  </div>
                  <div className="analysis-content">
                    <div className="analysis-header">
                      <span className="cat-name">{cat.name}</span>
                      <span className="cat-amount">{formatCurrency(cat.amount)}</span>
                    </div>
                    <div className="analysis-progress-bg">
                      <div 
                        className="analysis-progress-fill" 
                        style={{ width: `${cat.percentage}%`, background: cat.color }}
                      ></div>
                    </div>
                    <div className="analysis-footer">
                      <span>Wykorzystano {cat.percentage}% budżetu</span>
                      {cat.percentage > 90 ? (
                        <span className="limit-warning">Blisko limitu! ({cat.percentage}%)</span>
                      ) : (
                        <span>Limit: {formatCurrency(cat.limit)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
