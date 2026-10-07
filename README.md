# CattleSense — Research Showcase Website

> Machine Learning Based Early Detection of Cattle Diseases  
> SLIIT · Faculty of Computing · R26-IT-045

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The site runs at **http://localhost:5173** by default.

---

## How to Edit Content

**All text content lives in one file:**

```
src/data/siteContent.js
```

Open it and fill in every field marked `"TODO"`. The UI renders these as amber "To be updated" chips until you fill them in.

Fields to update:
- Supervisor names, titles, departments, emails
- Team member emails, LinkedIn URLs, GitHub URLs
- Milestone dates, marks allocations, status (`"Completed"`, `"In progress"`, or `"Upcoming"`)
- Set `available: true` for documents/presentations once files are uploaded
- Group email (`contact.groupEmail`)

---

## File & Asset Locations

Place assets exactly at these paths (relative to `public/`):

### Logo
| Path | Purpose |
|------|---------|
| `public/assets/images/logo.png` | Main logo — shown in navbar and footer. Falls back to SVG wordmark if missing. |

### Module Images
| Path | Module |
|------|--------|
| `public/assets/images/modules/mastitis.png` | Mastitis scan frame |
| `public/assets/images/modules/fmd.png` | FMD scan frame |
| `public/assets/images/modules/lsd.png` | LSD scan frame |
| `public/assets/images/modules/milk-fever.png` | Milk Fever scan frame |
| `public/assets/images/architecture.png` | System architecture diagram (opens in lightbox) |

### Team Photos
| Path | Member |
|------|--------|
| `public/assets/images/team/it22153036.jpg` | Perera L. C. C. |
| `public/assets/images/team/it22129512.jpg` | Sudasinghe D. D. |
| `public/assets/images/team/it22282422.jpg` | Manathunga M. A. A. S. |
| `public/assets/images/team/it22221728.jpg` | Udawaththa M. P. A. M. |

> **Tip:** All team photos fall back to colorful initials monograms on teal/amber/leaf/rose gradients if the file is missing — so the page looks good before you add photos.

### Documents (put files here, then set `available: true` in siteContent.js)
| Path | Document |
|------|---------|
| `public/assets/documents/project-charter.pdf` | Project Charter |
| `public/assets/documents/proposal-documents.zip` | Proposal Documents |
| `public/assets/documents/checklist-documents.zip` | Checklist Documents |
| `public/assets/documents/final-reports.zip` | Final Reports |
| `public/assets/documents/research-paper.pdf` | Research Paper |

### Presentations
| Path | Presentation |
|------|-------------|
| `public/assets/documents/proposal-presentation.pdf` | Proposal Presentation |
| `public/assets/documents/progress-presentation-1.pdf` | Progress Presentation 1 |
| `public/assets/documents/progress-presentation-2.pdf` | Progress Presentation 2 |
| `public/assets/documents/final-presentation.pdf` | Final Presentation |

---

## Project Structure

```
src/
├── components/           # Reusable primitives
│   ├── Logo.jsx          # Logo with PNG/SVG fallback
│   ├── Navbar.jsx        # Sticky navbar, mobile menu, theme toggle
│   ├── Primitives.jsx    # Eyebrow, SectionTitle, Card, Chip, Button, TodoChip
│   ├── Reveal.jsx        # Scroll-reveal animation wrappers
│   ├── ScanFrame.jsx     # Image frame with scan line + Lightbox
│   └── StatReadout.jsx   # Animated arc and bar metric readouts
├── sections/             # Page sections (one file per section)
│   ├── HeroSection.jsx
│   ├── DomainSection.jsx
│   ├── ModulesSection.jsx
│   ├── MilestonesSection.jsx
│   ├── DocumentsSection.jsx   # Also exports PresentationsSection
│   ├── TeamSection.jsx
│   ├── ContactSection.jsx
│   └── Footer.jsx
├── hooks/
│   └── useAnimations.js  # useInView, useCountUp, useScrollProgress, useActiveSection, useTheme
├── data/
│   └── siteContent.js    # ← ALL EDITABLE CONTENT IS HERE
├── index.css             # Design tokens + Tailwind v4 CSS-first config
├── App.jsx               # Root component
└── main.jsx              # Entry point
public/
├── assets/
│   ├── images/           # Logo, module images, team photos, architecture
│   └── documents/        # PDFs and ZIPs
└── favicon.svg           # Leaf + pulse SVG favicon
```

---

## Design System

Design tokens are CSS custom properties in `src/index.css`. Change them there — no need to touch components.

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | `#F6F8F4` | `#071512` |
| `--surface` | `#FFFFFF` | `#0D201C` |
| `--primary` | `#0F766E` | `#2DD4BF` |
| `--leaf` | `#4D7C0F` | `#A3E635` |
| `--heat-1` | `#F59E0B` | `#FBBF24` |
| `--heat-2` | `#EF4444` | `#F87171` |

Theme toggle is in the navbar. User preference is stored in `localStorage` and respects `prefers-color-scheme`.

---

## Deploying to Vercel

### One-click deploy
1. Push to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
4. Click Deploy.

### Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

`vercel.json` is included in the project root with SPA routing configured.

---

## TODO Checklist

Fill in these fields in `siteContent.js` before the final presentation:

- [ ] Supervisor name, title, department, email
- [ ] Co-supervisor name, title, department, email
- [ ] All 4 member emails
- [ ] Member LinkedIn URLs (optional)
- [ ] Member GitHub URLs (optional)
- [ ] Group contact email
- [ ] 7 milestone dates, marks allocations, and statuses
- [ ] Set `available: true` for each document once uploaded
- [ ] Add team photos to `public/assets/images/team/`
- [ ] Add module screenshots to `public/assets/images/modules/`
- [ ] Add architecture diagram to `public/assets/images/architecture.png`
- [ ] Add logo to `public/assets/images/logo.png` (optional)
