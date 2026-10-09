# vignettedias.github.io

Interactive engineering portfolio for **Vighnesh Das** — Cyber Security × AI/ML × Software Engineering.
Static React application, deployed to GitHub Pages as a user site.

**Live URL:** https://vignettedias.github.io/

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Motion | Framer Motion |
| Icons | lucide-react |
| Hosting | GitHub Pages (static, no backend) |

---

## Local development

Requires **Node 18+** (CI uses Node 20).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the built output locally
```

`npm run build` runs `tsc -b` first, so any type error fails the build before Vite runs.

---

## Editing content

All content lives in `src/data/` — no copy is hard-coded into components.

| File | Contains |
|---|---|
| `src/data/profile.ts` | Name, role, bio, hero stats, contact links, education, certifications |
| `src/data/projects.ts` | Every project card and modal (problem, approach, architecture, highlights) |
| `src/data/patents.ts` | Patent entries, application numbers, publication stage |
| `src/data/skills.ts` | Skill groups and the repository each skill is evidenced by |
| `src/data/journey.ts` | Engineering principles and the timeline |
| `src/data/architectures.ts` | Node/edge definitions for the interactive diagrams, and Helo's protocol stack |
| `src/data/github.ts` | Dated snapshot of the public repositories — the fallback for the live GitHub data |

**Live GitHub data.** The repository count in the hero, the "last push" chip and the telemetry panel
under the project explorer read `api.github.com/users/vignettedias/repos` on page load (cached for
15 minutes per tab). Until it answers — or if it is rate-limited — the snapshot in
`src/data/github.ts` is shown and labelled with its date. Refresh the snapshot when you add repositories.

**"New" badges** come from each project's `released` date and disappear on their own 60 days later.

**Link preview.** `public/og.png` is rendered from `scripts/og-card.html`; the regeneration command is in
that file's header comment.

**Contact links.** Any link in `profile.links` set to `href: null` is hidden site-wide — nothing renders
as a dead link. Add the URL and the button appears automatically.

**Patent stage.** Each patent carries `stage: 'published' | 'filed'`. `published` renders the
stronger animated badge; `filed` renders a neutral one. Change the string to change the claim.

**Résumé.** The download button reads `public/resume.pdf`. If the file is absent the control
degrades to a disabled "Résumé not uploaded" state rather than breaking.

---

## Modes

- **Recruiter mode** — reduces motion, reorders the page to a CV-shaped reading order (work → IP →
  skills → background), expands the skill matrix so nothing is behind a click, and hides section
  ordinals (which would no longer be accurate after reordering).
- **Deep dive** — expands the engineering-internals panels on the MMAIFA and Dynasty deep dives.
- **Command palette** — <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd> (or the search button in the nav) to jump to a
  section, open any project, copy the email address, download the résumé or toggle either mode.
- **vd-console** — the terminal in About. `help` lists commands; `neofetch`, `repos` and Tab completion included.

Ambient effects — the node-network background, the decoding name, count-up stats, the card spotlight and
the stack ticker — are all switched off by Recruiter mode and by `prefers-reduced-motion`.

---

## Accessibility

Semantic landmarks, a skip link, keyboard-operable diagram nodes and skill tabs (arrow-key roving
tabindex), focus-trapped modal with Escape to close, visible focus rings, and
`@media (prefers-reduced-motion: reduce)` which disables all ambient animation.

---

## Deploying to GitHub Pages

The repository is a **user site**, so Vite's `base` is `/` — not `/<repo-name>/`.
Deployment runs through GitHub Actions (`.github/workflows/deploy.yml`), not a `gh-pages` branch.

### 1. Push the project

If the repository does **not** exist yet, create `vignettedias.github.io` on GitHub (empty, no README), then:

```bash
git init
git branch -M main
git add .
git commit -m "Initial interactive portfolio"
git remote add origin https://github.com/vignettedias/vignettedias.github.io.git
git push -u origin main
```

If the repository **already exists and has commits**, don't run `git init` over it — clone it and copy
the files in instead:

```bash
git clone https://github.com/vignettedias/vignettedias.github.io.git
# copy this project's files into the clone, then:
cd vignettedias.github.io
git add .
git commit -m "Interactive portfolio"
git push origin main
```

### 2. Enable GitHub Pages

Repository → **Settings** → **Pages** → **Build and deployment** → **Source** → select
**GitHub Actions**.

### 3. Watch the workflow

Open the **Actions** tab. The `Deploy to GitHub Pages` workflow runs on every push to `main` and can
also be triggered manually via **Run workflow** (`workflow_dispatch`). It checks out, installs with
`npm ci`, builds, verifies `dist/index.html` exists, uploads `dist/` as a Pages artifact, and deploys
it with `actions/deploy-pages`. A build failure fails the job before anything is published.

### 4. Open the site

https://vignettedias.github.io/

First deployment can take a couple of minutes to propagate.

---

## Deployment checklist

- [x] Repository name: `vignettedias.github.io`
- [x] Vite `base: '/'` (root user site)
- [x] `.github/workflows/deploy.yml` present
- [x] Permissions: `contents: read`, `pages: write`, `id-token: write`
- [x] `github-pages` environment used
- [x] `dist/index.html` produced and verified in CI
- [x] `.nojekyll` present so `_`-prefixed assets are served
- [x] No backend, no environment secrets
- [x] `npm run build` passes with no TypeScript errors

---

## Content policy

Nothing on this site is invented. Project descriptions are derived from the repositories at
github.com/vignettedias, and repository counts come from the GitHub API; personal and academic details come from the résumé. Skills name the
repository that demonstrates them rather than showing self-assigned percentages. Patent entries carry
only the application number and the stage supplied by the inventor — no filing dates, jurisdictions,
grant status, or claim of legal verification.
