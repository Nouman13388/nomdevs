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
| `cn()` helper | `clsx` + `tailwind-merge` (resolves conflicting utility classes) | `clsx` 2.1.1, `tailwind-merge` 3.6.0 |

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
    ui/              # primitives: Button, Tag, Card, Container, CountUp, Logomark
    layout/          # Nav, Footer
    sections/        # Hero, FeaturedWorkCarousel, StatStrip, BeforeAfterCompare,
                      # CaseStudyGrid, CaseStudyCard, CaseStudyPage, AlsoShipped,
                      # ServicesSection, ContactCTA
                      # (FeaturedWorkStrip, TeamGrid, TeamCard also live here,
                      # unused — kept on disk per explicit instruction, not deleted)
  data/              # projects.ts, services.ts, compare.ts, stats.ts, socials.ts,
                      # site.ts — typed content, zero JSX (team.ts removed, Team
                      # section deleted from the homepage)
  lib/               # cn.ts, constants.ts (nav links, CONTACT_EMAIL,
                      # BOOK_A_CALL_HREF, the placeholder-stripe pattern),
                      # useScrollReveal.ts
  routes/            # TanStack file-based routes: __root.tsx, index.tsx, and
                      # one file per case study (nexcall-portal.tsx,
                      # nexcall-hrms.tsx, ourgarden.tsx, reneespace.tsx,
                      # makro-middleware.tsx, everlooms.tsx) — each a thin
                      # wrapper passing its Project into CaseStudyPage
public/
  screenshots/       # project screenshots, WebP only (see Images below)
  favicon.svg/.png, apple-touch-icon.png
docs/                # specs, decisions, architecture (this file)
```

The site grew from a single page to eight sections plus six case-study
routes over several content passes — see `docs/DECISIONS.md` for the full
history of each addition and why. No new top-level folder pattern was ever
introduced to accommodate this; new content lives in the same `sections/`,
`data/`, and `routes/` directories as everything else.

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

Each case-study route follows the same pattern: look up its `Project` from
`src/data/projects.ts` by slug, pass it to the shared `CaseStudyPage`
template. The template lives in one place; the six route files are only
wiring.

Site-wide structural values that aren't "content" in the varies-by-section
sense — nav links, the contact email, the placeholder stripe pattern —
live in `src/lib/constants.ts` and are imported directly, not passed down
as props (matches how `NAV_LINKS` was already handled). `BOOK_A_CALL_HREF`
is one such constant: every "Book a Call" button across Nav, Hero, and
ContactCTA points at it, so the mailto target has a single source of
truth.

## Images

`public/screenshots/` holds one image per project with a real screenshot,
named by slug (`nexcall-portal.webp`, etc.), referenced from
`Project.screenshot` in `projects.ts`. **WebP only** — no source PNGs are
committed. Projects with no `screenshot` set (currently none) fall back to
the striped placeholder pattern in `CaseStudyCard`/`CaseStudyPage`.

Conversion path, for reproducing this later: this machine has no
`cwebp`/ImageMagick, and macOS's `sips` can't export WebP either. Images
were converted via headless Chromium — draw the PNG into an offscreen
`<canvas>` at a 1600px max width (screenshots straight off a Retina
display run ~3000px wide, far more than any card ever renders at) and
export with `canvas.toDataURL('image/webp', 0.82)`. No new dependency;
same technique used for the favicon.

Makro SCO Middleware has no real screenshot (confidential project, no
public URL) — its image is a generated abstract diagram, explicitly
labeled "illustrative diagram" in the image itself so it's never mistaken
for a real product screenshot.

## Git workflow

`main` is git-connected to the Cloudflare Worker for auto-deploy on push
(see **Static output & deployment** above) — a push to `origin/main` kicks
off a build automatically.

**Commits are made locally but not pushed.** The user pushes to `origin`
themselves. Don't run `git push` in this repo unless explicitly asked —
create the commit and stop there.
