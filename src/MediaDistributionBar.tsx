import React from 'react'

export interface MediaDistributionBarProps {
  data: Record<string, number>
  title?: string
}

export const MediaDistributionBar: React.FC<MediaDistributionBarProps> = ({ data, title }) => {
  const total = Object.values(data).reduce((s, v) => s + v, 0)
  if (total === 0) return <div data-testid="distribution-empty">No data</div>

  const colors = ['#2563eb', '#16a34a', '#dc2626', '#ca8a04', '#9333ea', '#0891b2', '#db2777', '#65a30d']

  return (
    <div data-testid="distribution-bar">
      {title && <div data-testid="distribution-title" style={{ fontWeight: 'bold', marginBottom: '8px' }}>{title}</div>}
      <div style={{ display: 'flex', height: '24px', borderRadius: '4px', overflow: 'hidden' }}>
        {Object.entries(data).map(([key, val], i) => (
          <div
            key={key}
            data-testid={`bar-segment-${key}`}
            title={`${key}: ${val}`}
            style={{ width: `${(val / total) * 100}%`, background: colors[i % colors.length] }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
        {Object.entries(data).map(([key, val], i) => (
          <div key={key} data-testid={`legend-${key}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8em' }}>
            <span style={{ width: '12px', height: '12px', background: colors[i % colors.length], borderRadius: '2px', display: 'inline-block' }} />
            {key.replace(/_/g, ' ')}: {val}
          </div>
        ))}
      </div>
    </div>
  )
}
