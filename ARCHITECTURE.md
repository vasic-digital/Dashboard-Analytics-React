# Architecture -- Dashboard-Analytics-React

## Purpose

React dashboard and analytics components for Catalogizer. Provides stats cards, entity distribution visualization, and activity feed. Purely presentational with no data fetching or side effects.

## Structure

```
src/
  index.ts                    Re-exports all components and types
  StatsCard.tsx               Single metric card with label, value, unit, trend indicator
  EntityStatsGrid.tsx         Auto-layout grid of StatsCards from EntityStats data
  MediaDistributionBar.tsx    Horizontal stacked bar chart with color-coded legend
  ActivityFeed.tsx            Scrollable list of recent activity events
  __tests__/                  Per-component tests
  __tests__/setup.ts          Test setup (jsdom)
```

## Key Components

- **`StatsCard`** -- Renders a single metric: label, value, optional unit suffix, optional trend arrow (up/down/neutral)
- **`EntityStatsGrid`** -- Takes EntityStats from the API and renders a responsive grid of StatsCards for total entities, total files, total size (auto-formatted B/MB/GB/TB), recent additions, and duplicate groups
- **`MediaDistributionBar`** -- Proportional horizontal bar chart with 8-color palette and labeled legend from Record<string, number> data
- **`ActivityFeed`** -- Renders ActivityItem list (id, message, timestamp, optional type) with maxItems truncation and custom title

## Data Flow

```
EntityStatsGrid(stats: EntityStats)
    |
    formatSize(stats.total_size) -> human-readable (B/MB/GB/TB)
    |
    StatsCard[] -> one per metric (total entities, files, size, recent additions, duplicates)

MediaDistributionBar(data: Record<string, number>)
    |
    calculate proportions -> render horizontal bars with 8-color palette -> legend

ActivityFeed(items: ActivityItem[], maxItems?)
    |
    slice to maxItems -> render list with timestamps
```

## Dependencies

- React 18+ (peer)
- `@vasic-digital/media-types` -- EntityStats

## Testing Strategy

Vitest with React Testing Library and jsdom. Tests cover StatsCard rendering, EntityStatsGrid metric computation, MediaDistributionBar color assignment and proportion calculation, ActivityFeed truncation, and empty state handling.
