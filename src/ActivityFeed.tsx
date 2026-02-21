import React from 'react'

export interface ActivityItem {
  id: string | number
  message: string
  timestamp: string
  type?: 'info' | 'success' | 'warning' | 'error'
}

export interface ActivityFeedProps {
  items: ActivityItem[]
  maxItems?: number
  title?: string
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ items, maxItems = 10, title }) => {
  const displayed = items.slice(0, maxItems)

  return (
    <div data-testid="activity-feed">
      {title && <div data-testid="feed-title" style={{ fontWeight: 'bold', marginBottom: '8px' }}>{title}</div>}
      {displayed.length === 0 && <div data-testid="feed-empty">No recent activity</div>}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {displayed.map((item) => (
          <li key={item.id} data-testid={`feed-item-${item.id}`} style={{ padding: '6px 0', borderBottom: '1px solid #eee', fontSize: '0.9em' }}>
            <span data-testid="feed-message">{item.message}</span>
            <span data-testid="feed-timestamp" style={{ marginLeft: '8px', color: '#999', fontSize: '0.85em' }}>{item.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
