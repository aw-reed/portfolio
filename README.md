# Andrew Reed — Portfolio

iPhone-style portfolio site built with React, Vite, Tailwind CSS, and Framer Motion.

**Live site:** [https://aw-reed.github.io/portfolio/](https://aw-reed.github.io/portfolio/)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/).

## Deploy to GitHub Pages

This repo is connected to [github.com/aw-reed/portfolio](https://github.com/aw-reed/portfolio).

### Automatic deploy (recommended)

1. Push to the `main` branch on GitHub.
2. In the repo on GitHub: **Settings → Pages → Build and deployment**
3. Set **Source** to **GitHub Actions** (not “Deploy from a branch”).
4. Each push to `main` runs `.github/workflows/deploy.yml` and publishes the site.

### Manual deploy

```bash
npm run deploy
```

This builds with `base: /portfolio/` and pushes the `dist` folder to the `gh-pages` branch. If you use manual deploy, set Pages **Source** to the `gh-pages` branch instead of GitHub Actions.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (root base, for local preview) |
| `npm run build:gh-pages` | Production build for GitHub Pages (`/portfolio/`) |
| `npm run preview` | Preview the last `npm run build` output |
| `npm run deploy` | Build for Pages and publish via `gh-pages` |
