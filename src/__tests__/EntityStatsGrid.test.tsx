import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EntityStatsGrid } from '../EntityStatsGrid'
import type { EntityStats } from '@vasic-digital/media-types'

const stats: EntityStats = {
  total_entities: 1000,
  entities_by_type: { movie: 500, tv_show: 300 },
  total_files: 1500,
  total_size: 2_000_000_000_000,
  recent_additions: 25,
  duplicate_groups: 10,
}

describe('EntityStatsGrid', () => {
  it('renders stats grid with all cards', () => {
    render(<EntityStatsGrid stats={stats} />)
    const cards = screen.getAllByTestId('stats-card')
    expect(cards.length).toBe(5)
  })

  it('formats total_size as TB', () => {
    render(<EntityStatsGrid stats={stats} />)
    const values = screen.getAllByTestId('stats-value')
    const sizeCard = values.find(v => v.textContent?.includes('TB'))
    expect(sizeCard).toBeTruthy()
  })

  it('shows recent_additions with up trend', () => {
    render(<EntityStatsGrid stats={stats} />)
    const trends = screen.getAllByTestId('stats-trend')
    expect(trends.some(t => t.textContent === '↑')).toBe(true)
  })
})
