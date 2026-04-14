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

  it('cycles colors for more than 8 categories', () => {
    const data: Record<string, number> = {
      cat1: 10, cat2: 10, cat3: 10, cat4: 10,
      cat5: 10, cat6: 10, cat7: 10, cat8: 10,
      cat9: 10,
    }
    render(<MediaDistributionBar data={data} />)
    // The 9th category (cat9) should use the same color as cat1 (index 0 % 8)
    const segment1 = screen.getByTestId('bar-segment-cat1')
    const segment9 = screen.getByTestId('bar-segment-cat9')
    expect(segment1.style.background).toBe(segment9.style.background)
  })

  it('replaces underscores with spaces in legend labels', () => {
    render(<MediaDistributionBar data={{ music_album: 50, tv_episode: 30 }} />)
    expect(screen.getByTestId('legend-music_album')).toHaveTextContent('music album: 50')
    expect(screen.getByTestId('legend-tv_episode')).toHaveTextContent('tv episode: 30')
  })

  it('renders bar segments with title attributes', () => {
    render(<MediaDistributionBar data={{ movie: 100, song: 50 }} />)
    const movieSegment = screen.getByTestId('bar-segment-movie')
    expect(movieSegment.title).toBe('movie: 100')
    const songSegment = screen.getByTestId('bar-segment-song')
    expect(songSegment.title).toBe('song: 50')
  })

  it('renders legend for all entries', () => {
    const data = { movie: 10, tv_show: 20, song: 30, game: 40 }
    render(<MediaDistributionBar data={data} />)
    expect(screen.getByTestId('legend-movie')).toBeTruthy()
    expect(screen.getByTestId('legend-tv_show')).toBeTruthy()
    expect(screen.getByTestId('legend-song')).toBeTruthy()
    expect(screen.getByTestId('legend-game')).toBeTruthy()
  })

  it('calculates proportional widths for unequal data', () => {
    render(<MediaDistributionBar data={{ movie: 10, tv_show: 30, song: 60 }} />)
    const movieSegment = screen.getByTestId('bar-segment-movie')
    const tvSegment = screen.getByTestId('bar-segment-tv_show')
    const songSegment = screen.getByTestId('bar-segment-song')
    expect(movieSegment.style.width).toBe('10%')
    expect(tvSegment.style.width).toBe('30%')
    expect(songSegment.style.width).toBe('60%')
  })
})
