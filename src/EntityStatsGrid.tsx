import React from 'react'
import type { EntityStats } from '@vasic-digital/media-types'
import { StatsCard } from './StatsCard'

/**
 * Props for the EntityStatsGrid component.
 */
export interface EntityStatsGridProps {
  /** Aggregate entity statistics from the API. */
  stats: EntityStats
}

function formatSize(bytes: number): string {
  if (bytes >= 1e12) return `${(bytes / 1e12).toFixed(1)} TB`
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`
  return `${bytes} B`
}

/**
 * Responsive grid of StatsCards showing total entities, total files,
 * formatted total size, recent additions, and duplicate group count.
 *
 * @param props - EntityStatsGridProps
 */
export const EntityStatsGrid: React.FC<EntityStatsGridProps> = ({ stats }) => {
  return (
    <div data-testid="entity-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
      <StatsCard label="Total Entities" value={stats.total_entities} />
      <StatsCard label="Total Files" value={stats.total_files} />
      <StatsCard label="Total Size" value={formatSize(stats.total_size)} />
      <StatsCard label="Recent Additions" value={stats.recent_additions} trend="up" />
      <StatsCard label="Duplicate Groups" value={stats.duplicate_groups} />
    </div>
  )
}
