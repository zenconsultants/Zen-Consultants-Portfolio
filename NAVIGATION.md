# Developer Sitemap and Navigation

This document maps the current Zen Consultants single-page application for developers who need to maintain navigation, routes, page sections, forms, or GitHub Pages output.

## Runtime Entry Points

- `src/main.tsx` mounts the React app into `#root`.
- `src/App.tsx` is the active application entry and currently contains the live page components, navigation handler, forms, and page switching logic.
- `src/index.css` contains the active styling for the live UI.
- `index.html`, `apply.html`, and `404.html` at the repository root are static built files from a prior deployment flow.
- `docs/` is generated GitHub Pages output. Do not place source documentation or hand-maintained app code there because `npm run build` refreshes it from `dist/`.

## Routing Model

The app is a lightweight React SPA without `react-router`.

Navigation is handled in `src/App.tsx` by:

- Reading `window.location.pathname`.
- Calling `window.history.pushState({}, "", href)` inside `navigate`.
- Updating local `path` state after navigation.
- Scrolling to a section when the target includes a hash.
- Falling back to the home page for any path that is not the candidate application route.

Recognized app-level routes:

| Route | Rendered view | Notes |
| --- | --- | --- |
| `/` | Home page | Main employer-focused landing page. |
| `/apply.html` | Candidate application page | Also copied as a static fallback during build. |
| `/apply` | Candidate application page | SPA-only alias handled by `src/App.tsx`. |
| Any other path | Home page | GitHub Pages uses `404.html` as an SPA fallback. |

## Public Sitemap

```text
/
├─ #home
├─ #services
├─ #hiring
├─ #industries
├─ #proof
├─ #process
├─ #candidate-cta
├─ #contact
└─ /apply.html
   └─ candidate application form
```

## Home Page Sections

| Section id | Navigation label | Source area | Purpose |
| --- | --- | --- | --- |
| `home` | Brand / top of page | `HomePage` hero | Main recruitment positioning and primary CTAs. |
| `services` | Services | `HomePage` services section | Recruitment, HR advisory, and payroll service cards. |
| `hiring` | Hiring Types | `HomePage` hiring section | Campus, leadership, mid-level, bulk, team-build, contract, FTE, and intern hiring. |
| `industries` | Industries | `HomePage` industries band | IT, Pharma, ITeS, Manufacturing, Retail, and Hospitality. |
| `proof` | Not in top nav | `HomePage` capabilities section | Capability cards for team setup, recruitment execution, HR/payroll support. |
| `process` | Process | `HomePage` process section | Four-step hiring workflow. |
| `candidate-cta` | Not in top nav | `HomePage` candidate CTA | Sends candidates to `/apply.html`. |
| `contact` | Hire Talent | `ContactSection` in `src/App.tsx` | Employer enquiry form and contact information. |

## Header Navigation

Home page header navigation in `src/App.tsx`:

| UI label | Target | Behavior |
| --- | --- | --- |
| Zen Consultants brand | `/` | Pushes home route and scrolls to top. |
| Services | `#services` | Smooth-scrolls to services. |
| Hiring Types | `#hiring` | Smooth-scrolls to hiring categories. |
| Industries | `#industries` | Smooth-scrolls to industries. |
| Process | `#process` | Smooth-scrolls to process. |
| Candidate Apply | `/apply.html` | Opens candidate application page. |
| Hire Talent | `#contact` | Smooth-scrolls to employer enquiry form. |

Candidate application page header navigation:

| UI label | Target | Behavior |
| --- | --- | --- |
| Zen Consultants brand | `/` | Returns home. |
| Home | `/` | Returns home. |
| Services | `/#services` | Returns home and scrolls to services. |
| Hire Talent | `/#contact` | Returns home and scrolls to contact. |

## Footer Navigation

Footer link groups are rendered by `SiteFooter` and `FooterLinks` in `src/App.tsx`.

| Footer group | Link labels | Target |
| --- | --- | --- |
| Services | Recruitment, HR Advisory, Payroll Management, Resume Writing | `/#services` |
| Hiring | Campus Hiring, Leadership Hiring, Bulk Hiring, Contract Hiring | `/#hiring` |
| Industries | IT, Pharma, Manufacturing, Retail | `/#industries` |

Footer links are grouped labels only. Each item in a group navigates to the same section target for that group.

## Forms and Submission Flows

### Employer Enquiry Form

Location: `ContactSection` inside `src/App.tsx`.

Route and section:

- `/`
- `#contact`

Required fields:

- `name`
- `company`
- `phone`
- `service`

Optional field:

- `message`

Submission target:

- `https://sheetdb.io/api/v1/4cy25wq4abc58`

Important behavior:

- Phone is validated by stripping non-digits and requiring at least 10 digits.
- Successful submissions reset the employer form.
- Failed submissions show a fallback message asking the user to email or WhatsApp directly.

### Candidate Application Form

Location: `ApplyPage` inside `src/App.tsx`.

Routes:

- `/apply.html`
- `/apply`

Required fields:

- `fullName`
- `email`
- `phone`
- `location`
- `industry`
- `experience`
- `jobType`
- `noticePeriod`
- `resume`
- `consent`

Optional field:

- `summary`

Important behavior:

- Email must match a basic email pattern.
- Phone must contain at least 10 digits.
- Resume must be `.pdf`, `.doc`, or `.docx`.
- Resume size must be below 5 MB.
- The form currently does not submit to a backend. It validates locally and displays a readiness message.

## Contact Links

Contact links are rendered in `ContactSection` inside `src/App.tsx`.

| Type | Value | Link |
| --- | --- | --- |
| Email | `zenconsultants2025@gmail.com` | `mailto:zenconsultants2025@gmail.com` |
| Phone | `+91 84315 02356` | `tel:+918431502356` |
| WhatsApp | Chat on WhatsApp | `https://wa.me/918431502356` |
| Office | Unit 101, Oxford Towers, No. 139/88 Old Airport Road, Bangalore 560008 | Text only |

## Build and GitHub Pages Output

Build command:

```powershell
npm run build
```

Build flow:

1. Vite builds the production app into `dist/`.
2. `scripts/copy-spa-fallback.mjs` copies `dist/index.html` to `dist/404.html`.
3. `scripts/copy-spa-fallback.mjs` copies `dist/index.html` to `dist/apply.html`.
4. `scripts/copy-spa-fallback.mjs` copies `CNAME` into `dist/`.
5. `scripts/copy-spa-fallback.mjs` writes `dist/.nojekyll`.
6. `scripts/copy-spa-fallback.mjs` replaces `docs/` with the contents of `dist/`.

GitHub Pages should serve from `main` using the `docs/` folder, with the custom domain defined in `CNAME`.

## Legacy or Inactive Source Files

The following files appear to be from an earlier app structure and are not imported by the active `src/main.tsx -> src/App.tsx` path:

- `src/pages/HomePage.tsx`
- `src/pages/ServicePage.tsx`
- `src/sections/AboutSection.tsx`
- `src/sections/ContactSection.tsx`
- `src/sections/PortfolioSection.tsx`
- `src/sections/ServicesSection.tsx`
- `src/components/ServiceCard.tsx`
- `src/components/ServiceHighlightsSection.tsx`
- `src/components/ServiceModulesSection.tsx`
- `src/components/ServicePageHero.tsx`
- `src/data/services.ts`

These files define an older portfolio/service-page model with slugs such as `strategic-staffing`, `pnl-management`, `workforce-optimization`, and `software-development`. If reintroducing service detail pages, first decide whether to revive that model or remove the unused files to avoid confusing future developers.

## Maintenance Checklist

When adding or changing navigation:

1. Update `navItems` in `src/App.tsx` for home header links.
2. Add or rename the matching `id` on the destination section.
3. Update `SiteFooter` or `FooterLinks` when footer groups change.
4. Add any new SPA route to the `isApplyPage`-style route switch in `src/App.tsx`.
5. If the new route must load directly on GitHub Pages, update `scripts/copy-spa-fallback.mjs` to create a static fallback HTML file for it.
6. Run `npm run build` so `docs/` is regenerated for GitHub Pages.
7. Update this document when public routes, anchors, forms, or deployment behavior changes.
