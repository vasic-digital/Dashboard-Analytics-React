import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ActivityFeed } from '../ActivityFeed'
import type { ActivityItem } from '../ActivityFeed'

const items: ActivityItem[] = [
  { id: 1, message: 'Scan completed', timestamp: '2024-01-01T10:00:00Z', type: 'success' },
  { id: 2, message: 'New entity detected', timestamp: '2024-01-01T10:01:00Z', type: 'info' },
  { id: 3, message: 'Metadata refreshed', timestamp: '2024-01-01T10:02:00Z', type: 'info' },
]

describe('ActivityFeed', () => {
  it('renders all activity items', () => {
    render(<ActivityFeed items={items} />)
    expect(screen.getByTestId('feed-item-1')).toBeTruthy()
    expect(screen.getByTestId('feed-item-2')).toBeTruthy()
    expect(screen.getByTestId('feed-item-3')).toBeTruthy()
  })

  it('shows empty state when no items', () => {
    render(<ActivityFeed items={[]} />)
    expect(screen.getByTestId('feed-empty')).toBeTruthy()
  })

  it('limits items to maxItems', () => {
    render(<ActivityFeed items={items} maxItems={2} />)
    expect(screen.getByTestId('feed-item-1')).toBeTruthy()
    expect(screen.getByTestId('feed-item-2')).toBeTruthy()
    expect(screen.queryByTestId('feed-item-3')).toBeNull()
  })

  it('shows title when provided', () => {
    render(<ActivityFeed items={[]} title="Recent Activity" />)
    expect(screen.getByTestId('feed-title')).toHaveTextContent('Recent Activity')
  })

  it('renders messages and timestamps', () => {
    render(<ActivityFeed items={[items[0]]} />)
    const messages = screen.getAllByTestId('feed-message')
    expect(messages[0]).toHaveTextContent('Scan completed')
    const timestamps = screen.getAllByTestId('feed-timestamp')
    expect(timestamps[0]).toHaveTextContent('2024-01-01T10:00:00Z')
  })

  it('displays each timestamp next to its message', () => {
    render(<ActivityFeed items={items} />)
    const timestamps = screen.getAllByTestId('feed-timestamp')
    expect(timestamps).toHaveLength(3)
    expect(timestamps[0]).toHaveTextContent('2024-01-01T10:00:00Z')
    expect(timestamps[1]).toHaveTextContent('2024-01-01T10:01:00Z')
    expect(timestamps[2]).toHaveTextContent('2024-01-01T10:02:00Z')
  })

  it('does not show title when not provided', () => {
    render(<ActivityFeed items={items} />)
    expect(screen.queryByTestId('feed-title')).toBeNull()
  })

  it('renders feed container', () => {
    render(<ActivityFeed items={items} />)
    expect(screen.getByTestId('activity-feed')).toBeTruthy()
  })

  it('uses default maxItems of 10', () => {
    const manyItems: ActivityItem[] = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      message: `Event ${i + 1}`,
      timestamp: `2024-01-01T10:${String(i).padStart(2, '0')}:00Z`,
    }))
    render(<ActivityFeed items={manyItems} />)
    // Default maxItems = 10, so items 11-15 should not render
    expect(screen.getByTestId('feed-item-10')).toBeTruthy()
    expect(screen.queryByTestId('feed-item-11')).toBeNull()
  })

  it('shows all items when count is less than maxItems', () => {
    render(<ActivityFeed items={items} maxItems={100} />)
    expect(screen.getByTestId('feed-item-1')).toBeTruthy()
    expect(screen.getByTestId('feed-item-2')).toBeTruthy()
    expect(screen.getByTestId('feed-item-3')).toBeTruthy()
  })

  it('handles items without type field', () => {
    const typelessItems: ActivityItem[] = [
      { id: 'a', message: 'No type here', timestamp: '2024-01-01T00:00:00Z' },
    ]
    render(<ActivityFeed items={typelessItems} />)
    expect(screen.getByTestId('feed-item-a')).toBeTruthy()
    expect(screen.getByTestId('feed-message')).toHaveTextContent('No type here')
  })

  it('handles string IDs', () => {
    const stringIdItems: ActivityItem[] = [
      { id: 'abc-123', message: 'String ID', timestamp: '2024-01-01T00:00:00Z' },
    ]
    render(<ActivityFeed items={stringIdItems} />)
    expect(screen.getByTestId('feed-item-abc-123')).toBeTruthy()
  })

  it('renders maxItems of 1 showing only first item', () => {
    render(<ActivityFeed items={items} maxItems={1} />)
    expect(screen.getByTestId('feed-item-1')).toBeTruthy()
    expect(screen.queryByTestId('feed-item-2')).toBeNull()
  })
})
