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

---

## 2026-08-27 — Added `wrangler.jsonc`; deploy path is Workers static assets, not classic Pages

**Spec said / ARCHITECTURE.md originally said:** deploy to Cloudflare Pages,
"no Workers runtime, no bindings, no `wrangler.toml`."

**Deviation:** the user's Cloudflare dashboard only offered the unified
"Workers & Pages → Create a Worker" git-connected flow (classic standalone
Pages project creation is being phased out). That flow always runs a
**deploy command** (`npx wrangler deploy`) after the build command — which
fails with no Wrangler config in the repo to say this is a static site or
where the build output is.

**Fix:** added `wrangler.jsonc` at repo root — `assets.directory:
"dist/client"`, no `main` entry. This still deploys pure static assets
(the Workers runtime serves them directly, no Worker script executes) —
it does not introduce server functions, API routes, or bindings, so the
"no server functions/API routes/DB" constraint holds. `docs/ARCHITECTURE.md`
updated to describe this as the actual deploy path instead of classic
Pages.

---

## 2026-08-27 — Added a logomark (favicon + Nav/Footer)

**Not in the source design at all** — `nomdevs.dc.html` has no logo, only
the "nomdevs" text lockup. User asked for a favicon and a logo.

**Design:** a `>` prompt with a cursor bar (`> _`) — a terminal-prompt
motif, matching the mono/terminal language already established elsewhere
(JetBrains Mono tagline, the ⇄ drag handle, the `▸`/`–`/`→` glyphs used
throughout). Not commissioned through Claude Design — there's no tool
available here that can ask its agent to originate a new creative concept
(the DesignSync tool only reads/writes files into an existing project); a
simple on-brand mark drawn directly as SVG paths was faster and just as
on-brand, given the tokens were already fully specified.

**Implementation:**
- `public/favicon.svg` (+ `favicon.png`/`apple-touch-icon.png` fallbacks,
  rasterized via a headless-browser screenshot of the SVG rather than
  adding an image-processing dependency) — literal hex values, since
  favicons load as standalone files with no CSS context to pull
  `var(--color-*)` from.
- `src/components/ui/Logomark.tsx` — same shape as an inline component for
  Nav/Footer, using `var(--color-*)` (not literal hex) so it stays tied to
  `tokens.css` if the palette ever changes. The two must be updated
  together by hand; there's no build step generating one from the other.

---

## 2026-08-27 — Domain live; git workflow: commit but don't push

`nomdevs.com` is live on the Worker. The DNS conflict was a leftover A
record (Hostinger's old parking IP, `2.57.91.91`) auto-imported into the
Cloudflare zone when nameservers were switched — deleted directly in
Cloudflare's DNS Records page (editing/deleting at Hostinger did nothing;
once nameservers point at Cloudflare, Hostinger's own DNS panel is no
longer authoritative and isn't synced with Cloudflare's zone).

`main` is git-connected to the Worker for auto-deploy on push. **Per the
user: create commits locally, don't push — they push to `origin`
themselves.** See `docs/ARCHITECTURE.md`'s Git workflow section.

---

## 2026-08-27 — Team section removed (content/structure update, part 1)

Per explicit instruction: deleted `src/data/team.ts`, removed `TeamGrid`
usage from `src/routes/index.tsx`, removed the `team` heading from
`src/data/site.ts`, removed the `#team` nav link from `lib/constants.ts`.

`TeamCard.tsx`/`TeamGrid.tsx` kept on disk, unused, per instruction ("in
case needed later"). Their `TeamMember` type used to import from
`data/team.ts`; since that file is gone, the type is now defined inline in
`TeamCard.tsx` and re-exported, so the two files stay self-contained and
still type-check while unused rather than depending on a deleted file.

---

## 2026-08-27 — Content/structure update: carousel, case-study pages, AlsoShipped

Full copy for all 6 case studies was drafted and confirmed by the user
before wiring (their explicit gate) — flags resolved: carousel shows the
first 3 projects in array order; Makro and Everlooms get full dedicated
pages, not homepage-only; ReneeSpace prose stays outcome-focused, no
architecture/RAG framing (ChromaDB appears only as a stack tag); GymBite
and CalmSpace descriptions supplied by the user; invented slugs
(`nexcall-hrms`, `makro-middleware`, `everlooms`) and stack-tag compression
(`Firebase` instead of the full parenthetical) approved as-is.

**`src/data/projects.ts` shape changed**: `Project` is now `{slug, title,
category, problem, story, outcomes, stack}` — dropped `blurb`/`solution`/
`tags`/`href` from the old shape. `href` is now derived as `/${slug}`
wherever needed (CaseStudyCard, FeaturedWorkCarousel), not stored — one
fewer place for slug and href to drift apart. Added `otherWork: OtherWork[]`
(`{name, description}`) for the 4 one-line entries with no page.

**FeaturedWorkStrip replaced by FeaturedWorkCarousel** on the homepage —
same position (under Hero, above CaseStudyGrid). Inferred rather than
explicitly stated: the brief described the carousel landing in the exact
spot FeaturedWorkStrip already occupied, and running both back-to-back
would be a redundant "featured work" teaser twice. FeaturedWorkStrip kept
on disk unused (same pattern as TeamGrid/TeamCard), updated to read
`project.problem` instead of the now-deleted `blurb` field so it still
type-checks while unused. Carousel itself uses native CSS scroll-snap
(touch swipe + trackpad scroll for free) plus prev/next buttons for
mouse-only desktop and keyboard reachability — no drag-physics code, no
new dependency.

**CaseStudyCard**: added the `01 · category` numbered label (number = array
index, zero-padded); dropped the old Problem/Solution two-line pair in
favor of the single `problem` teaser, since `story` (the fuller narrative)
now lives on the dedicated page, not the grid card. All 6 projects render
in one uniform grid — did not build a visually distinct "secondary" tier
for Makro/Everlooms despite the brief's "secondary grid" framing, since
their content is exactly as complete as the top 4 and a different card
treatment for 2 of 6 items wasn't clearly asked for. Flagging in case a
visual split is actually wanted.

**One combined "Also shipped" section**, not two separate tiers — the
brief's "one-line entries" (Gemini, Barcode Books) and "older
projects... condensed list" (GymBite, CalmSpace) are structurally
identical (name + description, no page), so they render as one list rather
than two near-duplicate mini-sections.

**`CaseStudyPage`** is one shared template component; each of the 6 routes
(`src/routes/nexcall-portal.tsx` etc.) is a thin wrapper passing its
`Project` in — avoids duplicating the page layout 6 times.

**Nav fixes required by going multi-page** (not explicitly requested, but
necessary once real subpages exist): `NAV_LINKS` hrefs changed from
`#work` to `/#work` (bare hash only resolves on `/`, would silently do
nothing from a case-study page); the logo lockup is now a link to `/`
(was a plain div in the single-page source design, where a link would
have been a no-op).

**Internal case-study links use plain `<a href="/slug">`**, not TanStack
Router's `<Link>` — `Button` was built anchor-only and used everywhere
(external, hash, mailto); making it polymorphic for one more link type
added real complexity for a fully static, prerendered site where a plain
navigation between two already-static pages is effectively instant anyway.
Engineering trade-off, not asked for either way — noting since a "real" SPA
transition would use `Link`.
