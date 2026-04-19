# Personal site rebuild — Vite + React

**Status:** Design approved in brainstorming; awaiting spec review gate.
**Date:** 2026-04-19
**Owner:** Haowen "John" Wei (hw2892@columbia.edu)
**Repository:** `haowenweijohn/haowenweijohn.github.io` (GitHub user site, serves at https://haowenweijohn.github.io)

## Goal

Rebuild the existing Jekyll (academicpages / Minimal Mistakes) personal website as a Vite + React + TypeScript single-page application. The rebuild is a **faithful visual port** of the current layout (left sidebar profile + main content column) using a modern stack. No content is lost; template/placeholder content from academicpages is dropped.

## Non-goals

- No redesign of visual language (no dark mode, no bold new palette, no magazine/portfolio layout).
- No blog, talks, teaching, or portfolio pages — all of those in the archive are academicpages stubs with no real content.
- No CMS, no server, no database. Pure static site.
- No pixel-perfect match of the old site — "faithful" means same structural feel and information hierarchy, not byte-for-byte CSS replication.

## Content scope

### Kept (real content from `archive/`)
- About page narrative (from `archive/_pages/about.md`): bio, research focus, interests, featured projects, recent news.
- 8 publications (from `archive/_publications/*.md`) with PDFs in `archive/files/publications/` and media in `archive/images/publications/`.
- 8 projects (from `archive/_pages/projects.md` + publication media).
- Music page with 6 YouTube performances (from `archive/_pages/music.md`).
- Profile images: `avatar.png`, `performance.png`, `in-vr.png`.
- CV PDF: `archive/files/HaowenJohnWei_CV.pdf`.

### Dropped (academicpages template stubs — no real content)
- `archive/_talks/` (4 placeholder files)
- `archive/_teaching/` (2 placeholder files)
- `archive/_portfolio/` (2 placeholder files)
- `archive/_posts/` (5 Lorem Ipsum files)
- The body of `archive/_pages/cv.md` (education/work sections are template placeholders; the real CV is the PDF)
- Sample PDFs: `paper1-3.pdf`, `slides1-3.pdf`
- Sample images: `500x300.png`, `foo-bar-*`, `image-alignment-*`, etc.

The `archive/` folder stays in the repo on `master` as a read-only reference. Nothing from it is served by the new site.

### Asset URL preservation

Images and files are copied from `archive/images/` and `archive/files/` into `public/images/` and `public/files/` at the same relative paths. This means URLs that worked on the old site (e.g. `/images/avatar.png`, `/files/HaowenJohnWei_CV.pdf`, `/files/publications/2024-01-11-PhysioLabXR.pdf`) continue to resolve on the new site — no broken external links.

## Navigation

Five items, matching the live site plus a new Publications page:

| Label        | Target                                   | Notes |
|--------------|------------------------------------------|-------|
| Home         | `/`                                      | About narrative + featured projects + news |
| Projects     | `/projects`                              | 8 project cards |
| Publications | `/publications`                          | 8 entries, chronological; new dedicated page |
| Music        | `/music`                                 | 6 YouTube embeds + narrative |
| CV           | `/files/HaowenJohnWei_CV.pdf` (external) | Direct PDF link, opens in new tab |

Same URL is preserved for the CV PDF so existing bookmarks keep working.

## Architecture

### Stack

- **Build:** Vite + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui (stone/slate neutral, light-only, one blue accent — `sky-600`)
- **Typography:** Inter for headings and body; Tailwind `@tailwindcss/typography` plugin for `prose` markdown regions
- **Routing:** React Router v7 with `BrowserRouter`
- **Markdown rendering:** `react-markdown` (for prose inside data files — About narrative, publication abstracts, news)
- **Content model:** TypeScript data files (no MDX, no markdown files, no CMS)
- **Deploy:** GitHub Actions → GitHub Pages (Pages source set to "GitHub Actions")

### Project structure

```
haowenweijohn.github.io/
├── archive/                          # untouched reference of old Jekyll site
├── docs/                             # design docs (this file)
├── public/
│   ├── images/                       # copied from archive/images/
│   │   ├── avatar.png
│   │   ├── performance.png
│   │   ├── in-vr.png
│   │   ├── publications/
│   │   └── projects/
│   └── files/
│       ├── HaowenJohnWei_CV.pdf
│       └── publications/
├── src/
│   ├── main.tsx
│   ├── App.tsx                       # routes
│   ├── index.css                     # Tailwind directives + theme tokens
│   ├── components/
│   │   ├── ui/                       # shadcn primitives (generated via CLI)
│   │   ├── layout/
│   │   │   ├── RootLayout.tsx        # sidebar + outlet shell
│   │   │   ├── Sidebar.tsx           # avatar, name, affiliation, socials, nav
│   │   │   └── MobileNav.tsx         # shadcn Sheet for small screens
│   │   ├── PublicationCard.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── NewsItem.tsx
│   │   ├── YouTubeEmbed.tsx
│   │   └── Markdown.tsx              # react-markdown wrapper with prose styling
│   ├── data/
│   │   ├── site.ts
│   │   ├── about.ts
│   │   ├── news.ts
│   │   ├── publications.ts
│   │   ├── projects.ts
│   │   └── music.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   ├── Publications.tsx
│   │   ├── Music.tsx
│   │   └── NotFound.tsx
│   └── lib/
│       └── cn.ts                     # shadcn classnames helper
├── .github/workflows/deploy.yml
├── .gitignore
├── components.json                   # shadcn config
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Page designs

### `/` Home
1. Hero: emoji-accented greeting; `performance.png` and `in-vr.png` floated to match current About page.
2. Education & research focus paragraph.
3. Research interests bullet list.
4. Other interests bullet list.
5. Featured Projects section: two cards rendered from `projects.ts` via slugs in `data/about.ts` (`featuredProjectSlugs`).
6. Recent News: chronological list rendered from `news.ts`.
7. Footer CTAs: "See all publications →" and "See all projects →".

### `/projects` Projects
- Responsive grid of 8 `ProjectCard` components.
- Columns: 2 on `lg+`, 1 on smaller screens.
- Card content: teaser image or GIF (16/9 `AspectRatio`), title, 1–2 line blurb, tag badges, action links (paper / video / code / demo).
- Order preserved from current site.

### `/publications` Publications
- Top: Google Scholar link + "`*` denotes equal contribution" note.
- Chronological list (newest first), one `PublicationCard` per entry.
- Each card: title (links to PDF or venue), authors with owner's name bolded and `*` rendered via markdown, venue + year, full abstract (2–4 sentences — short enough to show in full, no truncation), action chips (`PDF`, `Video`, `Code`, `Dataset`, `Slides`, `Venue`).
- No filter/sort — overkill for 8 entries.

### `/music` Music
- Narrative paragraph from `music.ts`.
- 6 YouTube embeds stacked vertically, each via `YouTubeEmbed` component (16/9 `AspectRatio`, iframe with `title` attribute).
- Each embed gets a title caption above it.

### CV
- Nav item only — no React route. Target: `/files/HaowenJohnWei_CV.pdf`, `target="_blank" rel="noopener"`.

### `*` NotFound
- Centered "404 — page not found" + link back to `/`.

## Data model

```ts
// src/data/site.ts
export const site = {
  name: 'Haowen "John" Wei',
  shortName: 'Haowen Wei',
  tagline: 'research wizard, game-making maestro, Chopin-obsessed pianist',
  affiliation: 'Martinos Center for Biomedical Imaging · Harvard Medical School / MGH',
  location: 'Boston, MA',
  avatar: '/images/avatar.png',
  socials: {
    email: 'hw2892@columbia.edu',
    github: 'https://github.com/HaowenWeiJohn',
    scholar: 'https://scholar.google.com/citations?user=phrai3MAAAAJ&hl=en',
    linkedin: 'https://www.linkedin.com/in/haowen-wei-7104bb1b1/',
  },
  nav: [
    { label: 'Home',         to: '/' },
    { label: 'Projects',     to: '/projects' },
    { label: 'Publications', to: '/publications' },
    { label: 'Music',        to: '/music' },
    { label: 'CV',           href: '/files/HaowenJohnWei_CV.pdf', external: true },
  ],
} as const
```

```ts
// src/data/publications.ts
export type Publication = {
  slug: string
  title: string
  authors: string              // markdown — supports ** for owner, * for equal contribution
  venue: string
  year: number
  date: string                 // ISO
  abstract: string             // 2–4 sentence summary (markdown)
  role?: string
  advisors?: string[]
  links?: {
    pdf?: string
    video?: string
    code?: string
    dataset?: string
    slides?: string
    external?: string
  }
  teaser?: string
}
```

```ts
// src/data/projects.ts
export type Project = {
  slug: string                 // matches publication slug where applicable
  title: string
  blurb: string
  tags: string[]
  media: { src: string; type: 'image' | 'gif' }
  links?: {
    publication?: string       // anchor like `/publications#<slug>`
    video?: string
    code?: string
    demo?: string
  }
}
```

```ts
// src/data/music.ts
export type MusicItem = {
  title: string
  context?: string
  youtubeId: string
}
```

```ts
// src/data/news.ts
export type NewsItem = {
  date: string                 // ISO
  emoji?: string
  text: string                 // markdown
}
```

```ts
// src/data/about.ts
export const aboutIntro: string              // markdown for hero + narrative
export const researchInterests: string[]
export const otherInterests: string[]
export const featuredProjectSlugs: string[]  // e.g. ['physiolabxr', 'indexpen']
```

## Styling & theming

- **Palette:** background `stone-50`, foreground `stone-900`, muted `stone-600`, border `stone-200`, accent `sky-600`.
- **Typography:** Inter everywhere; system monospace for code; `prose` class on markdown regions.
- **Layout grid (desktop, `lg+`):** fixed left sidebar `280px`, sticky full-height; main content column `max-w-2xl` → `max-w-3xl` depending on page, centered.
- **Below `lg`:** sidebar collapses; top bar with shadcn `Sheet` drawer for nav.
- **Motion:** minimal — `transition-colors` on links, subtle `hover:-translate-y-0.5` on cards. No page transitions.
- **Accessibility:** full keyboard nav via shadcn primitives; `alt` on images; `title` on YouTube iframes; AA contrast; semantic headings preserved in markdown output.

### shadcn/ui components used
`Avatar`, `Button`, `Card`, `Separator`, `NavigationMenu`, `Sheet`, `Badge`, `AspectRatio`, `ScrollArea`.

## Build & deploy

### Vite config

```ts
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: { outDir: 'dist' },
})
```

### GitHub Actions workflow

`.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push: { branches: [master] }
  workflow_dispatch:
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: true }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
      - run: cp dist/index.html dist/404.html
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### One-time repo settings change
- GitHub repo → Settings → Pages → **Source = GitHub Actions** (was "Deploy from a branch").

### Client-side routing on GitHub Pages
- `BrowserRouter` produces URLs like `/publications`. On GitHub Pages a hard refresh or direct hit on that path would 404 because there's no server routing.
- Workflow step `cp dist/index.html dist/404.html` addresses this: GitHub Pages serves `404.html` for any unknown path, which boots the SPA and lets React Router render the correct route.

### Local dev
- `npm run dev` — Vite dev server at `localhost:5173` with HMR.
- `npm run build && npm run preview` — production-identical smoke test.

## Open items

None — all decisions closed during brainstorming. Implementation plan will specify scaffolding commands, shadcn component generation, content migration steps, and verification steps.

## Success criteria

- All real content from `archive/` is reachable on the new site.
- CV PDF URL (`/files/HaowenJohnWei_CV.pdf`) continues to resolve.
- Site is navigable on desktop and mobile with keyboard and screen reader.
- Lighthouse: ≥ 95 on Performance, Accessibility, Best Practices, SEO on the home route.
- GitHub Actions workflow deploys on every push to `master`; deep links survive refresh.
- `archive/` folder is left intact in the repo.
