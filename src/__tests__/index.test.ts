import { describe, it, expect } from 'vitest'
import {
  StatsCard,
  EntityStatsGrid,
  MediaDistributionBar,
  ActivityFeed,
} from '../index'

describe('index exports', () => {
  it('exports StatsCard component', () => {
    expect(StatsCard).toBeDefined()
    expect(typeof StatsCard).toBe('function')
  })

  it('exports EntityStatsGrid component', () => {
    expect(EntityStatsGrid).toBeDefined()
    expect(typeof EntityStatsGrid).toBe('function')
  })

  it('exports MediaDistributionBar component', () => {
    expect(MediaDistributionBar).toBeDefined()
    expect(typeof MediaDistributionBar).toBe('function')
  })

  it('exports ActivityFeed component', () => {
    expect(ActivityFeed).toBeDefined()
    expect(typeof ActivityFeed).toBe('function')
  })
})
