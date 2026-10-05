# Delivery verification

Verified locally on 5 October 2026 with Node 22.14.0, Next.js 16.3.8, and Playwright Chromium 153 on macOS.

## Production checks

| Check | Result |
| --- | --- |
| `npm run lint` | Passed, zero warnings |
| `npm run typecheck` | Passed |
| `npm run build` | Passed; homepage, 404, robots, and sitemap prerendered |
| `npm run test:e2e` | 11 passed; optional Formspree test skipped in the mailto build |
| Formspree-configured production build + endpoint test | Passed; mocked failure preserves text, mocked success clears form |
| GitHub Pages static export with `/prem-portfolio` base path | Passed build and browser smoke check |

The Pages smoke check served the exported files at a real subdirectory URL and verified successful asset responses, hydration, theme switching, ML filtering, project dialog/Escape, and the prefixed canonical URL at 360px.

The main browser suite verified 360 / 768 / 1280 / 1920px layouts without horizontal overflow, WCAG AA axe rules in both themes, theme persistence, project/skill filters, keyboard dialog dismissal and focus restoration, mobile navigation, clipboard copying, the pending résumé state, required/email form validation, honest email-draft feedback, the pointer-reactive hero, magnetic buttons, and motion-enabled active-section navigation. No real email was sent during testing.

## Lighthouse — initial design delivery

Command: `AUDIT_URL=http://127.0.0.1:3001/ npm run audit`

| Profile | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Mobile | **97** | **100** | **100** | **100** |
| Desktop | **99** | **100** | **100** | **100** |

Complete HTML and JSON reports are in the workspace `reports/` directory. These are local measurements of this delivery; rerun the included audit against your deployed URL after adding real screenshots or other integrations.

## Content to personalize before publishing

Add your real résumé PDF, project screenshots, individual repository/live URLs, the missing case-study problem/outcome evidence, and FuelLog’s implementation stack. Set the production canonical origin. The current placeholders and résumé feedback intentionally identify those missing inputs.

Vercel, Netlify, and GitHub Pages configuration is prepared. No hosting account or domain was modified, and the site has not been publicly deployed.

## Follow-up: fast GitHub Pages updates

The Pages workflow now triggers on every push to `main` as well as manual dispatch. Project indices, project totals, and filter categories derive from `data/portfolio.ts`; a generic title-based artwork style supports new projects without component edits. Browser expectations also derive project totals from the data, so adding a project does not invalidate fixed-count assertions.

After these changes, lint, typecheck, the standard production build, and all 11 default browser tests passed again (the optional Formspree test remains skipped for the mailto build). The workflow YAML was parsed and its push/manual triggers checked. A fresh static export passed a subdirectory browser check with motion enabled: assets, active navigation, project count, theme, ML filtering, dialog/Escape, 360px layout, and canonical URL. The Lighthouse figures above refer to the original design audit, before this content-maintenance update.

The résumé/clipboard browser check now follows the configured data: it verifies the missing-résumé feedback by default and checks the PDF link and response when a résumé is configured. Lint, typecheck, and the targeted default-state test passed after that maintenance adjustment. The PDF branch awaits your actual résumé file.
