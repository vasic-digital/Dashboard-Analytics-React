import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MediaDistributionBar } from '../MediaDistributionBar'

describe('MediaDistributionBar', () => {
  it('renders segments for each type', () => {
    render(<MediaDistributionBar data={{ movie: 500, tv_show: 300, song: 200 }} />)
    expect(screen.getByTestId('bar-segment-movie')).toBeTruthy()
    expect(screen.getByTestId('bar-segment-tv_show')).toBeTruthy()
    expect(screen.getByTestId('bar-segment-song')).toBeTruthy()
  })

  it('renders legend entries', () => {
    render(<MediaDistributionBar data={{ movie: 500, tv_show: 300 }} />)
    expect(screen.getByTestId('legend-movie')).toHaveTextContent('movie: 500')
    expect(screen.getByTestId('legend-tv_show')).toHaveTextContent('tv show: 300')
  })

  it('shows empty state when no data', () => {
    render(<MediaDistributionBar data={{}} />)
    expect(screen.getByTestId('distribution-empty')).toBeTruthy()
  })

  it('renders title when provided', () => {
    render(<MediaDistributionBar data={{ movie: 1 }} title="Media Types" />)
    expect(screen.getByTestId('distribution-title')).toHaveTextContent('Media Types')
  })

  it('calculates correct percentage widths', () => {
    const { container } = render(<MediaDistributionBar data={{ movie: 750, tv_show: 250 }} />)
    const movieSegment = screen.getByTestId('bar-segment-movie')
    const tvSegment = screen.getByTestId('bar-segment-tv_show')
    expect(movieSegment.style.width).toBe('75%')
    expect(tvSegment.style.width).toBe('25%')
  })

  it('shows empty state when all values are zero', () => {
    render(<MediaDistributionBar data={{ movie: 0, tv_show: 0 }} />)
    expect(screen.getByTestId('distribution-empty')).toBeTruthy()
  })

  it('does not show title when not provided', () => {
    render(<MediaDistributionBar data={{ movie: 1 }} />)
    expect(screen.queryByTestId('distribution-title')).toBeNull()
  })

  it('renders bar container', () => {
    render(<MediaDistributionBar data={{ movie: 10 }} />)
    expect(screen.getByTestId('distribution-bar')).toBeTruthy()
  })

  it('handles single entry data', () => {
    render(<MediaDistributionBar data={{ movie: 100 }} />)
    const segment = screen.getByTestId('bar-segment-movie')
    expect(segment.style.width).toBe('100%')
    expect(screen.getByTestId('legend-movie')).toHaveTextContent('movie: 100')
  })
})
