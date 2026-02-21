import React from 'react'

export interface StatsCardProps {
  label: string
  value: number | string
  unit?: string
  trend?: 'up' | 'down' | 'neutral'
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, unit, trend }) => {
  const trendSymbol = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '—'
  return (
    <div data-testid="stats-card" style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
      <div data-testid="stats-label" style={{ fontSize: '0.85em', color: '#666' }}>{label}</div>
      <div data-testid="stats-value" style={{ fontSize: '1.8em', fontWeight: 'bold' }}>
        {value}{unit && <span data-testid="stats-unit" style={{ fontSize: '0.6em', marginLeft: '4px' }}>{unit}</span>}
      </div>
      {trend && <div data-testid="stats-trend">{trendSymbol}</div>}
    </div>
  )
}
