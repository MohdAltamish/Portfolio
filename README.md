<div align="center">

# ✦ Altamish.dev — Personal Portfolio

**A modern, animated developer portfolio built with React, Framer Motion & TailwindCSS**

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-TSX-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

[**🌐 Live Site**](https://altamish.figma.site/) · [**📂 Figma Source**](https://altamish.figma.site/) · [**💼 LinkedIn**](https://linkedin.com/in/mohd-altamish) · [**🐙 GitHub**](https://github.com/MohdAltamish)

</div>

---

## 📸 Preview

> A visually immersive portfolio featuring fluid animations, dark/light theme switching, parallax scrolling, and a cinematic preloader — designed to leave a lasting first impression.

---

## 🚀 About The Project

**Altamish.dev** is the personal portfolio of **Mohd Altamish** — an AI Builder, Hackathon Winner, and Full Stack Developer. The site showcases projects, technical skills, professional experience, and contact information through a premium editorial-style interface with rich micro-interactions.

### ✨ Key Features

| Feature | Description |
|---|---|
| 🎬 **Cinematic Preloader** | Elegant name reveal animation with blur-to-focus transition on initial load |
| 🌗 **Dark / Light Theme** | Toggle between themes with persistent `localStorage` preference and smooth 500ms transitions |
| 🎭 **Framer Motion Animations** | Scroll-triggered reveals, parallax effects, rotating geometric rings, and hover micro-interactions |
| 📱 **Fully Responsive** | Mobile-first design with adaptive layouts, collapsible navigation, and touch-friendly interactions |
| 🧭 **Client-Side Routing** | Multi-page experience with React Router — Home, Work gallery, and individual Project detail pages |
| 🎨 **Editorial Design** | Typographic hierarchy with serif/sans-serif contrast, decorative grid overlays, and gradient accents |
| 🔍 **Smooth Scroll** | Hash-based anchor navigation with smooth scrolling to page sections |
| ⚡ **Vite-Powered** | Lightning-fast HMR and optimized production builds via Vite 6 |

---

## 🏗️ Tech Stack

### Core

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 18.3 | UI component library |
| [Vite](https://vitejs.dev) | 6.3.5 | Build tool & dev server |
| [TypeScript (TSX)](https://www.typescriptlang.org) | — | Type-safe component authoring |
| [React Router](https://reactrouter.com) | 7.x | Client-side routing |

### Styling & Animation

| Technology | Version | Purpose |
|---|---|---|
| [TailwindCSS](https://tailwindcss.com) | 4.1.12 | Utility-first CSS framework |
| [Framer Motion](https://motion.dev) | 12.x | Declarative animations & gestures |
| [tw-animate-css](https://www.npmjs.com/package/tw-animate-css) | 1.3.8 | Tailwind animation utilities |

### UI Components

| Technology | Purpose |
|---|---|
| [shadcn/ui](https://ui.shadcn.com) | Accessible Radix-based UI primitives |
| [Lucide React](https://lucide.dev) | Modern icon library |
| [class-variance-authority](https://cva.style) | Component variant management |
| [tailwind-merge](https://www.npmjs.com/package/tailwind-merge) | Intelligent Tailwind class merging |

---

## 📂 Project Structure

```
My Portfolio/
├── index.html                    # HTML entry point (title: Altamish.dev)
├── package.json                  # Dependencies & scripts
├── vite.config.ts                # Vite config with Figma asset resolver
├── postcss.config.mjs            # PostCSS configuration
├── pnpm-workspace.yaml           # pnpm workspace config
├── ATTRIBUTIONS.md               # License attributions (shadcn/ui, Unsplash)
│
├── src/
│   ├── main.tsx                  # React DOM entry — mounts <App />
│   │
│   ├── app/
│   │   ├── App.tsx               # Root component — router, preloader, theme
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.tsx        # Fixed nav — scroll blur, mobile drawer, theme toggle
│   │   │   ├── Hero.tsx          # Full-screen hero — parallax, geometric rings, status badge
│   │   │   ├── About.tsx         # About section — bio, education, certifications
│   │   │   ├── Projects.tsx      # Featured projects grid with hover effects
│   │   │   ├── Services.tsx      # Technical skills cards — staggered masonry layout
│   │   │   ├── Work.tsx          # Full project gallery page (/work)
│   │   │   ├── ProjectDetail.tsx # Individual project page (/work/:slug)
│   │   │   ├── Footer.tsx        # Contact section & footer
│   │   │   ├── ui/              # 49 shadcn/ui primitive components
│   │   │   └── figma/           # Figma-exported helper components
│   │   │
│   │   ├── context/
│   │   │   └── ThemeContext.tsx   # Dark/light theme provider with semantic class helpers
│   │   │
│   │   └── data/
│   │       └── projects.ts       # Project data — 7 entries with metadata & links
│   │
│   ├── imports/                  # Static assets & content
│   │   ├── portfolio.md          # Full portfolio content (bio, skills, experience)
│   │   ├── LOGO.png              # Personal logo
│   │   ├── ModShield.png         # ModShield project asset
│   │   ├── My-Wall.png           # Hero/profile wall image
│   │   └── [2-7].png             # Project & content images
│   │
│   └── styles/
│       ├── index.css             # Root stylesheet — imports all partials
│       ├── globals.css           # CSS custom properties, base typography, theme tokens
│       ├── theme.css             # Extended theme variables
│       ├── default_theme.css     # Default shadcn theme
│       ├── tailwind.css          # Tailwind directives
│       └── fonts.css             # Font imports & configuration
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **pnpm** (recommended) or **npm**

### Installation

```bash
# Clone the repository
git clone https://github.com/MohdAltamish/My-Portfolio.git
cd My-Portfolio

# Install dependencies
pnpm install
# or
npm install
```

### Development

```bash
# Start the development server (default: http://localhost:5173)
pnpm dev
# or
npm run dev
```

### Production Build

```bash
# Create an optimized production build
pnpm build
# or
npm run build
```

The build output will be generated in the `dist/` directory, ready for deployment.

---

## 🗺️ Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `HomePage` | Landing page — Hero, About, Projects, Skills, Contact |
| `/work` | `Work` | Full project gallery with filtering |
| `/work/:slug` | `ProjectDetail` | Individual project case study |

### Section Anchors (on `/`)

| Anchor | Section |
|---|---|
| `/#about` | About Me |
| `/#services` | Technical Skills |
| `/#contact` | Contact & Footer |

---

## 🎨 Design System

### Theme Architecture

The app uses a custom **ThemeContext** that provides:

- **`theme`** — Current theme (`'dark'` | `'light'`)
- **`toggleTheme()`** — Switch between themes
- **`isDark`** — Boolean convenience flag

A semantic class helper `tc(isDark)` generates theme-aware Tailwind classes for:

| Token | Dark | Light |
|---|---|---|
| `pageBg` | `bg-neutral-950` | `bg-gray-50` |
| `card` | Glassmorphic white/5 | Clean white with borders |
| `text` | `text-white` | `text-neutral-900` |
| `accent` | White on black | Black on white |
| `grid` | Subtle white gridlines | Subtle black gridlines |

### Animation Patterns

- **Preloader**: Blur-to-focus name reveal → fade-out after 2s
- **Scroll Parallax**: Hero text and background move at different rates via `useScroll` + `useTransform`
- **Staggered Reveals**: Components animate in sequence with increasing `delay`
- **Geometric Rings**: Three concentric circles rotate at 60s, 80s, and 100s periods
- **Hover Effects**: Cards lift (`y: -10`), borders illuminate, icons invert colors
- **Group Dimming**: Hovering one skill card dims siblings to 20% opacity

---

## 📋 Showcased Projects

| # | Project | Event | Stack | Highlight |
|---|---|---|---|---|
| 1 | 🏆 **Carbon Tracker** | GitLab Duo Agent Hackathon 2026 | Python, GitLab CI/CD | **Won Sustainability Category** |
| 2 | **ModShield** | Reddit Developer Platform | JavaScript, Reddit API, Node.js | Published Reddit App |
| 3 | **DriftFix** | Meta PyTorch OpenEnv Hackathon | Python, Docker, HuggingFace | Schema migration agent |
| 4 | **NeuroScan** | IIT-BHU Hackathon | PyTorch, CNN, Transformer, MoE | 96% accuracy MRI classifier |
| 5 | **GLB Dental Intellect** | MEDHA 2025 — IIT Bombay | Next.js, Vercel | AI dental disease assessment |
| 6 | **CrisisCommand** | Google Solution Challenge 2026 | Next.js 14, Firebase, Gemini API | Rapid crisis response |
| 7 | **UIDAI Aadhaar Insights** | UIDAI Hackathon | Python, React, Gemini API | Aadhaar analytics dashboard |

---

## 🚢 Deployment

The project can be deployed to any static hosting platform:

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build the project
npm run build

# Deploy the dist/ folder via Netlify UI or CLI
netlify deploy --prod --dir=dist
```

### GitHub Pages

```bash
# Add base path to vite.config.ts if deploying to a subpath
# export default defineConfig({ base: '/My-Portfolio/', ... })

npm run build
# Deploy dist/ to gh-pages branch
```

---

## 🧩 Key Configuration

### Vite Config (`vite.config.ts`)

- **Figma Asset Resolver**: Custom plugin that resolves `figma:asset/` imports to `src/assets/`
- **React Plugin**: JSX transform via `@vitejs/plugin-react`
- **Tailwind Plugin**: CSS processing via `@tailwindcss/vite`
- **Path Alias**: `@` maps to `./src/app` for clean imports

### Package Manager

The project uses **pnpm** with workspace support (see `pnpm-workspace.yaml`). Dependencies are peer-resolved with React 18.3 as an optional peer dependency.

---

## 📄 Attributions

- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) — MIT License
- **Photography**: [Unsplash](https://unsplash.com) — Unsplash License
- **Icons**: [Lucide](https://lucide.dev) — ISC License
- **Design**: Original Figma design by Mohd Altamish

---

## 📬 Contact

**Mohd Altamish** — AI Builder · Full Stack Developer

| Channel | Link |
|---|---|
| 🌐 Website | [altamish.dev](https://altamish.dev) |
| 📧 Email | [altamish6589@gmail.com](mailto:altamish6589@gmail.com) |
| 💼 LinkedIn | [linkedin.com/in/mohd-altamish](https://linkedin.com/in/mohd-altamish) |
| 🐙 GitHub | [github.com/MohdAltamish](https://github.com/MohdAltamish) |

---

<div align="center">

**Built with ❤️ by Mohd Altamish**

*Currently open to internship opportunities in Software Development, AI/ML, and Full-Stack Engineering roles.*

</div>
