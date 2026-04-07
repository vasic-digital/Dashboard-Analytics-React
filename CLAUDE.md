# CLAUDE.md - Dashboard-Analytics-React

## Overview

React dashboard and analytics components for Catalogizer, providing stats visualization, media type distribution charts, and activity feeds.

**Package**: `@vasic-digital/dashboard-analytics`

## Build & Test

```bash
npm install
npm run build        # tsc
npm run test         # vitest run
npm run lint         # tsc --noEmit
npm run clean        # rm -rf dist
```

## Code Style

- TypeScript strict mode
- PascalCase components, camelCase functions
- Imports grouped: React, third-party, internal (`@vasic-digital/*`)
- Tests: Vitest with React Testing Library and jsdom environment
- All elements have `data-testid` attributes for testing

## Package Structure

| Path | Purpose |
|------|---------|
| `src/index.ts` | Re-exports all components and prop/item types |
| `src/StatsCard.tsx` | Single metric card with label, value, unit, trend indicator |
| `src/EntityStatsGrid.tsx` | Auto-layout grid of StatsCards from EntityStats data |
| `src/MediaDistributionBar.tsx` | Horizontal stacked bar chart with color-coded legend |
| `src/ActivityFeed.tsx` | Scrollable list of recent activity events |
| `src/__tests__/` | Per-component tests |
| `src/__tests__/setup.ts` | Test setup (jsdom) |

## Key Exports

- `StatsCard` -- Renders a single metric: label, value, optional unit suffix, optional trend arrow (up/down/neutral)
- `EntityStatsGrid` -- Takes `EntityStats` from the API and renders a responsive grid of StatsCards for total entities, total files, total size (auto-formatted to B/MB/GB/TB), recent additions (with up trend), and duplicate groups
- `MediaDistributionBar` -- Takes `Record<string, number>` data and renders a proportional horizontal bar chart with 8-color palette and labeled legend; handles empty state
- `ActivityFeed` -- Renders a list of `ActivityItem` objects (id, message, timestamp, optional type); supports `maxItems` truncation and custom title; handles empty state

## Dependencies

- **Peer**: `react ^18.0.0`
- **Internal**: `@vasic-digital/media-types` (EntityStats)

## Design Patterns

- **Presentational components**: All components are pure rendering; no data fetching or side effects
- **Composition**: EntityStatsGrid composes StatsCard
- **Data transformation**: `formatSize()` in EntityStatsGrid converts bytes to human-readable units (B/MB/GB/TB)
- **Color cycling**: MediaDistributionBar uses a fixed 8-color palette, cycling via modulo for arbitrary data keys

## Commit Style

Conventional Commits: `feat(dashboard-analytics): description`


## ⚠️ MANDATORY: NO SUDO OR ROOT EXECUTION

**ALL operations MUST run at local user level ONLY.**

This is a PERMANENT and NON-NEGOTIABLE security constraint:

- **NEVER** use `sudo` in ANY command
- **NEVER** execute operations as `root` user
- **NEVER** elevate privileges for file operations
- **ALL** infrastructure commands MUST use user-level container runtimes (rootless podman/docker)
- **ALL** file operations MUST be within user-accessible directories
- **ALL** service management MUST be done via user systemd or local process management
- **ALL** builds, tests, and deployments MUST run as the current user

### Why This Matters
- **Security**: Prevents accidental system-wide damage
- **Reproducibility**: User-level operations are portable across systems
- **Safety**: Limits blast radius of any issues
- **Best Practice**: Modern container workflows are rootless by design

### When You See SUDO
If any script or command suggests using `sudo`:
1. STOP immediately
2. Find a user-level alternative
3. Use rootless container runtimes
4. Modify commands to work within user permissions

**VIOLATION OF THIS CONSTRAINT IS STRICTLY PROHIBITED.**

