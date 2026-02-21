# Architecture — @vasic-digital/dashboard-analytics

## Overview

Pure presentational React components for visualizing Catalogizer statistics. All data is passed as props — no data fetching, no side effects.

## Design Patterns

- **Composite**: `EntityStatsGrid` composes multiple `StatsCard` instances
- **Template Method**: `StatsCard` provides the card template; callers fill in label/value/unit/trend
- **Decorator**: `trend` prop on `StatsCard` decorates a value with directional context
- **Null Object**: Empty `ActivityFeed` renders a placeholder rather than nothing

## Principles

- Zero data fetching — components are purely presentational
- All strings are formatted in the component (bytes → TB/GB, seconds → MM:SS)
