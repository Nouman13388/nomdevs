# nomdevs — Architecture

## Stack

| Layer | Choice | Version (resolved) |
|---|---|---|
| Framework | TanStack Start (React) | `@tanstack/react-start` 1.168.49 |
| Router | TanStack Router (file-based) | `@tanstack/react-router` 1.170.32 |
| Build | Vite | 8.2.2 |
| Styling | Tailwind CSS v4 (Vite plugin, CSS-first config, no `tailwind.config.js`) | `tailwindcss` / `@tailwindcss/vite` 4.3.3 |
| Animation | Motion | `motion` 13.1.1 |
| Interactive primitive | `CountUp` vendored from react-bits (see `docs/DECISIONS.md`) | n/a (vendored source) |
| UI runtime | React | 19.2.8 |
| Toolchain | Biome (lint + format, single tool) | `@biomejs/biome` 2.4.5 |
| Language | TypeScript, strict | 6.0.3 |

No server functions, no API routes, no database. Every route is
prerendered to static HTML at build time (see **Static output** below) and
deployed as static files — there is nothing running server-side in
production.

## Scaffolding

Generated with the current TanStack CLI, **not** the deprecated
`create-tsrouter-app` package the original brief named — see
`docs/DECISIONS.md` for why (short version: that package now always
scaffolds router-only mode regardless of flags passed, silently dropping
Start). The equivalent working command:

```
npx @tanstack/cli@latest create nomdevs --framework react \
  --non-interactive --package-manager npm --toolchain biome --no-examples
```

## Folder structure (fixed — see Step 3 of the build brief)

```
src/
  components/
    ui/              # primitives: Button, Tag, Card, Container, CountUp
    layout/          # Nav, Footer
    sections/        # Hero, FeaturedWorkStrip, StatStrip, BeforeAfterCompare,
                      # CaseStudyGrid, ServicesSection, TeamGrid, ContactCTA
  data/              # projects.ts, team.ts, services.ts — typed content, zero JSX
  lib/               # utils, cn() helper, constants
  routes/            # TanStack file-based routes (__root.tsx, index.tsx)
  styles/            # app.css (Tailwind entry), tokens.css (design tokens)
docs/                # specs, decisions, architecture (this file)
```

`src/components/sections/` holds eight sections, not the six named in the
original build order — `FeaturedWorkStrip` and `BeforeAfterCompare` were
added by explicit decision (`docs/DECISIONS.md`). No new top-level folder
pattern was introduced to accommodate this; they live in the same
`sections/` directory as everything else.

## Styling: Tailwind v4, CSS-first

Tailwind v4 has no JS config file — theme customization happens in CSS via
`@theme` blocks. `src/styles/tokens.css` is the single source of truth for
every design token (colors, fonts, and the two off-default
tracking/leading values), derived directly from `docs/DESIGN_SPEC.md`.
Every token there auto-generates its matching utility class (e.g.
`--color-accent` → `bg-accent`, `text-accent`, `border-accent`).
`src/styles/app.css` imports Tailwind, then imports `tokens.css`, then adds
the handful of global element resets (`box-sizing`, smooth scroll, body
background/color/font, link color) that aren't utility-class-shaped.

One consequence worth noting: Tailwind v4's spacing scale is **dynamic**
(`calc(var(--spacing) * n)` for any `n`), not the fixed named list v3
shipped. Values like the nav's `72px` height or the footer's flagged
`120px` max-height resolve automatically via plain numeric utilities
(`h-18`, `max-h-30`) — no custom spacing tokens or arbitrary values needed
for those, unlike what v3 would have required.

## Static output & deployment (Cloudflare Pages)

`vite.config.ts` configures the `tanstackStart()` plugin with
`prerender: { enabled: true, crawlLinks: true }`. `npm run build` produces:

- `dist/client/` — the fully static, prerendered site (HTML + hashed
  JS/CSS assets). **This is the deploy artifact.**
- `dist/server/` — a Nitro server bundle. Unused: the site has no
  server functions or API routes for it to serve, so it is not deployed.

Cloudflare's dashboard now creates static sites through its unified
"Workers & Pages" → Create a Worker → git-connected flow rather than the
older, separate Pages product, and that flow always runs a **deploy
command** (`npx wrangler deploy`) after the build command — so a minimal
`wrangler.jsonc` is required even for a purely static site:

```jsonc
{ "name": "nomdevs", "compatibility_date": "2026-08-27", "assets": { "directory": "dist/client" } }
```

No `main` entry — no Worker script, no server functions, no bindings.
`assets.directory` alone deploys `dist/client` as static assets served
directly by the Workers runtime, which is Cloudflare's current
recommended path for static sites (classic Pages is in maintenance mode).
Dashboard settings: build command `npm run build`, deploy command
`npx wrangler deploy`.

## Content flow

Data lives in typed files under `src/data/` (zero JSX). Section components
in `src/components/sections/` accept that data as props — they contain no
hardcoded copy. `src/routes/index.tsx` is the only place that imports from
`src/data/` and wires it into the section components, in design order.
