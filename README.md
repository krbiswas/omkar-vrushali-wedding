# Omkar & Vrushali — Wedding Invitation

A premium, interactive digital wedding invitation built for Omkar and Vrushali's wedding on **26 November 2026** in Koregaon.

Live site (once deployed): https://krbiswas.github.io/omkar-vrushali-wedding/

## Tech stack

- React 19 + TypeScript + Vite
- Framer Motion for animation
- Plain CSS with CSS Modules + a shared design-token system (`src/styles/tokens.css`)
- Lucide icons
- HTML Canvas for the scratch-to-reveal interaction
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

## Project structure

```
src/
  components/     UI sections (Intro cover, ScratchReveal, Countdown, Events, Gallery, Venue, etc.)
  data/wedding.ts Central content config — edit THIS file to update the invitation
  hooks/          useCountdown, useInView, usePrefersReducedMotion
  styles/         Design tokens + shared section styles
public/
  images/         Couple photos, gallery images, venue photo
  images/gallery/ Gallery photos (1.jpg, 2.jpg, ...)
  audio/          Background music file (optional)
```

## Updating wedding content

**Everything guests see is driven by `src/data/wedding.ts`.** You should not need to touch any component to update content.

### Names, date, venue
Edit the `couple` and `wedding` objects in `src/data/wedding.ts`.

- `wedding.date` — ISO date (`YYYY-MM-DD`) for the countdown and scratch-reveal.
- `wedding.defaultCeremonyTime` — 24h `HH:MM`. **Currently a placeholder (10:00 IST)** until the family confirms the muhurat time.
- `wedding.timezone` — IANA timezone (default `Asia/Kolkata`).
- `wedding.venue.fullAddress` / `mapUrl` — leave as `null` until the real address/map link is available; the UI shows "to be announced" and disables the directions button automatically.

### Couple photos
1. Drop image files into `public/images/` (or `public/images/gallery/` for gallery shots).
2. Reference them in `src/data/wedding.ts`:
   - `couple.photos.groomPortrait`, `couple.photos.bridePortrait` — solo portraits.
   - `couple.photos.couplePhoto` — featured photo shown in the Couple section.
3. Use web-sized images (compress/resize before adding — large files will slow down the site).

### Gallery
Add entries to the `gallery` array in `src/data/wedding.ts`:

```ts
{ id: "6", src: "/images/gallery/6.jpg", alt: "Description for accessibility", caption: "Optional caption" }
```

Missing images simply mean an empty gallery with a "photos coming soon" message — nothing breaks.

### Events / function schedule
Add entries to the `events` array in `src/data/wedding.ts`. Each event supports name, Marathi name, date, start/end time, venue, description, dress code, and an optional directions link. Leave the array empty to show a "schedule being finalized" placeholder (current state).

### Dress code
Add entries to the `dressCode` array (per-audience: Women / Men / All Guests), with optional color swatches.

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

- [ ] Full venue address (currently shows "Koregaon" with address pending)
- [ ] Exact ceremony/muhurat time (defaulted to 10:00 AM IST, clearly marked provisional in the UI)
- [ ] Full function schedule (Haldi/Mehendi/Sangeet/etc. dates & times)
- [ ] Solo couple portraits (groom/bride individual photos)
- [ ] Family names and contact details
- [ ] Dress code specifics
- [ ] Background music track (licensed)
- [ ] RSVP / contact phone or email
- [ ] Additional messages or multilingual content requirements

None of the above are fabricated in the code — each renders a clearly-labeled "coming soon" / pending state until real data is supplied in `src/data/wedding.ts`.

## Accessibility & UX notes

- The scratch-to-reveal interaction has a "Reveal invitation" button as a fully accessible alternative to scratching.
- `prefers-reduced-motion` is respected throughout (scroll reveals, zoom transitions, intro cover animation).
- Background music requires an explicit tap — no autoplay.
- Directions button is disabled (not hidden) until a real map link exists, so the layout stays stable.
