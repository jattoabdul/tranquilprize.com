# Tranquil Public Speaking Prize

The public website for TPSP 2026: [tranquilprize.com](https://tranquilprize.com).
A static Astro site with locally hosted Outfit and Source Sans 3 fonts.

## Development

Use the Node version in `.node-version` and the npm lockfile.

```sh
npm ci
npm run dev
```

Preview at http://127.0.0.1:4322. To inspect production output, run `npm run build` and `npm run preview`.

## Content

- `/`: event, competition journey, audience information and FAQs.
- `/enter/`: contestant eligibility, audition instructions and Google Form link.
- `/participation/`: privacy, guardian role and filming information.
- `src/data/event.ts`: shared confirmed event facts and registration destinations.

Public arrivals: 9:30 a.m. WAT. Programme: 10:30 a.m. WAT. Close: 5:00 p.m. WAT.
Applications remain in the organiser-owned Google Form. Free audience RSVPs remain in Luma.
No application database, review dashboard, registration embed or analytics is included.
Unconfirmed deadlines, upload/language rules and notification details must be verified with the organiser.

## Validation

```sh
npm run check
npx playwright install chromium
npm run test:browser
npm run deploy:dry-run
```

The build check verifies routes, anchors, assets, metadata, timings and approved outbound destinations.
Browser checks start a local Cloudflare Workers asset server and exercise mobile/desktop layouts,
WCAG accessibility checks, keyboard interactions, reduced motion, CSP, custom 404 and no-JS navigation.
Tests never submit applications or RSVPs. CI additionally checks dependency advisories.

## Cloudflare Workers deployment

`wrangler.jsonc` configures the static `dist/` directory, proper 404 responses, trailing-slash URLs,
and the `production` environment. The custom domains are `tranquilprize.com` and
`www.tranquilprize.com`; `www` redirects to the canonical apex, preserving path and query.
A small Worker handles this host redirect and forwards other requests to the static assets binding.
No database or Railway service is needed.

GitHub Actions validates changes on pull requests and main. The production job deploys the exact
validated build artifact only after validation succeeds, on main only, with a production environment.
Configure these GitHub Actions values to enable automatic deployment:

- Secret `CLOUDFLARE_API_TOKEN`: a dedicated deployment token for the owning Cloudflare account,
  with Workers editing access and Workers Routes editing access for tranquilprize.com.
- Variable `CLOUDFLARE_ACCOUNT_ID`: the owning Cloudflare account ID.
- Variable `CLOUDFLARE_DEPLOY_ENABLED`: `true` after the deployment credential is installed.

Do not copy local OAuth or refresh tokens into CI. Provider credentials belong in encrypted secrets.
The deploy flag is an explicit setup switch, not evidence that credentials or a deployment work.

For an authorised local release:

```sh
npm run check
npm run test:browser
npm run deploy:dry-run
npm run deploy
npm run smoke:live
```

Inspect releases with `npx wrangler deployments list --env production`. If a release fails functional
checks, roll back to a previously verified version using `npx wrangler rollback VERSION_ID --env production`,
then fix the source before redeploying. The first release has no previous application version to restore.
Do not remove the entire DNS zone or alter unrelated mail records as a rollback.

## Assets and design

The layout takes inspiration from Superlocal's festival-poster composition. The implementation uses
TPSP content and the organiser-requested purple, warm white and gold. It retains that print-style palette
under either OS colour preference. Motion is limited to interaction feedback.

`src/assets/tpsp-cover-concept.png` is the owner-supplied event-cover concept, not an official logo.
Astro builds responsive WebP versions and a PNG for social sharing. The typographic identity is interim.
No student photography, generated people, judge biographies, endorsements or unconfirmed prizes are used.
Fonts are distributed under the SIL Open Font License through Fontsource.

The Sharp override applies the patched 0.35.5 release to the local Wrangler/Miniflare toolchain;
remove it only once the upstream dependency resolves to a patched version without the override.
