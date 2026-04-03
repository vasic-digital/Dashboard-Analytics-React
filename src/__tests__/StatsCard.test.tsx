import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatsCard } from '../StatsCard'

describe('StatsCard', () => {
  it('renders label and value', () => {
    render(<StatsCard label="Total Entities" value={1000} />)
    expect(screen.getByTestId('stats-label')).toHaveTextContent('Total Entities')
    expect(screen.getByTestId('stats-value')).toHaveTextContent('1000')
  })

  it('shows unit when provided', () => {
    render(<StatsCard label="Size" value={50} unit="GB" />)
    expect(screen.getByTestId('stats-unit')).toHaveTextContent('GB')
  })

  it('shows up trend arrow', () => {
    render(<StatsCard label="New" value={5} trend="up" />)
    expect(screen.getByTestId('stats-trend')).toHaveTextContent('↑')
  })

  it('shows down trend arrow', () => {
    render(<StatsCard label="Old" value={2} trend="down" />)
    expect(screen.getByTestId('stats-trend')).toHaveTextContent('↓')
  })

  it('does not show trend when not provided', () => {
    render(<StatsCard label="X" value={0} />)
    expect(screen.queryByTestId('stats-trend')).toBeNull()
  })

  it('accepts string value', () => {
    render(<StatsCard label="Status" value="Active" />)
    expect(screen.getByTestId('stats-value')).toHaveTextContent('Active')
  })

  it('shows neutral trend indicator', () => {
    render(<StatsCard label="Stable" value={10} trend="neutral" />)
    expect(screen.getByTestId('stats-trend')).toHaveTextContent('—')
  })

  it('handles zero value', () => {
    render(<StatsCard label="Empty" value={0} />)
    expect(screen.getByTestId('stats-value')).toHaveTextContent('0')
  })

  it('handles empty string value', () => {
    render(<StatsCard label="Pending" value="" />)
    expect(screen.getByTestId('stats-value')).toBeTruthy()
    expect(screen.getByTestId('stats-value').textContent).toBe('')
  })

  it('does not show unit when not provided', () => {
    render(<StatsCard label="Count" value={42} />)
    expect(screen.queryByTestId('stats-unit')).toBeNull()
  })

  it('renders card container', () => {
    render(<StatsCard label="Test" value={1} />)
    expect(screen.getByTestId('stats-card')).toBeTruthy()
  })
})
