# Prem — Engineered with intent

A cinematic, editorial portfolio built with Next.js App Router, TypeScript, Tailwind CSS 4, Framer Motion, and Lenis. Near-black by default; a persistent warm-paper light theme. All biographical, project, stack, timeline, and section content lives in `data/portfolio.ts`.

Delivery checks and measured Lighthouse scores are recorded in [VERIFICATION.md](./VERIFICATION.md).

## Design rationale

Electric violet → cyan reads as a moving signal: expressive enough to remember, restrained enough to let the engineering lead. Space Grotesk brings character to large headlines; Inter keeps longer passages clear. Both are local, subsetted variable fonts, loaded through `next/font`. Original CSS/SVG project illustrations provide a complete visual identity while clearly identifying themselves as concept art. An orbital mesh reacts to the pointer without WebGL or a continuous render loop. Editorial case-study chapters sit alongside a filterable project collection, an interactive tech stack, and a precise timeline.

## How to run locally

Use Node.js 22 LTS and npm 10 or later.

```bash
cd prem-portfolio
npm ci
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. The favicon set and Open Graph card are included. To regenerate them after changing their source artwork:

```bash
npm run assets
```

Production preview:

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

`next start` is for the normal Next.js build. For a static-export build, serve `out/` with a static server instead.

## Customize in 5 minutes

- [ ] **Story, links, skills, projects:** edit `data/portfolio.ts`. The first project is the flagship. Preserve its `id` and artwork key, or supply a screenshot.
- [ ] **Evidence:** search for `[ADD` in `data/portfolio.ts`, then replace missing descriptions, outcomes, tech stack, repository URLs, and live URLs with real information. Missing links are non-clickable labels, never fake links.
- [ ] **Screenshots:** add images to `public/projects/`. Set a project's `screenshot` to `{ src: "/projects/property.webp", alt: "Property management dashboard showing…", width: 1600, height: 1000 }`. Use real dimensions and descriptive alt text. `next/image` lazy loads and sizes them responsively.
- [ ] **Résumé:** add your actual PDF to `public/resume/prem-resume.pdf`; set `portfolio.resume` to `"/resume/prem-resume.pdf"`. Until then, the résumé button gives an honest “coming soon” toast.
- [ ] **Colors:** edit the palette tokens at the top of `app/globals.css`. Update the primary button's gradient and `scripts/generate-assets.mjs` if changing the signature palette; run `npm run assets` afterward.
- [ ] **SEO/domain:** set `NEXT_PUBLIC_SITE_URL` to your production origin, e.g. `https://prem.dev`. For a subdirectory deployment, keep the origin here and set `NEXT_PUBLIC_BASE_PATH` separately. Rebuild after changing public variables.
- [ ] **Form:** keep the mailto fallback or configure Formspree below.

## Contact form

### Default: email-app fallback

No service setup is required. Validating the form opens a correctly encoded draft addressed to Prem, including the sender's name and email. The visitor reviews and sends it in their mail app. The page explicitly says that opening a draft is **not** sending a message. It also includes a direct email link and a clipboard copy button.

### Optional: Formspree delivery

1. Create a Formspree form and confirm your destination email.
2. Set `NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID` in `.env.local` and your hosting environment.
3. Rebuild. The submit label changes to “Send message”.
4. Test your real endpoint after deployment. Formspree quotas and domain restrictions are managed in its dashboard.

Only a valid HTTPS Formspree `/f/` URL enables remote submission. The form has native validation, maximum lengths, a honeypot, a loading state, a 15-second timeout, and success/error live regions. Failed submissions retain the visitor's text. The endpoint is public, not a secret API key. Never put private service credentials in a `NEXT_PUBLIC_` variable.

## Deploy — Vercel (primary)

1. Put **the contents of this folder** at the root of a new GitHub repository. If keeping it in a larger repository, set the Vercel Root Directory to `prem-portfolio`.
2. Import the repository into Vercel; select the Next.js preset and Node 22.
3. Add `NEXT_PUBLIC_SITE_URL` and optionally `NEXT_PUBLIC_FORMSPREE_ENDPOINT`. Keep `STATIC_EXPORT=false` and `NEXT_PUBLIC_BASE_PATH` empty for root hosting.
4. Deploy. Vercel handles Next.js and image optimization.
5. Check the production page, `sitemap.xml`, `robots.txt`, social card, contact form, and résumé link after adding your assets.

### Custom domain

In Vercel → Project → Settings → Domains, add the domain and the preferred `www`/apex variant. At your DNS provider, add the **exact** records Vercel displays; records depend on the domain and account, so do not copy stale IP addresses from tutorials. Pick a primary domain and redirect the other variant. Set `NEXT_PUBLIC_SITE_URL` to the primary HTTPS origin and redeploy so canonical, sitemap, and social URLs match. Vercel provisions HTTPS once DNS resolves.

## Deploy — Netlify

Import the repository using `netlify.toml`. Its Next.js plugin supports App Router and image optimization. Set the same environment variables as Vercel, Node 22, and the project base directory if this folder isn't the repository root. Build command: `npm run build`; publish directory: `.next`.

For a custom domain, use Netlify → Domain management and apply the DNS records it provides. Set the production origin and redeploy. For purely static Netlify hosting instead, build with `STATIC_EXPORT=true`, publish `out`, and remove the Next.js plugin from `netlify.toml`.

## Deploy — GitHub Pages

The included `.github/workflows/pages.yml` builds and publishes a static export automatically on every push to `main`. It also supports **Run workflow** for an initial deploy or a manual rebuild.

1. Commit the project at the repository root.
2. Go to GitHub repository → Settings → Pages → Source: **GitHub Actions**.
3. Optionally set the repository Actions variable `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.
4. Run the “Deploy GitHub Pages” workflow for the initial publication, or push to `main`. `configure-pages` supplies the correct origin and repository base path.
5. The exported site retains filters, theme, dialogs, motion, clipboard, and the contact fallback. Image optimization is disabled for static export; use compressed WebP/AVIF screenshots sized to their display needs.

Local project-path export, without `.env.local` overriding these settings:

```bash
STATIC_EXPORT=true NEXT_PUBLIC_SITE_URL=https://YOUR_USER.github.io NEXT_PUBLIC_BASE_PATH=/YOUR_REPO npm run build
```

For a GitHub Pages custom domain, add it in Settings → Pages and configure the DNS records GitHub shows. Add `public/CNAME` containing the domain if your setup requires it. Rebuild with the custom HTTPS origin and an empty base path. The workflow uses Pages configuration, so configure the domain before the next run.

GitHub Pages has no server functions; Formspree remains a browser-to-service request. This portfolio needs no custom backend.

### Fast content updates after the first deployment

1. Edit `data/portfolio.ts`: add a skill to a group's `items`, add a new skill group, or add an object to the `projects` array before its closing bracket.
2. For a new project, use a unique `id`. Choose `visual: "generic"` for automatic title-based artwork, or set `screenshot` to your real image. Project numbers, total counts, and category filters update automatically. Keep the flagship first.
3. Commit and push to `main`. GitHub Actions checks, builds, and publishes the updated site; check the **Actions** tab for the live deployment receipt.

You can also edit `data/portfolio.ts` directly using GitHub’s pencil button and commit to `main`; that triggers the same deployment. To update locally:

```bash
npm run lint
npm run build
git add data/portfolio.ts public/projects public/resume
git commit -m "Update portfolio content"
git push origin main
```

New-project template (copy into the existing array and replace the sample text; no `index` field is needed):

```typescript
{
  id: "your-new-project",
  title: "Your New Project",
  kind: "Full-stack web app",
  summary: "One clear sentence about what it does.",
  categories: ["Web"],
  tech: ["React", "Node.js"],
  visual: "generic",
  screenshot: null,
  github: null,
  live: null,
  detail: "Explain the problem, your contribution, and the result.",
},
```

To add another filter category, extend `projectCategories` at the top of the same data file. The TypeScript category type and filter controls derive from it. A personal site repository named `premkumar2002.github.io` gives a root URL; a repository named `prem-portfolio` gives a `/prem-portfolio/` URL. The workflow handles either path.

## Checks and performance

```bash
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser suite checks 360 / 768 / 1280 / 1920px layouts, horizontal overflow, WCAG AA rules with axe, both themes, theme persistence, project and skill filtering, modal Escape/focus restoration, mobile navigation, clipboard, pending résumé feedback, and honest contact fallback behavior. Screenshots land in `reports/screenshots/`.

To verify optional Formspree success and failure **without sending a real email**, build with a valid test-shaped endpoint; Playwright intercepts its requests:

```bash
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/testform npm run build
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/testform npm run test:e2e -- --grep Formspree
```

Rebuild without the test endpoint afterward. Never deploy the test endpoint as your real form configuration.

For Lighthouse, start the production server in one terminal and run this in another:

```bash
npm run audit
```

The script audits mobile and desktop and writes complete HTML/JSON reports to `reports/`. Use `AUDIT_URL=https://your-domain.com npm run audit` to check a deployment. Lighthouse scores vary with hosting, machine load, and added media; re-audit after adding screenshots or third-party scripts.

Performance choices: self-hosted variable fonts, no WebGL dependency, event-driven/requestAnimationFrame pointer effects, compositor-based motion, deferred Lenis loading on pointer devices, lazy screenshots, and no tracking scripts. Native cursor and scrolling remain functional. All motion is disabled for `prefers-reduced-motion`. Avoid autoplay video, oversized screenshots, and render-blocking analytics to preserve the performance budget.

## Accessibility and behavior

- Semantic landmarks, one main heading, descriptive labels, focus states, and a skip link.
- Native modal dialog supplies focus containment; Escape closes it and focus returns to the opener.
- Mobile menu supports Escape, outside-click dismissal, and anchor navigation.
- Filter controls use `aria-pressed`; project count and feedback use live regions.
- Dark and light themes have separate contrast-conscious text tokens.
- Intro lasts under one second and never blocks the page behind a preloader.
- UI concept art is hidden from assistive tech; actual screenshots use your alt text.
- Personal content is rendered on the server; the page stays readable before client hydration.

## Structure

```text
app/                Routes, SEO endpoints, layout, theme system
components/         Modular sections and interaction primitives
data/portfolio.ts   Typed editable personal and project content
public/             Generated brand assets, your screenshots and résumé
scripts/            Reproducible assets and performance audit
tests/              Real browser interaction/accessibility checks
.github/workflows/  CI and automatic Pages deployment
```

`npm ci` uses the committed lockfile. CI runs lint, typecheck, production build, and browser tests on every pull request and push to `main`.

## Five optional upgrades

1. **Engineering journal:** MDX articles on architecture decisions, debugging, and things you learned at Deakin.
2. **Progressive 3D hero:** an on-demand React Three Fiber shader, with this CSS mesh as the accessible low-power fallback.
3. **Theme studio:** add an automatic system-theme option and a third high-contrast palette to the existing dark/light toggle.
4. **Command palette:** keyboard-first project navigation, email copying, and résumé access via ⌘/Ctrl + K.
5. **Privacy-friendly analytics:** Plausible or Umami to understand which case studies recruiters explore, loaded without blocking rendering.
