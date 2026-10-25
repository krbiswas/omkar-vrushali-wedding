# Omkar & Vrushali — Wedding Invitation

A cinematic, scroll-driven digital wedding invitation built for Omkar and Vrushali's wedding on **26 November 2026** in Koregaon.

Live site: https://krbiswas.github.io/omkar-vrushali-wedding/

## Tech stack

- React 19 + TypeScript + Vite
- Framer Motion for simple reveal/fade animation
- **GSAP + ScrollTrigger** for scroll-scrubbed, pinned cinematic sequences (the photo story and parallax landscape chapters)
- Plain CSS with CSS Modules + a shared design-token system (`src/styles/tokens.css`)
- Lucide icons
- HTML Canvas for the scratch-to-reveal interaction (with a glitter-particle overlay canvas)
- GitHub Pages (static hosting) via GitHub Actions

## Local development

```bash
npm install
npm run dev
```

Build & type-check:

```bash
npm run build      # tsc -b && vite build
npx tsc -b         # type-check only
npm run preview    # preview the production build locally
```

## The visual journey (chapters)

1. **Cover** — `IntroCover` — ornate maroon-and-gold invitation card: garland strip, an original Ganesh motif, peacock corner accents, "Tap to open."
2. **Hero / scratch-reveal** — `HeroSection` + `ScratchReveal` — canvas scratch-to-reveal with a glitter trail, reveals "शुभविवाह", the couple's names, and the date in Devanagari, then zooms in.
3. **Mandala welcome** — `MandalaWelcome` — an understated "शुभ मंगल सावधान" scene (an earlier version used one large mandala centered behind the names — removed per feedback that it felt oversized; small slow-rotating corner mandalas now frame it instead).
4. **Photo story** — `PhotoStory` — a pinned, scroll-scrubbed cinematic sequence (GSAP ScrollTrigger `pin` + `scrub`) using the first three gallery photos: they enter from alternating edges, settle, recede, and hand off to the next, with the couple's names and a message emerging mid-sequence. Falls back to a simple static stacked layout under `prefers-reduced-motion`. There is no separate gallery grid — all photos live inside this narrative, the Koregaon banner, and the closing section.
5. **Koregaon banner** — `LandscapeScene` — the 4th gallery photo as the dominant visual (not an illustrated landscape), with a thin decorative tree-line and a small peacock accent, scroll-linked fade/scale reveal.
6. **Countdown** — `CountdownSection` / `Countdown` — ornamental panel, live D/H/M/S countdown.
7. **Functions timeline** — `EventTimeline` — alternating left/right panels connected by a gold spine; shows a Marathi/English placeholder until real functions are confirmed.
8. **Venue** — `VenueSection` — an illustrated arch frame around **Shivratna Mangal Karyalay**, the full Koregaon address, and a working "Get Directions" link.
9. **Closing** — `ClosingSection` — the 5th gallery photo in a circular frame, a completed mandala backdrop, closing blessing, WhatsApp share + copy-link.

A fixed `DecorativeSideBorder` (brass lamp, flower garland, paisley, peacock) frames both edges of the page on wide desktop viewports (≥1180px) to avoid empty side space; it's hidden below that width so it never causes mobile overflow.

All scroll animation respects `prefers-reduced-motion`: GSAP scrubbing/pinning is skipped entirely and a simpler static/fade layout is shown instead.

## Project structure

```
src/
  components/     Chapter components (IntroCover, ScratchReveal, MandalaWelcome, PhotoStory,
                   LandscapeScene, CountdownSection, EventTimeline, VenueSection, ClosingSection,
                   Navigation, DecorativeSideBorder, MusicPlayer) + shared pieces (PhotoFrame,
                   Motifs, MandalaMotif, Reveal)
  data/wedding.ts Central content config — edit THIS file to update the invitation
  hooks/          useCountdown, useInView, usePrefersReducedMotion
  utils/          asset() (base-path-safe public asset URLs), gsapSetup (GSAP/ScrollTrigger init)
  styles/         Design tokens + shared section styles
public/
  images/                 Couple photos, venue photo
  images/gallery/         Gallery + photo-story photos (1.jpg, 2.jpg, ...)
  audio/                  Background music file (optional)
```

## Updating wedding content

**Everything guests see is driven by `src/data/wedding.ts`.** You should not need to touch any component to update content.

### Names, date, venue
Edit the `couple` and `wedding` objects in `src/data/wedding.ts`.

- `wedding.date` — ISO date (`YYYY-MM-DD`) for the countdown and scratch-reveal.
- `wedding.referenceCeremonyTime` / `wedding.ceremonyTimeConfirmed` — the muhurat has **not** been confirmed. `referenceCeremonyTime` is only a placeholder so the countdown has something to count to; the UI always shows a "not yet confirmed" note while `ceremonyTimeConfirmed` is `false`. Once the family confirms the time, update `referenceCeremonyTime` and flip `ceremonyTimeConfirmed` to `true` to remove the disclaimer.
- `wedding.timezone` — IANA timezone (default `Asia/Kolkata`).
- `wedding.venue` — confirmed: **Shivratna Mangal Karyalay**, Satara Road Koregaon Road (Via Khed), Koregaon, Maharashtra 415501. `mapUrl` points to the Google Maps share link that was supplied; update both if the family provides a different one later.

### Couple photos — currently pending
No couple photographs have made it into the repository yet — pasting an image into chat does not give this project (or any Claude Code session) a way to save that image's actual file data to disk. **To add them**, save each file (e.g. right-click → Save Image As in the chat) to `public/images/gallery/` named `1.jpg` … `5.jpg`, then:
1. Reference them in the `gallery` array in `src/data/wedding.ts` — each entry needs `id`, `src`, `alt`, and optional `caption` (the array already has 5 entries pointing at `1.jpg`–`5.jpg`, so dropping the files in with those exact names requires no code change).
2. The first three entries drive the cinematic **Photo Story** chapter, the 4th is the Koregaon banner photo, and the 5th appears in the closing section.
3. Missing/broken images never show a broken-image icon — every photo slot (`PhotoFrame`) falls back to an illustrated placeholder automatically, so the site is fully presentable either way.
4. Use web-sized, compressed images — large files will slow down the site.

### Events / function schedule
Add entries to the `events` array in `src/data/wedding.ts`. Each event supports name, Marathi name, date, start/end time, venue, description, an optional per-event dress code, and an optional directions link. Leave the array empty to show the Marathi/English "details coming soon" placeholder (current state) instead of fabricated events.

### Audio
Place a licensed audio file at `public/audio/<name>.mp3` and set `music.src` in `wedding.ts` to `/audio/<name>.mp3`. Leave `music.src` as `null` to hide the music control entirely (default — no audio file is bundled).

### Marathi / English copy
All copy strings live in the `messages` object in `wedding.ts` — update directly there.

### RSVP / contact details
Populate `rsvp.contactName`, `contactPhone`, `contactEmail` once available — the closing section automatically shows an RSVP block when any of these are set.

## Redeploying

Any push to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages automatically. No manual steps needed after the initial setup.

To deploy manually:

```bash
npm run build
```

Then push to `main` — the GitHub Actions workflow handles the rest.

## Known limitations / outstanding details (as of this writing)

- [x] Venue name, full address, and Maps link — confirmed and implemented
- [ ] Exact ceremony/muhurat time (not fabricated — UI clearly marks the reference time as unconfirmed)
- [ ] Full function schedule (Haldi/Mehendi/Sangeet/etc. dates & times)
- [ ] Couple photographs — see "Couple photos — currently pending" above
- [ ] Family names and contact details
- [ ] Background music track (licensed)
- [ ] RSVP / contact phone or email
- [ ] Additional messages or multilingual content requirements

None of the above are fabricated in the code — each renders a clearly-labeled "coming soon" / pending state until real data is supplied in `src/data/wedding.ts`.

**Note:** The Dress Code feature (section, nav item, and standalone config) has been removed per request. A per-event `dressCode` string field still exists on `WeddingEvent` for noting a function-specific dress code inline, if ever useful.

## Accessibility & UX notes

- The scratch-to-reveal interaction has a "Reveal invitation" button as a fully accessible alternative to scratching.
- `prefers-reduced-motion` is respected throughout: the mandala draw-in, pinned photo story, landscape parallax, scroll reveals, zoom transitions, and intro cover animation all fall back to simpler static/fade presentations.
- Background music requires an explicit tap — no autoplay.
- Directions button is disabled (not hidden) until a real map link exists, so the layout stays stable.
- Every photo slot gracefully falls back to an illustrated placeholder instead of a broken-image icon.
