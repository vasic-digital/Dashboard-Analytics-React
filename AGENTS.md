# AGENTS.md - Dashboard-Analytics-React Multi-Agent Coordination

## Module Identity

- **Package**: `@vasic-digital/dashboard-analytics`
- **Role**: React dashboard and analytics components for stats visualization, media distribution charts, and activity feeds
- **Peer Dependencies**: `react ^18.0.0`
- **Internal Dependencies**: `@vasic-digital/media-types`
- **TypeScript**: Strict mode

## Agent Responsibilities

### Dashboard Analytics Agent

The Dashboard Analytics agent owns all dashboard visualization components:

1. **StatsCard** (`src/StatsCard.tsx`) -- Single metric display with label, value, optional unit suffix, and optional trend arrow (up/down/neutral).

2. **EntityStatsGrid** (`src/EntityStatsGrid.tsx`) -- Auto-layout grid of `StatsCard` instances from `EntityStats` API data. Renders total entities, total files, total size (auto-formatted B/MB/GB/TB via `formatSize()`), recent additions (with up trend), and duplicate groups.

3. **MediaDistributionBar** (`src/MediaDistributionBar.tsx`) -- Horizontal stacked bar chart with 8-color palette and labeled legend. Accepts `Record<string, number>` data. Handles empty state.

4. **ActivityFeed** (`src/ActivityFeed.tsx`) -- Scrollable list of `ActivityItem` objects (id, message, timestamp, optional type). Supports `maxItems` truncation and custom title. Handles empty state.

## Cross-Agent Coordination

### Upstream Dependencies

| Package | What Is Used | Coordinate When |
|---------|-------------|-----------------|
| `@vasic-digital/media-types` | `EntityStats` | Stats interface field changes |

### Coordination Rules

- All components are **pure presentational**: no data fetching, no side effects.
- `EntityStatsGrid` depends on the exact shape of `EntityStats`. Any field addition/removal in `@vasic-digital/media-types` requires a corresponding update here.
- `ActivityItem` type is defined locally; changes affect only this module.

## File Map

```
Dashboard-Analytics-React/
  src/
    index.ts                           -- Re-exports all components, prop types, ActivityItem
    StatsCard.tsx                       -- Single metric card with trend indicator
    EntityStatsGrid.tsx                 -- Grid of StatsCards from EntityStats data
    MediaDistributionBar.tsx            -- Horizontal stacked bar chart with legend
    ActivityFeed.tsx                    -- Scrollable activity event list
    __tests__/
      StatsCard.test.tsx               -- StatsCard rendering tests
      EntityStatsGrid.test.tsx         -- Stats grid rendering tests
      MediaDistributionBar.test.tsx    -- Bar chart rendering tests
      ActivityFeed.test.tsx            -- Activity feed rendering tests
      setup.ts                         -- Test setup (jsdom)
```

## Testing Standards

```bash
npm install
npm run build        # tsc
npm run test         # vitest run
npm run lint         # tsc --noEmit
```

Tests use Vitest with React Testing Library and jsdom environment. All elements have `data-testid` attributes.

## Conventions

- Presentational components: zero data fetching or side effects
- Composition: EntityStatsGrid composes StatsCard
- Data transformation: `formatSize()` converts bytes to human-readable units (B/MB/GB/TB)
- Color cycling: MediaDistributionBar uses a fixed 8-color palette with modulo indexing

## Constraints

- **No CI/CD pipelines**: GitHub Actions, GitLab CI/CD, and all automated pipeline configurations are permanently disabled. All testing is local.
- **No data fetching**: Components receive all data via props. API calls belong in the host application.
- **No chart libraries**: All visualizations are built with native HTML/CSS (no recharts, d3, or similar).


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

