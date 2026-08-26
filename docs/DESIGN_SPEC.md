# nomdevs — Design Spec

Extracted from Claude Design project `a8ef0d61-b137-44ad-b812-649e47cca265`,
focus file `nomdevs.dc.html` (single fluid-responsive artboard, no explicit
per-breakpoint frames — see **Breakpoints** below for what that means for
this build). Dependency `support.js` was read and confirmed to be the
generic DC template runtime (React glue, `{{ }}` interpolation, `sc-for`
loops, `style-hover` → pseudo-class shim, `IntersectionObserver`-based
scroll reveal). It contributes no design tokens of its own; its only
relevance here is the interaction mechanics noted inline below.

---

## 1. Color tokens

Seven colors total in the shipped design (excluding DC-editor-only chrome
colors like the `#b00020` error banner and the streaming-shimmer gradient in
`support.js`, which belong to the design tool, not the site).

| Hex | Usage | CSS variable |
| --- | --- | --- |
| `#0B0B0D` | Page background; text color printed on top of accent-filled buttons | `--color-bg` |
| `#151517` | Card/surface background (case study cards, service cards, tag chips, drag-compare panel) | `--color-surface` |
| `#26262A` | Hairline borders, section dividers, card borders | `--color-border` |
| `#F5F5F5` | Primary text (headings, body) | `--color-text` |
| `#9A9AA0` | Muted/secondary text (subheads, labels, mono captions) | `--color-text-muted` |
| `#00D9A3` | Accent — links, primary buttons, stat numbers, active states | `--color-accent` |
| `#1c1c1f` | Second stripe color in the diagonal placeholder pattern (`repeating-linear-gradient`) used for "case study screenshot" / "photo" blocks | `--color-placeholder-stripe` |

Derived/composite usage (not new colors, just modifiers of the above):

- Nav backdrop: `rgba(11,11,13,0.85)` = `--color-bg` at 85% opacity, with `backdrop-filter: blur(8px)`.
- Accent-filled buttons: background `--color-accent`, text `--color-bg`.
- `style-hover` swaps observed: muted→text on nav links, opacity 0.85 on filled buttons, opacity 0.8 on text links, border/text→accent on outline button and social icons.

**Observation:** the palette is unusually disciplined — no stray one-off
hex values anywhere in the template. Nothing to flag here.

---

## 2. Spacing → Tailwind scale

All spacing in the source is plain px. Tailwind's default scale is
`key × 4px` for keys 1–12, then 14/16/20/24/28/32/36/40/44/48/52/56/60/64/72/80/96.

| px found | Tailwind key | On default scale? |
| --- | --- | --- |
| 4 | `1` | ✅ |
| 8 | `2` | ✅ |
| 12 | `3` | ✅ |
| 16 | `4` | ✅ |
| 24 | `6` | ✅ |
| 32 | `8` | ✅ |
| 48 | `12` | ✅ |
| 64 | `16` | ✅ |
| 96 | `24` | ✅ |
| **72** (nav `height`) | would be key `18` | ❌ **off-scale** — default scale jumps 16→20, skipping 18 |
| **120** (footer `max-height`) | would be key `30` | ❌ **off-scale** — default scale jumps 28→32, skipping 30 |

Border radius (separate scale, and here it's lucky): `8px` → `rounded-lg`,
`12px` → `rounded-xl`. Both land exactly on Tailwind defaults, no
customization needed.

**Flagged, not silently fixed:**

- Nav height `72px` doesn't map to a default spacing token. Options for
  Step 4: arbitrary value `h-[72px]`, or add a custom `18: '4.5rem'` token
  to the Tailwind theme. Deferred to the Nav component step.
- Footer `max-height: 120px` is both off-scale *and* structurally
  suspicious — a hard max-height on a footer risks clipping real content
  (the source only has to fit one short row, but our data-driven footer
  should not silently truncate). Recommend dropping the max-height
  constraint entirely rather than reproducing it. Deferred to Footer step,
  to be logged in `DECISIONS.md` when built.

---

## 3. Typography

**Families** (loaded via Google Fonts):

- `Inter` — weights `500, 600, 700` requested — sans body/headings.
- `JetBrains Mono` — weights `400, 500` requested — monospace for labels, tags, stat captions, code-flavored copy.

**Revised finding (was flagged, now resolved):** weight `500` looked unused
at first pass since no inline style says `font-weight:500`. But the Google
Fonts request for **Inter never loads weight 400 at all** (`Inter:wght@500;
600;700`) — so every Inter element with no explicit weight (hero paragraph,
case-study body copy, etc.) has no `400` face to render with, and the
browser substitutes the nearest loaded weight, `500`. That makes `500` the
de-facto default body weight for Inter — not unused, just implicit. This
site copies the source's exact Google Fonts URL rather than "fixing" it by
adding 400, to preserve that rendered weight exactly.
JetBrains Mono is different: `400` *is* loaded, so its `500` request really
is inert (every mono element renders at true `400`) — kept anyway since it
costs nothing and matches the source byte-for-byte.

**Sizes found** (all map cleanly to Tailwind's default type scale):

| px | Tailwind | Used for |
| --- | --- | --- |
| 14 | `text-sm` | mono labels, tags, nav links, captions |
| 16 | `text-base` | body copy, buttons, list items |
| 24 | `text-2xl` | h2 section headings, h3 case-study/service titles |
| 32 | `text-3xl` | contact section h2 |
| 48 | `text-5xl` | stat numbers |
| `clamp(32px, 6vw, 48px)` | no direct token — fluid | hero `h1` |

**Line-heights:** `1.1` (logo lockup, hero h1) and `1.5` (body copy,
case-study problem/solution text). `1.5` matches Tailwind's `leading-normal`
exactly. `1.1` doesn't match any default leading token (`leading-tight` is
`1.25`, `leading-none` is `1`) — **flagged as a custom value**, to be
applied as an arbitrary `leading-[1.1]` rather than snapped to the nearest
default, since snapping would visibly loosen the hero headline.

**Letter-spacing:** `-0.01em` (nav logo) and `-0.02em` (hero h1). Neither
matches a default Tailwind tracking token (`tracking-tight` is `-0.025em`).
**Flagged** — will use arbitrary values `tracking-[-0.01em]` /
`tracking-[-0.02em]` rather than snapping to `tracking-tight`, to preserve
the exact design values.

---

## 4. Distinct reusable components

Primitives (`src/components/ui/`):

- **Button** — 3 variants observed: filled accent (`bg-accent text-bg`), outline (`border-border`, hover→accent), text-link (accent color, opacity hover).
- **Tag/Badge** — mono pill, `bg-surface border-border rounded-lg`, used for tech stack, case-study tags, team skills, service timeframe.
- **Card** — `bg-surface border-border rounded-xl` base, used by featured-work teaser, case study, and service cards.
- **Container/Section** — `max-width` + horizontal padding wrapper, optionally with `border-top` divider between sections.

Layout (`src/components/layout/`):

- **Nav** — sticky, blurred-glass header: logo lockup (name + mono tagline), center link group, filled CTA button.
- **Footer** — logo/copyright column + social icon links row.

Sections (`src/components/sections/`):

- **Hero** — headline, subhead, tech-stack tag row, dual CTA (filled + outline), staggered fade-in-up on load.
- **FeaturedWorkStrip** *(not named in the Step 4 build order — see Decisions below)* — 3-up horizontal teaser row linking into `#work`, data-driven (`featured` list).
- **StatStrip** — 3-stat row (`shipped`, `years`, `hours`), animated count-up on scroll-into-view. Good `CountUp` (react-bits) candidate.
- **BeforeAfterCompare** *(not named in the Step 4 build order — see Decisions below)* — draggable before/after checklist comparison (mouse + touch), reveal-on-scroll. Bespoke interactive component; not a react-bits match.
- **CaseStudyGrid + CaseStudyCard** — reflows via `auto-fit`, any item count. Each card: category label, title, problem/solution pair, tag list, bulleted outcomes, "View Case Study" link.
- **ServicesSection + ServiceCard** — 3 fixed cards (MVP Sprint / Full Build / Embedded Team): name, description, bulleted list, timeframe pill.
- **TeamGrid + TeamCard** — reflows for 1–8+ members: photo placeholder, name, role, skill tags, profile link.
- **ContactCTA** — heading, filled CTA button, mono email link.

---

## 5. Inconsistencies & risks flagged (not silently fixed)

1. **No explicit per-breakpoint frames.** The source `.dc.html` is a single
   fluid layout — no media queries, no mobile/tablet/desktop artboard
   variants. It relies entirely on `flex-wrap`, `grid-template-columns:
   repeat(auto-fit, minmax(...))`, and one `clamp()` for the hero headline.
   The requested "layout structure for each breakpoint" therefore has to be
   **derived** from this fluid CSS rather than read off distinct frames.
   Doing that derivation surfaces two real problems below.

2. **Nav will not fit at 375px as literally coded.** The nav is
   `display:flex; justify-content:space-between` with **no wrap** on the
   outer row — only the link group itself wraps. At 375px width minus
   `48px` padding each side, there isn't room for the logo lockup + 4 nav
   links + filled CTA button on one line. The source design has no mobile
   nav treatment (no hamburger, no stacking). **This needs a decision before
   Step 4 (Nav):** either add a mobile menu (not in the source design) or
   collapse to a reduced nav on small screens. Will log the choice made in
   `DECISIONS.md` when the Nav component is built.

3. **CaseStudyCard grid overflows at 375px.** `grid-template-columns:
   repeat(auto-fit, minmax(320px, 1fr))` with `48px` side padding leaves
   only `279px` of content width at 375px viewport — less than the `320px`
   floor, which will force horizontal overflow/clipping rather than
   reflowing to a comfortable single column. `ServiceCard`'s `minmax(280px,
   1fr)` is borderline (`279px` available, `280px` required) — effectively
   the same problem by 1px. **Will reduce these `minmax` floors (or drop
   side padding on mobile) when building `CaseStudyGrid`/`ServicesSection`**
   and log the exact values chosen in `DECISIONS.md`.

4. **Two sections exist in the design that are not named in the Step 4
   build order:** a "Featured work" teaser strip (between Hero and
   StatStrip) and the "Before it ships / after it's production-ready"
   drag-to-compare section (between StatStrip and "Selected work"). The
   build order in the brief lists only Hero → StatStrip → CaseStudyGrid →
   ServicesSection → TeamGrid → ContactCTA. **Flagging rather than deciding
   unilaterally** — need explicit confirmation on whether to include
   `FeaturedWorkStrip` and `BeforeAfterCompare` in the build (see question
   below).

5. **Google Fonts weight 500 (both families) is loaded but never used** by
   any inline style in the source. Left as-is (not applying weight 500
   anywhere it wasn't specified); noted here in case it turns out to be a
   missed declaration rather than a preemptive load.

6. **Off-scale spacing:** nav `height:72px` and footer `max-height:120px`
   — see §2. Footer `max-height` in particular looks like an artboard-only
   constraint that shouldn't carry into a real, content-driven footer.

7. **Off-default typography values:** hero/logo `line-height:1.1` and
   letter-spacing `-0.01em`/`-0.02em` don't match Tailwind's default
   leading/tracking tokens — see §3. Will use arbitrary values to preserve
   exact design intent rather than snapping to nearest default.

8. Diagonal stripe placeholder pattern (`repeating-linear-gradient(135deg,
   #1c1c1f, #1c1c1f 10px, #151517 10px, #151517 20px)`) stands in for real
   imagery ("case study screenshot", "photo") in two places. This is
   explicitly a placeholder in the source design, not a final visual
   treatment — will keep it as the placeholder state for missing images in
   `data/`, not as permanent decoration.

---

## Resolved: extra sections (item 4)

**Decision: include both.** `FeaturedWorkStrip` and `BeforeAfterCompare`
are in scope, placed where they appear in the design (Hero → Featured →
StatStrip → Compare → CaseStudyGrid → ServicesSection → TeamGrid →
ContactCTA). Logged in `docs/DECISIONS.md`. This expands the Step 4
component list from six to eight sections; everything else in this spec is
handled as noted, with each affected component's specific choices logged to
`DECISIONS.md` as it's built.
