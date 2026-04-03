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

  it('handles zero stats', () => {
    const zeroStats: EntityStats = {
      total_entities: 0,
      entities_by_type: {},
      total_files: 0,
      total_size: 0,
      recent_additions: 0,
      duplicate_groups: 0,
    }
    render(<EntityStatsGrid stats={zeroStats} />)
    const cards = screen.getAllByTestId('stats-card')
    expect(cards.length).toBe(5)
    const values = screen.getAllByTestId('stats-value')
    expect(values[0]).toHaveTextContent('0')
    expect(values[1]).toHaveTextContent('0')
  })

  it('renders correct stat values', () => {
    render(<EntityStatsGrid stats={stats} />)
    const values = screen.getAllByTestId('stats-value')
    expect(values[0]).toHaveTextContent('1000')
    expect(values[1]).toHaveTextContent('1500')
    expect(values[3]).toHaveTextContent('25')
    expect(values[4]).toHaveTextContent('10')
  })

  it('formats size in GB for smaller values', () => {
    const gbStats: EntityStats = {
      ...stats,
      total_size: 5_000_000_000,
    }
    render(<EntityStatsGrid stats={gbStats} />)
    const values = screen.getAllByTestId('stats-value')
    const sizeCard = values.find(v => v.textContent?.includes('GB'))
    expect(sizeCard).toBeTruthy()
    expect(sizeCard).toHaveTextContent('5.0 GB')
  })

  it('formats size in MB for small values', () => {
    const mbStats: EntityStats = {
      ...stats,
      total_size: 250_000_000,
    }
    render(<EntityStatsGrid stats={mbStats} />)
    const values = screen.getAllByTestId('stats-value')
    const sizeCard = values.find(v => v.textContent?.includes('MB'))
    expect(sizeCard).toBeTruthy()
    expect(sizeCard).toHaveTextContent('250.0 MB')
  })

  it('renders grid container with data-testid', () => {
    render(<EntityStatsGrid stats={stats} />)
    expect(screen.getByTestId('entity-stats-grid')).toBeTruthy()
  })
})
