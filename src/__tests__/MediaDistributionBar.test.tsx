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
})
