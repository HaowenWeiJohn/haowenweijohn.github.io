# Personal Site Rebuild (Vite + React) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `haowenweijohn.github.io` as a Vite + React + TypeScript single-page app — a faithful visual port of the current academicpages Jekyll layout — using Tailwind v4, shadcn/ui, React Router v7, and TypeScript data files for content. Deploys to GitHub Pages via GitHub Actions.

**Architecture:** Static SPA, no backend. Left-sidebar profile + main-content column layout. Content lives in typed TS data files (`src/data/*.ts`). Routing via React Router (declarative mode) with `BrowserRouter` + a `404.html` fallback for GitHub Pages. Existing `archive/` folder stays untouched as reference.

**Tech Stack:** Vite 6 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · React Router v7 · react-markdown + remark-gfm · lucide-react · Vitest (data integrity only)

**Source of truth for content:** `archive/_publications/*.md`, `archive/_pages/about.md`, `archive/_pages/music.md`, `archive/_pages/projects.md`. The plan includes the key bibliographic data verbatim; the engineer can open the archive files for reference as needed.

---

## File Structure

```
haowenweijohn.github.io/
├── archive/                              # existing — do not touch
├── docs/                                 # existing — design spec lives here
├── public/
│   ├── images/                           # copied from archive/images
│   └── files/                            # copied from archive/files
├── src/
│   ├── main.tsx                          # React bootstrap + BrowserRouter
│   ├── App.tsx                           # route definitions
│   ├── index.css                         # Tailwind import + CSS custom theme
│   ├── vite-env.d.ts
│   ├── components/
│   │   ├── ui/                           # shadcn primitives (generated)
│   │   ├── layout/
│   │   │   ├── RootLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── Markdown.tsx
│   │   ├── YouTubeEmbed.tsx
│   │   ├── PublicationCard.tsx
│   │   ├── ProjectCard.tsx
│   │   └── NewsItem.tsx
│   ├── data/
│   │   ├── site.ts
│   │   ├── about.ts
│   │   ├── news.ts
│   │   ├── publications.ts
│   │   ├── projects.ts
│   │   ├── music.ts
│   │   └── __tests__/data.test.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   ├── Publications.tsx
│   │   ├── Music.tsx
│   │   └── NotFound.tsx
│   └── lib/
│       └── utils.ts                      # shadcn `cn` helper
├── .github/workflows/deploy.yml
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── components.json                       # shadcn config
└── .gitignore                            # already present
```

**Tests:** Vitest runs `src/data/__tests__/data.test.ts` — slug uniqueness, ISO-date validity, featured-project-slug integrity, YouTube ID shape. No snapshot/rendering tests: visual verification happens via `npm run dev` and the build gate is `tsc --noEmit` + `vite build`.

---

### Task 1: Scaffold Vite + React + TypeScript

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`, `public/vite.svg`
- (Vite generates all of the above)

- [ ] **Step 1: Scaffold into the current directory**

Run from the repo root:

```bash
npm create vite@latest . -- --template react-ts
```

When prompted "Current directory is not empty. Please choose how to proceed:", choose **"Ignore files and continue"** — the existing `archive/`, `docs/`, `.git/`, and `.gitignore` must be preserved.

- [ ] **Step 2: Install base dependencies**

```bash
npm install
```

Expected: creates `node_modules/`, `package-lock.json` populated.

- [ ] **Step 3: Verify dev server boots**

```bash
npm run dev
```

Expected: "Local: http://localhost:5173/" and the default Vite + React boilerplate renders. Kill with `Ctrl+C`.

- [ ] **Step 4: Verify production build succeeds**

```bash
npm run build
```

Expected: writes `dist/` with no errors. Delete `dist/` afterward (it's gitignored anyway).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Scaffold Vite + React + TypeScript project"
```

---

### Task 2: Install and configure Tailwind CSS v4

**Files:**
- Modify: `vite.config.ts`, `src/index.css`
- Delete: `src/App.css` (Vite scaffold leaves this; we don't need it)

- [ ] **Step 1: Install Tailwind v4 Vite plugin**

```bash
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 2: Replace `vite.config.ts`**

File: `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
  },
})
```

- [ ] **Step 3: Replace `src/index.css`**

File: `src/index.css`

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;

  --color-background: #fafaf9;   /* stone-50 */
  --color-foreground: #1c1917;   /* stone-900 */
  --color-muted: #78716c;        /* stone-500 */
  --color-muted-foreground: #57534e; /* stone-600 */
  --color-border: #e7e5e4;       /* stone-200 */
  --color-card: #ffffff;
  --color-accent: #0284c7;       /* sky-600 */
  --color-accent-foreground: #ffffff;
}

html, body, #root {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

a {
  color: var(--color-accent);
}
a:hover { text-decoration: underline; }
```

- [ ] **Step 4: Delete `src/App.css` and remove its import**

```bash
rm src/App.css
```

Edit `src/App.tsx` — remove the `import './App.css'` line if present (we'll rewrite this file completely in a later task, but remove the dead import now so `npm run dev` stays clean).

- [ ] **Step 5: Add Inter font to `index.html`**

Inside `<head>` of `index.html`, add before the `</head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

- [ ] **Step 6: Verify**

```bash
npm run dev
```

Expected: dev server starts, default page renders, no CSS/JS console errors. Kill with `Ctrl+C`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Configure Tailwind CSS v4 with custom theme"
```

---

### Task 3: Install and configure shadcn/ui

**Files:**
- Create: `components.json`, `src/lib/utils.ts`, `src/components/ui/*` (generated)
- Modify: `tsconfig.json`, `tsconfig.app.json` (add path alias if not present)

- [ ] **Step 1: Update `tsconfig.json` path alias**

Open `tsconfig.json`. Ensure `compilerOptions` includes:

```json
"baseUrl": ".",
"paths": { "@/*": ["./src/*"] }
```

If Vite scaffold created `tsconfig.app.json`, mirror the same two entries in its `compilerOptions`.

- [ ] **Step 2: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

Answer the prompts:
- Which style? **New York**
- Which color? **Stone**
- CSS variables? **Yes**

Expected: writes `components.json`, creates `src/lib/utils.ts` with the `cn()` helper, and may add a few CSS variables to `src/index.css` — leave those additions alone.

- [ ] **Step 3: Generate the needed components**

```bash
npx shadcn@latest add avatar button card separator navigation-menu sheet badge aspect-ratio scroll-area
```

Expected: creates files under `src/components/ui/` — `avatar.tsx`, `button.tsx`, `card.tsx`, `separator.tsx`, `navigation-menu.tsx`, `sheet.tsx`, `badge.tsx`, `aspect-ratio.tsx`, `scroll-area.tsx`.

- [ ] **Step 4: Verify**

```bash
npm run build
```

Expected: builds cleanly. No TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Initialize shadcn/ui and generate UI primitives"
```

---

### Task 4: Install runtime dependencies

**Files:** modify only `package.json` / `package-lock.json`.

- [ ] **Step 1: Install app libraries**

```bash
npm install react-router react-markdown remark-gfm lucide-react
```

`react-router` v7 exports `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `Outlet`, `useLocation` — no separate `react-router-dom` needed in v7.

- [ ] **Step 2: Install Vitest for data tests**

```bash
npm install -D vitest
```

- [ ] **Step 3: Add `test` script to `package.json`**

In `package.json`, add under `"scripts"`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Install react-router, react-markdown, lucide-react, vitest"
```

---

### Task 5: Copy assets from archive to public

**Files:**
- Create: `public/images/**`, `public/files/**` (copied from `archive/`)

- [ ] **Step 1: Copy images — keep only files referenced by the new site**

From the repo root:

```bash
mkdir -p public/images/publications public/images/projects public/files/publications

# Profile + site images
cp archive/images/avatar.png           public/images/
cp archive/images/performance.png      public/images/
cp archive/images/in-vr.png            public/images/
cp archive/images/profile.png          public/images/
cp archive/images/site-logo.png        public/images/
cp archive/images/favicon.ico          public/images/

# Publication media
cp archive/images/publications/IndexPen-Demo.gif                           public/images/publications/
cp archive/images/publications/IndexPen-Cyber.png                          public/images/publications/
cp archive/images/publications/2022-07-07-IndexPen-Teaser.png              public/images/publications/
cp archive/images/publications/PhysioLabXR-fMRI-Demo.gif                   public/images/publications/
cp archive/images/publications/PhysioLabXR-CameraObjectDetection-Demo.gif  public/images/publications/
cp archive/images/publications/PhysioLabXR-UnityObjectDetection-Demo.gif   public/images/publications/
cp archive/images/publications/PhysioLabXR-Search-Demo.gif                 public/images/publications/
cp archive/images/publications/2024-01-11-PhysioLabXR-Teaser.png           public/images/publications/
cp archive/images/publications/VirtualVitality-Demo.gif                    public/images/publications/
cp archive/images/publications/VirtualVitality-SystemOverview.png          public/images/publications/
cp archive/images/publications/2024-08-15-VirtualVitality-Teaser.png       public/images/publications/
cp archive/images/publications/SwEYEpe-Demo.gif                            public/images/publications/
cp archive/images/publications/2022-12-29-Lidar-Teaser.png                 public/images/publications/
cp archive/images/publications/2022-10-14-Proximity-Teaser.png             public/images/publications/
cp archive/images/publications/2022-05-16-Interference-Teaser.png          public/images/publications/

# Project teasers (used by /projects page)
cp archive/images/projects/*.png public/images/projects/ 2>/dev/null || true
cp archive/images/projects/*.gif public/images/projects/ 2>/dev/null || true

# CV + publication PDFs
cp archive/files/HaowenJohnWei_CV.pdf                     public/files/
cp archive/files/publications/2022-05-16-Interference.pdf public/files/publications/
cp archive/files/publications/2022-07-07-IndexPen.pdf     public/files/publications/
cp archive/files/publications/2022-10-14-Proximity.pdf    public/files/publications/
cp archive/files/publications/2022-12-29-LiDAR.pdf        public/files/publications/
cp archive/files/publications/2024-01-11-PhysioLabXR.pdf  public/files/publications/

# Favicon — also copy to public root so Vite picks it up as /favicon.ico
cp archive/images/favicon.ico public/favicon.ico
```

- [ ] **Step 2: Copy root-level favicon-ish files if you want them served**

```bash
cp archive/images/manifest.json     public/images/ 2>/dev/null || true
cp archive/images/browserconfig.xml public/images/ 2>/dev/null || true
```

(Optional — these are Windows tile / web-app manifest assets. Skipping is fine.)

- [ ] **Step 3: Sanity check — the 3 critical assets resolve**

```bash
ls -la public/images/avatar.png public/files/HaowenJohnWei_CV.pdf public/images/publications/IndexPen-Demo.gif
```

Expected: all three exist.

- [ ] **Step 4: Commit**

```bash
git add public/
git commit -m "Copy content assets from archive/ to public/"
```

---

### Task 6: Write `src/data/site.ts`

**Files:**
- Create: `src/data/site.ts`

- [ ] **Step 1: Write file**

File: `src/data/site.ts`

```ts
export type NavItem =
  | { label: string; to: string; href?: undefined; external?: undefined }
  | { label: string; href: string; external: true; to?: undefined }

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
  ] as const satisfies readonly NavItem[],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/site.ts
git commit -m "Add site metadata and nav config"
```

---

### Task 7: Write `src/data/about.ts` and `src/data/news.ts`

**Files:**
- Create: `src/data/about.ts`, `src/data/news.ts`

- [ ] **Step 1: Write `src/data/about.ts`**

File: `src/data/about.ts`

```ts
export const aboutHero = `👋 Welcome! I'm a dynamic researcher 🧠, inventive game developer 🎮, and a passionate pianist 🎹 with an unwavering love for Chopin 🎼.

Check out my **[projects](/projects)** 🔬, **[publications](/publications)** 📝, and **[music](/music)** 🎵.`

export const aboutBody = `I completed a double major in Computer Science and Electrical & Computer Engineering (Mechanical Engineering minor) at Worcester Polytechnic Institute, where I was supervised by [Prof. Erin Solovey](https://users.wpi.edu/~esolovey/) and [Prof. Kaveh Pahlavan](https://en.wikipedia.org/wiki/Kaveh_Pahlavan). I earned my Master's degree in Computer Science at Columbia University under the guidance of [Prof. Steven K. Feiner](https://www.engineering.columbia.edu/faculty/steven-feiner), [Prof. Paul Sajda](https://www.bme.columbia.edu/faculty/paul-sajda), and [Prof. Kaveri Thakoor](https://www.vagelos.columbia.edu/profile/kaveri-thakoor-phd). My research focuses on multi-modal sensor fusion and Clinical AI.

I specialized in developing multimodal sensor fusion systems for virtual and augmented reality (VR/AR), integrating physiological data to study decision-making and navigation in real-world scenarios. My vision includes helping those with neurodegenerative disorders by designing BCIs that improve daily life, combining technology with a commitment to enhancing well-being. Currently, I am a Research Assistant at the Martinos Center for Biomedical Imaging, Harvard Medical School, where I am working on closed-loop neuro-stimulation.`

export const researchInterests: string[] = [
  'Sensor Fusion',
  'Embodied AI',
  'Computer Vision',
  'Wireless Sensing',
  'Virtual Reality (VR)',
  'Augmented Reality (AR)',
  'Neuroimaging (EEG, fNIRS, fMRI)',
  'Brain Stimulation (TMS, tDCS)',
  'Signal Processing',
  'Deep Learning, Machine Learning',
]

export const otherInterests: string[] = ['Piano', 'Soccer', 'Chess']

export const featuredProjectSlugs: readonly string[] = ['physiolabxr', 'indexpen']
```

- [ ] **Step 2: Write `src/data/news.ts`**

File: `src/data/news.ts`

```ts
export type NewsItem = {
  date: string   // ISO
  emoji?: string
  text: string   // markdown
}

export const news: NewsItem[] = [
  {
    date: '2024-09-06',
    emoji: '🏢',
    text: 'Began my new position as a **Research Assistant** at the **Martinos Center for Biomedical Imaging**, Harvard Medical School.',
  },
  {
    date: '2024-09-05',
    emoji: '📝',
    text: "Submitted a paper as a part of my Master's thesis to **CHI 2025**.",
  },
  {
    date: '2024-05-13',
    emoji: '🎓',
    text: 'Graduated from Columbia University with a Master of Science in Computer Science (Thesis Track).',
  },
  {
    date: '2024-05-01',
    emoji: '🥳',
    text: "Successfully defended my Master's thesis, *From Brain-Computer Interfaces to AI-Enhanced Diagnostics* ([paper](https://mice.cs.columbia.edu/getTechreport.php?techreportID=1673&format=pdf&)), under the supervision of [Steven K. Feiner](https://www.engineering.columbia.edu/faculty/steven-feiner), [Paul Sajda](https://www.bme.columbia.edu/faculty/paul-sajda), and [Kaveri Thakoor](https://www.vagelos.columbia.edu/profile/kaveri-thakoor-phd).",
  },
]
```

- [ ] **Step 3: Commit**

```bash
git add src/data/about.ts src/data/news.ts
git commit -m "Add about narrative and news data"
```

---

### Task 8: Write `src/data/publications.ts`

**Files:**
- Create: `src/data/publications.ts`

- [ ] **Step 1: Write file**

File: `src/data/publications.ts`

```ts
export type Publication = {
  slug: string
  title: string
  authors: string          // markdown: **bold** for owner, \* for equal contribution
  venue: string            // markdown — may contain a link
  year: number
  date: string             // ISO
  abstract: string
  role?: string
  advisors?: string[]
  awards?: string[]
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

export const publications: Publication[] = [
  {
    slug: 'glaucoma-vit',
    title: 'Interactively Assisting Glaucoma Diagnosis with an Expert Knowledge-distilled Vision Transformer',
    authors: 'Ziheng Li\\*, **Haowen Wei**\\*, Kuang Sun, David Li, Leyi Cui, Steven Feiner, Kaveri Thakoor',
    venue: '[CHI 2025 Late-Breaking Work](https://dl.acm.org/doi/10.1145/3706599.3719719)',
    year: 2025,
    date: '2024-08-14',
    abstract:
      'This project enhances glaucoma diagnosis using an expert knowledge-distilled Vision Transformer, providing AI-augmented insights to ophthalmologists. The system integrates deep learning with medical imaging to focus on key diagnostic features in retinal images, interactively highlighting areas of interest for improved diagnosis. Validated with a user study involving 15 ophthalmologists, the tool demonstrates the potential of AI in supporting clinical decision-making.',
    role: 'Project Lead, Lead Software Engineer, Experimenter, Co-First Author',
    advisors: ['Dr. Steven K. Feiner', 'Dr. Kaveri Thakoor'],
    links: {
      external: 'https://dl.acm.org/doi/10.1145/3706599.3719719',
      video: 'https://www.youtube.com/watch?v=1aznz690KXE',
    },
    teaser: '/images/publications/2024-08-15-VirtualVitality-Teaser.png',
  },
  {
    slug: 'sweyepe',
    title: 'Efficient Text-Entry in Mixed Reality: Tap, Gaze & Pinch, SwEYEpe',
    authors: '**Haowen Wei**\\*, Ziheng Li\\*, Xichen He, Ben Yang, Steven Feiner',
    venue: 'CHI 2025 Late-Breaking Work',
    year: 2025,
    date: '2023-12-04',
    abstract:
      'SwEYEpe reimagines text-entry in mixed reality (MR) environments by utilizing gaze paths instead of traditional finger swipes. The system combines tapping, gaze, pinching, and swiping into an intuitive experience: users enter text by looking at letters in sequence, mimicking mobile-keyboard swiping but with eye movements. A fixation-detection algorithm filters the gaze path, and a language model matches it to the most likely word candidates.',
    role: 'Project Lead, Lead Software Engineer, Experimenter',
    advisors: ['Dr. Steven K. Feiner'],
    teaser: '/images/publications/SwEYEpe-Demo.gif',
  },
  {
    slug: 'thesis',
    title: "Master's Thesis: From Brain–Computer Interfaces to AI-Enhanced Diagnostics — Developing Cutting-Edge Tools for Medical and Interactive Technologies",
    authors: '**Haowen Wei**, Steven K. Feiner, Paul Sajda, Kaveri Thakoor',
    venue: 'Columbia University',
    year: 2024,
    date: '2024-05-11',
    abstract:
      "My master's thesis advances brain-computer interfaces (BCI), human-computer interaction (HCI), and extended reality (XR) through three key projects. PhysioLabXR, an open-source Python platform, enables real-time multi-modal BCI/XR experiments. Interactively Assisting Glaucoma Diagnosis employs deep learning to support clinical decision-making. In Search for an Intuitive and Efficient Text-Entry in Mixed Reality (SwEYEpe) explores new text-entry methods in mixed reality. Together, these projects push the boundaries of HCI and BCI research.",
    advisors: ['Dr. Steven K. Feiner', 'Dr. Paul Sajda', 'Dr. Kaveri Thakoor'],
    links: {
      external: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=phrai3MAAAAJ&citation_for_view=phrai3MAAAAJ:Y0pCki6q_DkC',
      pdf: 'https://mice.cs.columbia.edu/getTechreport.php?techreportID=1673&format=pdf&',
    },
  },
  {
    slug: 'physiolabxr',
    title: 'PhysioLabXR: A Software Platform for Real-Time Multi-Modal Brain-Computer Interfaces and Extended Reality Experiments',
    authors: 'Ziheng Li\\*, **Haowen Wei**\\*, Ziwen Xie, Yunxiang Peng, June Pyo Suh, Steven Feiner, Paul Sajda',
    venue: '[Journal of Open Source Software, Sept 2023](https://joss.theoj.org/papers/10.21105/joss.05854)',
    year: 2023,
    date: '2024-09-11',
    abstract:
      'PhysioLabXR is a Python-based open-source software platform for neuroscience and HCI experiments, enabling real-time multi-modal physiological data processing. It supports EEG, fNIRS, and eye trackers with multi-stream visualization, real-time DSP, and experiment recording. Native support for Lab Streaming Layer (LSL) and ZeroMQ (ZMQ) makes integrating experimental pipelines seamless.',
    role: 'Co-Founder, Lead Software Engineer, Co-First Author',
    advisors: ['Dr. Steven K. Feiner', 'Dr. Paul Sajda'],
    links: {
      pdf: '/files/publications/2024-01-11-PhysioLabXR.pdf',
      code: 'https://github.com/PhysioLabXR/PhysioLabXR-Community',
      video: 'https://www.youtube.com/watch?v=IJpYk-y0O2g',
      external: 'https://joss.theoj.org/papers/10.21105/joss.05854',
    },
    teaser: '/images/publications/2024-01-11-PhysioLabXR-Teaser.png',
  },
  {
    slug: 'lidar-mos',
    title: 'Real-Time LiDAR Point-Cloud Moving Object Segmentation for Autonomous Driving',
    authors: 'Xing Xie, **Haowen Wei**, Yongjie Yang',
    venue: '[Sensors 23(1), 2023: 547](https://www.mdpi.com/1424-8220/23/1/547)',
    year: 2023,
    date: '2022-12-29',
    abstract:
      'We propose a lightweight CNN architecture for LiDAR point-cloud moving object segmentation targeting real-time autonomous driving. The network reduces computational burden with 66% fewer parameters than the state-of-the-art and achieves real-time processing speeds on GPU and FPGA. Our system achieves 51.3% IoU on SemanticKITTI and meets autonomous-vehicle real-time requirements with 32 fps on FPGA.',
    role: 'Lead Software Engineer',
    links: {
      pdf: '/files/publications/2022-12-29-LiDAR.pdf',
      dataset: 'https://www.semantic-kitti.org/',
      external: 'https://www.mdpi.com/1424-8220/23/1/547',
    },
    teaser: '/images/publications/2022-12-29-Lidar-Teaser.png',
  },
  {
    slug: 'proximity',
    title: 'Proximity Detection During Epidemics: Direct UWB TOA Versus Machine Learning Based RSSI',
    authors: 'Zhuoran Su, Kaveh Pahlavan, Emmanuel Agu, **Haowen Wei**',
    venue: '[International Journal of Wireless Information Networks 29(4), 2022](https://link.springer.com/article/10.1007/s10776-022-00577-4)',
    year: 2022,
    date: '2022-10-14',
    abstract:
      'This study compares proximity-detection performance of UWB TOA and machine-learning-based BLE RSSI during epidemics. UWB TOA achieves slightly higher accuracy with less computational complexity; BLE RSSI requires extensive training for similar results. We evaluate both technologies in LOS and OLOS environments and across postures to assess robustness for social-distancing applications.',
    role: 'Software Engineer',
    advisors: ['Dr. Kaveh Pahlavan', 'Dr. Emmanuel Agu'],
    links: {
      pdf: '/files/publications/2022-10-14-Proximity.pdf',
      external: 'https://link.springer.com/article/10.1007/s10776-022-00577-4',
    },
    teaser: '/images/publications/2022-10-14-Proximity-Teaser.png',
  },
  {
    slug: 'indexpen',
    title: 'IndexPen: Two-Finger Text Input with Millimeter-Wave Radar',
    authors: '**Haowen Wei**\\*, Ziheng Li\\*, Alexander D. Galvan, Zhuoran Su, Xiao Zhang, Kaveh Pahlavan, Erin T. Solovey',
    venue: '[Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies 6(2), 2022](https://dl.acm.org/doi/10.1145/3534601)',
    year: 2022,
    date: '2023-07-07',
    abstract:
      'IndexPen introduces a novel interaction technique for touch-free text input using two-finger in-air micro-gestures. It uses mmWave radar to recognize 30 distinct gestures (A-Z, Space, Backspace, Enter) plus a noise class. Over a 10-day study with five participants the system achieved 95.89% cross-validation accuracy across 31 classes; in a follow-up with 16 new participants, sentence-typing accuracy reached 86.2%.',
    role: 'Project Lead, Lead Software Engineer, First Author',
    advisors: ['Dr. Erin Solovey', 'Dr. Kaveh Pahlavan'],
    awards: ['2022 Best Undergraduate Major Qualifying Project at WPI, 3rd Place'],
    links: {
      pdf: '/files/publications/2022-07-07-IndexPen.pdf',
      video: 'https://www.youtube.com/watch?v=k_DA7Dgi5KY',
      dataset: 'https://www.kaggle.com/datasets/haowenjohnwei/indexpen-user-study',
      external: 'https://dl.acm.org/doi/10.1145/3534601',
    },
    teaser: '/images/publications/2022-07-07-IndexPen-Teaser.png',
  },
  {
    slug: 'mmwave-interference',
    title: 'A Study of Interference Analysis Between mmWave Radars and IEEE 802.11 AD at 60 GHz Bands',
    authors: 'Shiyu Cheng, Kaveh Pahlavan, **Haowen Wei**, Zhuoran Su, Seyed Reza Zekavat, Ali Abedi',
    venue: '[International Journal of Wireless Information Networks 29(3), 2022](https://link.springer.com/article/10.1007/s10776-022-00564-9)',
    year: 2022,
    date: '2022-09-15',
    abstract:
      'This study presents an empirical analysis of mutual interference between IEEE 802.11ad communication and mmWave radar in the 60 GHz band. It examines impact on radar coverage and precision and models the effect on packet-loss rates in wireless communication, providing practical insight into coexistence design.',
    role: 'Lead Software Engineer',
    advisors: ['Dr. Kaveh Pahlavan', 'Dr. Seyed Zekavat'],
    links: {
      pdf: '/files/publications/2022-05-16-Interference.pdf',
      external: 'https://link.springer.com/article/10.1007/s10776-022-00564-9',
    },
    teaser: '/images/publications/2022-05-16-Interference-Teaser.png',
  },
]
```

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/publications.ts
git commit -m "Add publications data (8 entries)"
```

---

### Task 9: Write `src/data/projects.ts`

**Files:**
- Create: `src/data/projects.ts`

- [ ] **Step 1: Write file**

File: `src/data/projects.ts`

```ts
export type Project = {
  slug: string            // matches publication slug where applicable
  title: string
  blurb: string
  tags: string[]
  media: { src: string; alt: string }
  links?: {
    publication?: string  // e.g. "/publications#indexpen"
    video?: string
    code?: string
    demo?: string
    paper?: string
  }
}

export const projects: Project[] = [
  {
    slug: 'indexpen',
    title: 'IndexPen',
    blurb: 'Two-finger in-air text input via millimeter-wave radar — 30 gestures, 95.89% accuracy.',
    tags: ['mmWave', 'Gesture', 'HCI', 'Deep Learning'],
    media: { src: '/images/publications/IndexPen-Demo.gif', alt: 'IndexPen demo' },
    links: {
      publication: '/publications#indexpen',
      video: 'https://www.youtube.com/watch?v=k_DA7Dgi5KY',
      paper: '/files/publications/2022-07-07-IndexPen.pdf',
    },
  },
  {
    slug: 'physiolabxr',
    title: 'PhysioLabXR',
    blurb: 'Open-source Python platform for real-time multi-modal BCI and XR experiments — EEG, fNIRS, eye tracking, LSL.',
    tags: ['BCI', 'XR', 'Open Source', 'Python'],
    media: { src: '/images/publications/PhysioLabXR-fMRI-Demo.gif', alt: 'PhysioLabXR demo' },
    links: {
      publication: '/publications#physiolabxr',
      code: 'https://github.com/PhysioLabXR/PhysioLabXR-Community',
      video: 'https://www.youtube.com/watch?v=IJpYk-y0O2g',
    },
  },
  {
    slug: 'glaucoma-vit',
    title: 'Glaucoma Diagnosis with Expert Knowledge-Distilled Vision Transformer',
    blurb: 'AI-augmented diagnostic tool for glaucoma, validated with 15 ophthalmologists.',
    tags: ['Vision', 'Clinical AI', 'User Study'],
    media: { src: '/images/publications/VirtualVitality-Demo.gif', alt: 'Glaucoma diagnosis demo' },
    links: {
      publication: '/publications#glaucoma-vit',
      video: 'https://www.youtube.com/watch?v=1aznz690KXE',
    },
  },
  {
    slug: 'sweyepe',
    title: 'SwEYEpe — Efficient Text-Entry in Mixed Reality',
    blurb: 'Multi-modal text entry in MR using tap, gaze, and pinch — gaze-path swipe with language-model matching.',
    tags: ['XR', 'Eye Tracking', 'HCI'],
    media: { src: '/images/publications/SwEYEpe-Demo.gif', alt: 'SwEYEpe demo' },
    links: {
      publication: '/publications#sweyepe',
    },
  },
  {
    slug: 'lidar-mos',
    title: 'Real-Time LiDAR Point-Cloud Moving Object Segmentation',
    blurb: 'Lightweight CNN with 66% fewer parameters than SOTA, 32 fps on FPGA, 51.3% IoU on SemanticKITTI.',
    tags: ['LiDAR', 'Segmentation', 'Autonomous Driving', 'FPGA'],
    media: { src: '/images/publications/2022-12-29-Lidar-Teaser.png', alt: 'LiDAR segmentation teaser' },
    links: {
      publication: '/publications#lidar-mos',
      paper: '/files/publications/2022-12-29-LiDAR.pdf',
    },
  },
  {
    slug: 'proximity',
    title: 'Proximity Detection During Epidemics',
    blurb: 'UWB TOA vs ML-enhanced BLE RSSI — accuracy, complexity, and robustness in LOS/OLOS scenarios.',
    tags: ['UWB', 'BLE', 'Wireless Sensing'],
    media: { src: '/images/publications/2022-10-14-Proximity-Teaser.png', alt: 'Proximity detection teaser' },
    links: {
      publication: '/publications#proximity',
      paper: '/files/publications/2022-10-14-Proximity.pdf',
    },
  },
  {
    slug: 'mmwave-interference',
    title: 'mmWave Radar × IEEE 802.11ad Interference Analysis',
    blurb: 'Empirical study of 60 GHz mutual interference between radar and Wi-Fi — coverage, precision, packet loss.',
    tags: ['mmWave', 'Wi-Fi', 'RF'],
    media: { src: '/images/publications/2022-05-16-Interference-Teaser.png', alt: 'mmWave interference teaser' },
    links: {
      publication: '/publications#mmwave-interference',
      paper: '/files/publications/2022-05-16-Interference.pdf',
    },
  },
]
```

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "Add projects data (7 entries)"
```

---

### Task 10: Write `src/data/music.ts`

**Files:**
- Create: `src/data/music.ts`

- [ ] **Step 1: Write file**

File: `src/data/music.ts`

```ts
export type MusicItem = {
  title: string
  context?: string
  youtubeId: string
}

export const musicIntro = `Music has always been a meaningful part of my life. 🎼 I'm especially passionate about the piano — it's where I feel most at home. 🎹 To me, music is a universal language, capable of expressing emotions and ideas that words sometimes can't.

During college I made it a tradition to perform once a year. Each performance helped me grow as both a musician and a person, deepening my love for the art. One composer who has had a lasting influence on me is Frédéric Chopin — his music, filled with emotion and technical beauty, speaks to me in a way that's hard to put into words.

I hope you enjoy listening. 🎧`

export const music: MusicItem[] = [
  { title: 'Chopin — "Revolutionary" Etude, Op. 10 No. 12',                                 youtubeId: 'XgsGGEtzoWQ' },
  { title: 'Chopin — Waltz in C-sharp minor, Op. 64 No. 2 (Veronica Yen version reference)', youtubeId: 'Mwau3yRSbIQ' },
  { title: 'Sonatina — age 9 (2010)',                                                         youtubeId: 'v_5i2BeGnDY' },
  { title: 'Chopin — Waltz in C-sharp minor, Op. 64 No. 2', context: 'WPI Alden Memorial, Spring 2019', youtubeId: 'gASYh_7J4hM' },
  { title: 'Live Improvised Piano', context: 'Restaurant in Manhattan, NY',                  youtubeId: 'bMFZHyg114E' },
  { title: 'Pachelbel — Canon in D Major',                                                   youtubeId: '6SSijmVIiQo' },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/music.ts
git commit -m "Add music data (6 YouTube performances)"
```

---

### Task 11: Data integrity tests

**Files:**
- Create: `src/data/__tests__/data.test.ts`

- [ ] **Step 1: Write failing test file**

File: `src/data/__tests__/data.test.ts`

```ts
import { describe, it, expect } from 'vitest'
import { publications } from '../publications'
import { projects } from '../projects'
import { music } from '../music'
import { featuredProjectSlugs } from '../about'

describe('publications', () => {
  it('has unique slugs', () => {
    const slugs = publications.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('has valid ISO dates', () => {
    for (const p of publications) {
      expect(Number.isNaN(new Date(p.date).getTime())).toBe(false)
    }
  })

  it('year matches date year (or is the publication year for paper released later)', () => {
    // Each publication's year must be >= the year extracted from date
    for (const p of publications) {
      const dateYear = new Date(p.date).getUTCFullYear()
      expect(p.year).toBeGreaterThanOrEqual(dateYear - 1) // allow 1-year drift
    }
  })
})

describe('projects', () => {
  it('has unique slugs', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

describe('featured projects', () => {
  it('references real project slugs', () => {
    const projectSlugs = new Set(projects.map((p) => p.slug))
    for (const slug of featuredProjectSlugs) {
      expect(projectSlugs.has(slug)).toBe(true)
    }
  })
})

describe('music', () => {
  it('has YouTube IDs of expected length (11 chars, URL-safe)', () => {
    const idPattern = /^[a-zA-Z0-9_-]{11}$/
    for (const m of music) {
      expect(m.youtubeId).toMatch(idPattern)
    }
  })
})
```

- [ ] **Step 2: Run tests — they should pass on first try because data was already written**

```bash
npm test
```

Expected: all green. If any test fails, fix the offending data (not the test) — the assertion is the contract.

- [ ] **Step 3: Commit**

```bash
git add src/data/__tests__/data.test.ts
git commit -m "Add data integrity tests"
```

---

### Task 12: Write `src/components/Markdown.tsx`

**Files:**
- Create: `src/components/Markdown.tsx`

- [ ] **Step 1: Write file**

File: `src/components/Markdown.tsx`

```tsx
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

type Props = {
  children: string
  className?: string
  inline?: boolean   // render without block-level wrappers for 1-line contexts
}

const blockComponents: Components = {
  a: ({ href, children }) => {
    const isExternal = /^https?:\/\//.test(href ?? '')
    return (
      <a
        href={href}
        className="text-[var(--color-accent)] underline-offset-2 hover:underline"
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  },
}

const inlineComponents: Components = {
  ...blockComponents,
  p: ({ children }) => <>{children}</>,
}

export function Markdown({ children, className, inline = false }: Props) {
  const rendered = (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={inline ? inlineComponents : blockComponents}
    >
      {children}
    </ReactMarkdown>
  )

  if (inline) {
    // Use a span so callers can embed markdown inside span/p/li contexts
    // without producing invalid <div>-inside-inline HTML.
    return <span className={className}>{rendered}</span>
  }

  return (
    <div
      className={cn(
        'prose prose-stone max-w-none',
        'prose-p:leading-relaxed prose-p:my-3',
        'prose-li:my-1',
        'prose-headings:font-semibold',
        className,
      )}
    >
      {rendered}
    </div>
  )
}
```

- [ ] **Step 2: Install Tailwind typography plugin (used by `prose` classes)**

```bash
npm install -D @tailwindcss/typography
```

- [ ] **Step 3: Register plugin in `src/index.css`**

Append to `src/index.css`:

```css
@plugin "@tailwindcss/typography";
```

- [ ] **Step 4: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add Markdown component with react-markdown + prose styling"
```

---

### Task 13: Write `src/components/YouTubeEmbed.tsx`

**Files:**
- Create: `src/components/YouTubeEmbed.tsx`

- [ ] **Step 1: Write file**

File: `src/components/YouTubeEmbed.tsx`

```tsx
import { AspectRatio } from '@/components/ui/aspect-ratio'

type Props = {
  id: string       // YouTube video id (11 chars)
  title: string    // used for iframe title attribute (a11y)
}

export function YouTubeEmbed({ id, title }: Props) {
  return (
    <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-black">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
        loading="lazy"
      />
    </AspectRatio>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/YouTubeEmbed.tsx
git commit -m "Add YouTubeEmbed component"
```

---

### Task 14: Write card components (`PublicationCard`, `ProjectCard`, `NewsItem`)

**Files:**
- Create: `src/components/PublicationCard.tsx`, `src/components/ProjectCard.tsx`, `src/components/NewsItem.tsx`

- [ ] **Step 1: Write `src/components/PublicationCard.tsx`**

File: `src/components/PublicationCard.tsx`

```tsx
import { ExternalLink, FileText, Github, Video, Database, Presentation } from 'lucide-react'
import type { Publication } from '@/data/publications'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Markdown } from '@/components/Markdown'

type Props = { pub: Publication }

const linkButtons: Array<{
  key: keyof NonNullable<Publication['links']>
  label: string
  Icon: typeof FileText
}> = [
  { key: 'pdf',      label: 'PDF',     Icon: FileText },
  { key: 'video',    label: 'Video',   Icon: Video },
  { key: 'code',     label: 'Code',    Icon: Github },
  { key: 'dataset',  label: 'Dataset', Icon: Database },
  { key: 'slides',   label: 'Slides',  Icon: Presentation },
  { key: 'external', label: 'Venue',   Icon: ExternalLink },
]

export function PublicationCard({ pub }: Props) {
  return (
    <article id={pub.slug} className="scroll-mt-24 py-6 first:pt-0 border-b border-[var(--color-border)] last:border-b-0">
      <header className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold leading-snug text-[var(--color-foreground)]">
          {pub.links?.pdf || pub.links?.external ? (
            <a
              href={pub.links.pdf ?? pub.links.external}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {pub.title}
            </a>
          ) : (
            pub.title
          )}
        </h3>
        <Badge variant="secondary" className="shrink-0">{pub.year}</Badge>
      </header>

      <div className="mt-1 text-sm text-[var(--color-muted-foreground)]">
        <Markdown inline>{pub.authors}</Markdown>
      </div>
      <div className="mt-0.5 text-sm italic text-[var(--color-muted-foreground)]">
        <Markdown inline>{pub.venue}</Markdown>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[var(--color-foreground)]/90">{pub.abstract}</p>

      {pub.links && (
        <div className="mt-3 flex flex-wrap gap-2">
          {linkButtons.map(({ key, label, Icon }) => {
            const href = pub.links?.[key]
            if (!href) return null
            return (
              <Button
                key={key}
                asChild
                variant="outline"
                size="sm"
                className="h-7 gap-1 text-xs"
              >
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {label}
                </a>
              </Button>
            )
          })}
        </div>
      )}
    </article>
  )
}
```

- [ ] **Step 2: Write `src/components/ProjectCard.tsx`**

File: `src/components/ProjectCard.tsx`

```tsx
import { Link } from 'react-router'
import { ExternalLink, Github, Video, FileText } from 'lucide-react'
import type { Project } from '@/data/projects'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'

type Props = { project: Project }

export function ProjectCard({ project }: Props) {
  return (
    <Card className="overflow-hidden transition-transform hover:-translate-y-0.5 hover:shadow-md">
      <AspectRatio ratio={16 / 9} className="overflow-hidden bg-[var(--color-border)]">
        <img
          src={project.media.src}
          alt={project.media.alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </AspectRatio>

      <CardContent className="pt-4">
        <h3 className="text-base font-semibold leading-snug text-[var(--color-foreground)]">
          {project.links?.publication ? (
            <Link to={project.links.publication} className="hover:underline">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>
        <p className="mt-1.5 text-sm text-[var(--color-muted-foreground)]">{project.blurb}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal">{tag}</Badge>
          ))}
        </div>
      </CardContent>

      {project.links && (
        <CardFooter className="flex flex-wrap gap-3 pt-0 text-xs text-[var(--color-muted-foreground)]">
          {project.links.paper && (
            <a href={project.links.paper} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[var(--color-accent)]">
              <FileText className="h-3.5 w-3.5" aria-hidden /> Paper
            </a>
          )}
          {project.links.video && (
            <a href={project.links.video} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[var(--color-accent)]">
              <Video className="h-3.5 w-3.5" aria-hidden /> Video
            </a>
          )}
          {project.links.code && (
            <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[var(--color-accent)]">
              <Github className="h-3.5 w-3.5" aria-hidden /> Code
            </a>
          )}
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[var(--color-accent)]">
              <ExternalLink className="h-3.5 w-3.5" aria-hidden /> Demo
            </a>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
```

- [ ] **Step 3: Write `src/components/NewsItem.tsx`**

File: `src/components/NewsItem.tsx`

```tsx
import type { NewsItem as NewsItemT } from '@/data/news'
import { Markdown } from '@/components/Markdown'

type Props = { item: NewsItemT }

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export function NewsItem({ item }: Props) {
  return (
    <li className="flex gap-3 py-2 text-sm">
      <span className="shrink-0 text-[var(--color-muted-foreground)] tabular-nums">
        {formatter.format(new Date(item.date))}
      </span>
      <span className="text-[var(--color-foreground)]/90">
        {item.emoji && <span className="mr-1" aria-hidden>{item.emoji}</span>}
        <Markdown inline>{item.text}</Markdown>
      </span>
    </li>
  )
}
```

- [ ] **Step 4: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/PublicationCard.tsx src/components/ProjectCard.tsx src/components/NewsItem.tsx
git commit -m "Add PublicationCard, ProjectCard, NewsItem components"
```

---

### Task 15: Write layout components (`Sidebar`, `MobileNav`, `RootLayout`)

**Files:**
- Create: `src/components/layout/Sidebar.tsx`, `src/components/layout/MobileNav.tsx`, `src/components/layout/RootLayout.tsx`

- [ ] **Step 1: Write `src/components/layout/Sidebar.tsx`**

File: `src/components/layout/Sidebar.tsx`

```tsx
import { NavLink } from 'react-router'
import { Mail, Github, Linkedin, GraduationCap } from 'lucide-react'
import { site } from '@/data/site'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

export function Sidebar() {
  return (
    <aside className="flex h-full flex-col gap-5 border-r border-[var(--color-border)] bg-[var(--color-card)] p-6">
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-28 w-28 ring-2 ring-[var(--color-border)]">
          <AvatarImage src={site.avatar} alt={site.name} />
          <AvatarFallback>HW</AvatarFallback>
        </Avatar>
        <h1 className="mt-3 text-lg font-semibold leading-tight text-[var(--color-foreground)]">
          {site.name}
        </h1>
        <p className="mt-1 text-xs italic text-[var(--color-muted-foreground)]">
          {site.tagline}
        </p>
        <p className="mt-3 text-xs text-[var(--color-muted-foreground)]">
          {site.affiliation}
        </p>
        <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">
          {site.location}
        </p>
      </div>

      <div className="flex justify-center gap-3 text-[var(--color-muted-foreground)]">
        <a href={`mailto:${site.socials.email}`} aria-label="Email" className="hover:text-[var(--color-accent)]">
          <Mail className="h-5 w-5" />
        </a>
        <a href={site.socials.scholar} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar" className="hover:text-[var(--color-accent)]">
          <GraduationCap className="h-5 w-5" />
        </a>
        <a href={site.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[var(--color-accent)]">
          <Github className="h-5 w-5" />
        </a>
        <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[var(--color-accent)]">
          <Linkedin className="h-5 w-5" />
        </a>
      </div>

      <nav className="mt-2 flex flex-col gap-0.5 text-sm">
        {site.nav.map((item) =>
          'href' in item && item.href ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-2 text-[var(--color-foreground)]/80 hover:bg-[var(--color-border)]/40 hover:text-[var(--color-accent)]"
            >
              {item.label}
            </a>
          ) : (
            <NavLink
              key={item.label}
              to={item.to!}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-[var(--color-foreground)]/80 hover:bg-[var(--color-border)]/40 hover:text-[var(--color-accent)]',
                  isActive && 'bg-[var(--color-border)]/60 font-medium text-[var(--color-accent)]',
                )
              }
            >
              {item.label}
            </NavLink>
          ),
        )}
      </nav>
    </aside>
  )
}
```

- [ ] **Step 2: Write `src/components/layout/MobileNav.tsx`**

File: `src/components/layout/MobileNav.tsx`

```tsx
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { NavLink, Link } from 'react-router'
import { site } from '@/data/site'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 lg:hidden">
      <Link to="/" className="text-sm font-semibold text-[var(--color-foreground)]">
        {site.shortName}
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72">
          <SheetHeader>
            <SheetTitle>{site.shortName}</SheetTitle>
          </SheetHeader>
          <nav className="mt-4 flex flex-col gap-1 text-sm">
            {site.nav.map((item) =>
              'href' in item && item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md px-3 py-2 text-[var(--color-foreground)]/80 hover:bg-[var(--color-border)]/40"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to!}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-md px-3 py-2 text-[var(--color-foreground)]/80 hover:bg-[var(--color-border)]/40',
                      isActive && 'bg-[var(--color-border)]/60 font-medium text-[var(--color-accent)]',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
```

- [ ] **Step 3: Write `src/components/layout/RootLayout.tsx`**

File: `src/components/layout/RootLayout.tsx`

```tsx
import { Outlet, useLocation } from 'react-router'
import { useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'

export function RootLayout() {
  const { pathname, hash } = useLocation()

  // Scroll-to-top on route change; respect in-page anchors (e.g. /publications#indexpen).
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <MobileNav />
      <div className="lg:flex">
        <div className="hidden lg:block lg:w-[280px] lg:shrink-0">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <Sidebar />
          </div>
        </div>
        <main className="flex-1 px-5 py-8 lg:px-10 lg:py-12">
          <div className="mx-auto max-w-3xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/
git commit -m "Add Sidebar, MobileNav, RootLayout"
```

---

### Task 16: Wire up router in `App.tsx` and `main.tsx`

**Files:**
- Modify: `src/App.tsx`, `src/main.tsx`
- Create (in later tasks): `src/pages/*` — for now, use stub imports; the next tasks fill them in.

- [ ] **Step 1: Create placeholder page stubs so the router imports resolve**

Create five files, each a minimal stub to be replaced in later tasks:

File: `src/pages/Home.tsx`
```tsx
export default function Home() { return <p>Home (stub)</p> }
```

File: `src/pages/Projects.tsx`
```tsx
export default function Projects() { return <p>Projects (stub)</p> }
```

File: `src/pages/Publications.tsx`
```tsx
export default function Publications() { return <p>Publications (stub)</p> }
```

File: `src/pages/Music.tsx`
```tsx
export default function Music() { return <p>Music (stub)</p> }
```

File: `src/pages/NotFound.tsx`
```tsx
export default function NotFound() { return <p>404 (stub)</p> }
```

- [ ] **Step 2: Replace `src/App.tsx`**

File: `src/App.tsx`

```tsx
import { Routes, Route } from 'react-router'
import { RootLayout } from '@/components/layout/RootLayout'
import Home from '@/pages/Home'
import Projects from '@/pages/Projects'
import Publications from '@/pages/Publications'
import Music from '@/pages/Music'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/music" element={<Music />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
```

- [ ] **Step 3: Replace `src/main.tsx`**

File: `src/main.tsx`

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Expected: open `http://localhost:5173` — sidebar appears on desktop, "Home (stub)" in the main column. Navigating to `/projects`, `/publications`, `/music` works via sidebar links. Kill server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Wire up React Router with RootLayout and page stubs"
```

---

### Task 17: Implement `src/pages/Home.tsx`

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Replace `src/pages/Home.tsx`**

File: `src/pages/Home.tsx`

```tsx
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { aboutHero, aboutBody, researchInterests, otherInterests, featuredProjectSlugs } from '@/data/about'
import { news } from '@/data/news'
import { projects } from '@/data/projects'
import { Markdown } from '@/components/Markdown'
import { ProjectCard } from '@/components/ProjectCard'
import { NewsItem } from '@/components/NewsItem'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  const featured = featuredProjectSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Hello There, I am John</h2>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start">
          <div className="flex-1">
            <Markdown>{aboutHero}</Markdown>
          </div>
          <img
            src="/images/performance.png"
            alt="Haowen performing piano"
            className="h-40 w-auto self-center rounded-md object-cover md:order-2 md:h-48"
            loading="lazy"
          />
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-start">
          <img
            src="/images/in-vr.png"
            alt="Haowen in VR"
            className="h-40 w-auto self-center rounded-md object-cover md:h-44"
            loading="lazy"
          />
          <div className="flex-1">
            <Markdown>{aboutBody}</Markdown>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">Research Interests</h3>
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-[var(--color-foreground)]/90">
          {researchInterests.map((item) => (
            <li key={item} className="after:ml-3 after:text-[var(--color-muted-foreground)] after:content-['·'] last:after:content-['']">
              {item}
            </li>
          ))}
        </ul>

        <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">Other Interests</h3>
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-[var(--color-foreground)]/90">
          {otherInterests.map((item) => (
            <li key={item} className="after:ml-3 after:text-[var(--color-muted-foreground)] after:content-['·'] last:after:content-['']">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <Separator />

      <section>
        <h3 className="text-lg font-semibold text-[var(--color-foreground)]">Featured Projects</h3>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-lg font-semibold text-[var(--color-foreground)]">Recent News</h3>
        <ul className="mt-3 divide-y divide-[var(--color-border)]">
          {news.map((item) => (
            <NewsItem key={item.date + item.text.slice(0, 20)} item={item} />
          ))}
        </ul>
      </section>

      <Separator />

      <section className="flex flex-wrap gap-6 text-sm">
        <Link to="/publications" className="inline-flex items-center gap-1 text-[var(--color-accent)] hover:underline">
          See all publications <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link to="/projects" className="inline-flex items-center gap-1 text-[var(--color-accent)] hover:underline">
          See all projects <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:5173`. Expected:
- Sidebar on the left with avatar, name, socials, nav
- Greeting, performance photo, bio narrative with VR photo
- Research & Other interests as inline lists
- Two featured project cards (PhysioLabXR, IndexPen)
- News list with dates
- Two "See all" CTAs at bottom

Kill server.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "Implement Home page"
```

---

### Task 18: Implement `src/pages/Projects.tsx`

**Files:**
- Modify: `src/pages/Projects.tsx`

- [ ] **Step 1: Replace file**

File: `src/pages/Projects.tsx`

```tsx
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ProjectCard'

export default function Projects() {
  return (
    <div>
      <header>
        <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Projects</h2>
        <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
          Click any card for more details on the publication page.
        </p>
      </header>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open `/projects`. Expected: 7 project cards in a 2-column grid on desktop; media, title, blurb, tags, and link icons visible. Clicking a card title jumps to `/publications#<slug>` (which won't resolve until Task 19).

- [ ] **Step 3: Commit**

```bash
git add src/pages/Projects.tsx
git commit -m "Implement Projects page"
```

---

### Task 19: Implement `src/pages/Publications.tsx`

**Files:**
- Modify: `src/pages/Publications.tsx`

- [ ] **Step 1: Replace file**

File: `src/pages/Publications.tsx`

```tsx
import { publications } from '@/data/publications'
import { site } from '@/data/site'
import { PublicationCard } from '@/components/PublicationCard'

export default function Publications() {
  const sorted = [...publications].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div>
      <header>
        <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Publications</h2>
        <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
          For more, see my{' '}
          <a
            href={site.socials.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] hover:underline"
          >
            Google Scholar
          </a>
          . <span className="italic">* denotes equal contribution.</span>
        </p>
      </header>

      <div className="mt-8">
        {sorted.map((pub) => (
          <PublicationCard key={pub.slug} pub={pub} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open `/publications`. Expected: 8 publications in reverse-chronological order; author names, venue, abstract, and action chips (`PDF`, `Video`, etc.) render. Click `/projects` → click a project title → you should land on `/publications#<slug>` and scroll to the right entry.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Publications.tsx
git commit -m "Implement Publications page"
```

---

### Task 20: Implement `src/pages/Music.tsx`

**Files:**
- Modify: `src/pages/Music.tsx`

- [ ] **Step 1: Replace file**

File: `src/pages/Music.tsx`

```tsx
import { music, musicIntro } from '@/data/music'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'
import { Markdown } from '@/components/Markdown'
import { Separator } from '@/components/ui/separator'

export default function Music() {
  return (
    <div>
      <header>
        <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Music</h2>
      </header>

      <div className="mt-6">
        <Markdown>{musicIntro}</Markdown>
      </div>

      <div className="mt-10 flex flex-col gap-10">
        {music.map((item, i) => (
          <section key={item.youtubeId}>
            {i > 0 && <Separator className="mb-8" />}
            <h3 className="text-base font-semibold text-[var(--color-foreground)]">{item.title}</h3>
            {item.context && (
              <p className="mt-0.5 text-xs italic text-[var(--color-muted-foreground)]">{item.context}</p>
            )}
            <div className="mt-3">
              <YouTubeEmbed id={item.youtubeId} title={item.title} />
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open `/music`. Expected: intro paragraph, 6 YouTube embeds in 16:9 aspect ratio, each with a title and (where present) context line.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Music.tsx
git commit -m "Implement Music page"
```

---

### Task 21: Implement `src/pages/NotFound.tsx` and polish `index.html`

**Files:**
- Modify: `src/pages/NotFound.tsx`, `index.html`

- [ ] **Step 1: Replace `src/pages/NotFound.tsx`**

File: `src/pages/NotFound.tsx`

```tsx
import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-bold text-[var(--color-foreground)]">404</h2>
      <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">Page not found.</p>
      <Link to="/" className="mt-4 text-sm text-[var(--color-accent)] hover:underline">
        ← Back home
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: Update `index.html` head**

Replace the `<title>` and favicon/meta section of `index.html` with:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="Haowen 'John' Wei — research at Martinos Center / Harvard Medical School. BCI, XR, clinical AI, sensor fusion. Pianist." />
<meta property="og:title" content="Haowen 'John' Wei" />
<meta property="og:description" content="Research wizard, game-making maestro, Chopin-obsessed pianist." />
<meta property="og:image" content="/images/avatar.png" />
<meta property="og:type" content="website" />
<title>Haowen "John" Wei</title>
```

(Keep the Google Fonts `<link>` tags from Task 2.)

- [ ] **Step 3: Verify**

```bash
npm run dev
```

- Open `/some-bogus-path` → 404 page renders with "Back home" link.
- Tab title shows "Haowen 'John' Wei"; favicon loads.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add NotFound page, polish document head (title, favicon, meta)"
```

---

### Task 22: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Write the workflow**

File: `.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
      - name: Create 404.html fallback for client-side routing
        run: cp dist/index.html dist/404.html
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

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

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deploy workflow for Pages"
```

- [ ] **Step 3: One-time repo settings change (manual — by the owner)**

Go to GitHub → repo → **Settings → Pages → Build and deployment → Source**. Change it from **"Deploy from a branch"** to **"GitHub Actions"**.

This is a one-time click that the plan can't do automatically. The workflow from Step 1 will fail without it.

---

### Task 23: Final verification

**Files:** none modified.

- [ ] **Step 1: Run the full check locally**

```bash
npm test           # data integrity
npx tsc --noEmit   # types
npm run build      # production build
cp dist/index.html dist/404.html
npm run preview    # serve dist/ on localhost:4173
```

- [ ] **Step 2: Smoke test the preview**

Open `http://localhost:4173` and click through every route:
- `/` — home renders with photos, interests, featured projects, news
- `/projects` — 7 cards render, images load
- `/publications` — 8 entries render in reverse-chronological order; `/publications#indexpen` scrolls to the IndexPen entry
- `/music` — intro + 6 embeds
- `/files/HaowenJohnWei_CV.pdf` — CV PDF opens in the tab
- `/garbage-path` — 404 renders, back-home link works
- Hard-refresh `/publications` — still renders (via 404.html fallback *after deploy*; in local `preview` it should work via Vite's dev fallback)
- Mobile viewport (DevTools responsive mode): sidebar collapses, hamburger menu opens the sheet, links work

- [ ] **Step 3: Push**

```bash
git push origin master
```

- [ ] **Step 4: Watch the Actions run and verify live site**

In GitHub → Actions tab, the `Deploy` workflow runs. On success, `https://haowenweijohn.github.io` serves the new site.

Smoke-check the live site identically to Step 2.

- [ ] **Step 5: Final commit if anything needed patching**

If no code changes were needed, nothing to commit. If a test or type check failed and you patched it, commit with a message describing the fix.

---

## Verification summary

After Task 23, all spec success criteria are met:

| Criterion | How it's verified |
|---|---|
| All real content reachable | Manual smoke test in Task 23 Step 2 |
| CV PDF URL preserved | Direct nav to `/files/HaowenJohnWei_CV.pdf` |
| Keyboard & screen reader nav | shadcn/ui primitives + `alt` / `title` / `aria-label` usage |
| Deep links survive refresh | `cp dist/index.html dist/404.html` in workflow + local preview check |
| Archive intact | `archive/` untouched throughout |
| Lighthouse ≥ 95 | Run Lighthouse in DevTools on the live site after deploy |
