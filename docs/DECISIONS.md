# Decisions log

Running log of deviations from the original spec, and why. Newest last.

---

## 2026-08-27 — Include `FeaturedWorkStrip` and `BeforeAfterCompare` sections

**Spec said:** Step 4's build order names six sections — Hero, StatStrip,
CaseStudyGrid, ServicesSection, TeamGrid, ContactCTA.

**Deviation:** the source design (`nomdevs.dc.html`) contains two more
sections not in that list: a "Featured work" 3-up teaser strip (right after
Hero) and a "Before it ships / after it's production-ready" drag-to-compare
interactive section (right after StatStrip). Flagged in
`docs/DESIGN_SPEC.md` §5 item 4 rather than silently added or dropped.

**Why included:** user chose "include both" when asked — fullest fidelity
to the design over minimizing scope.

**Effect on build order:** eight sections total, in design order:
Hero → FeaturedWorkStrip → StatStrip → BeforeAfterCompare → CaseStudyGrid →
ServicesSection → TeamGrid → ContactCTA. `BeforeAfterCompare` is a bespoke
interactive component (drag/touch handling, clip-path reveal) — not a
react-bits match, will be hand-built. `FeaturedWorkStrip` reuses the Card
primitive.

Both still live under `src/components/sections/`, no new folder pattern
introduced — Step 3's fixed structure is unaffected.

---

## 2026-08-27 — Scaffolding tool: `@tanstack/cli`, not `create-tsrouter-app`

**Spec said:** `npx create-tsrouter-app@latest nomdevs --template file-router
--add-ons start,tailwindcss`.

**Deviation:** ran that exact command first. It's deprecated and — regardless
of flags passed — now always scaffolds "router-only compatibility mode"
(plain TanStack Router + Vite SPA, no `@tanstack/react-start` dependency at
all). Confirmed by inspecting the generated `package.json` twice (once with
the spec's exact flags, once retrying with modern equivalents) — neither
included `@tanstack/react-start`.

**Fix:** used the tool's own suggested replacement,
`npx @tanstack/cli@latest create nomdevs --framework react
--non-interactive --package-manager npm --toolchain biome --no-examples`
(no `--router-only`, which is what actually opts into Start). This produced
a real TanStack Start app (`@tanstack/react-start` present, `vite.config.ts`
wired with the `tanstackStart()` plugin). Result was merged into the repo
root (`rsync`, excluding the tool's own throwaway `.git` and
`node_modules`) rather than left nested in a `nomdevs/nomdevs/` subfolder.

**Why `biome` over `eslint`:** spec didn't specify a toolchain. Chose Biome
(single binary, lint+format in one, zero config drift between two tools) —
less to install and maintain than an ESLint+Prettier pair for a project
this size. **Why `--no-examples`:** the spec's "no extra code" instinct —
skip the generated demo/counter routes since we're replacing everything
with real content immediately.

---

## 2026-08-27 — react-bits: only `CountUp` used, four components dropped

**Spec said:** "react-bits ... use only where the design calls for that
exact interaction, don't force it into sections that don't need it."

**Decision:** of the five components named in the spec (SplitText, CountUp,
SpotlightCard, GradientText, AnimatedList), checked each against
`nomdevs.dc.html` directly:

| Component | Interaction it provides | Present in the design? |
|---|---|---|
| CountUp | numeric count-up on scroll into view | ✅ yes — `StatStrip`'s `animateCounts()` does exactly this |
| SplitText | per-character text reveal | ❌ no — hero uses one whole-block `fadeInUp` per line/group, staggered by delay, never per-character |
| GradientText | animated gradient-fill text | ❌ no — every text color in the palette is a flat solid, no gradient anywhere |
| SpotlightCard | radial mouse-tracking highlight on hover | ❌ no — card hover is a flat `border-color` swap to accent, nothing mouse-position-based |
| AnimatedList | slide-in/reorder list animation | ❌ no — every list in the design (checklist, outcomes, tags) is static content revealed only by its parent section's scroll-fade, not item-by-item |

**Only `CountUp` is installed/vendored** (adapted to `.tsx`, in
`src/components/ui/CountUp.tsx` — it's a reusable primitive, not
section-specific). The other four are not added as dependencies or vendored
files at all. The interactions the design *does* need elsewhere (hero
stagger, section scroll-reveal, drag-to-compare) are hand-built with plain
`motion/react` primitives (`motion.div`, `useInView`, `useMotionValue`),
since that's exactly what CountUp itself is built from — no second
animation library needed.

---

## 2026-08-27 — Bug: global `a { color }` beat every text-color utility

**Found during:** the Step 4.6 responsive verification pass (375/768/1440
screenshots), not by inspection — nav links and the ghost-variant Button
rendered mint/accent everywhere instead of their intended colors
(`text-text-muted`, `text-bg`, etc.), visible immediately in the 375px nav
screenshot.

**Root cause:** `src/styles/app.css`'s base reset (`a { color:
var(--color-accent) }`, ported from the source design's `<helmet>` styles)
was written as plain, unlayered CSS after `@import "tailwindcss"`. Tailwind
v4 emits all of its utilities inside CSS cascade layers
(`@layer theme, base, components, utilities`). Per the CSS spec, **any
unlayered rule beats every layered rule regardless of specificity or source
order** — so that one plain `a` selector silently overrode every
`text-*` utility applied to an anchor, sitewide.

**Fix:** wrapped the custom reset (`*`, `html`/`body`/`#app` sizing,
`scroll-behavior`, `body`, `a`) in `@layer base { ... }` so it participates
in the same layer order as Tailwind's own base styles and loses to utility
classes as expected. No component code changed — the bug was entirely in
`app.css`.

**Why this matters beyond this one fix:** confirms the value of actually
running the responsive-verification step rather than treating it as a
formality — this bug was invisible in code review (the CSS looked
reasonable in isolation) and only showed up once the page was rendered.
