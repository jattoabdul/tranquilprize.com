# TPSP website

This repository contains the public Tranquil Public Speaking Prize website.

- Preserve the current Astro static architecture and npm lockfile.
- Read README.md and src/data/event.ts before changing event details.
- Public arrivals and purple carpet are 8:30 a.m. WAT, programme start 9:00 a.m., public close 5 p.m.
  The 9:00-10:30 block absorbs late arrivals; the formal opening is 10:30 (owner, 2026-11-07).
- The programme of events lives in src/data/event.ts. After changing it, regenerate
  public/tpsp-2026-programme.pdf with npm run programme:pdf.
- Contestants in JS1–SS3 apply through the existing Google Form; Luma handles audience RSVPs.
- Do not introduce an application database, public student videos or private judging records.
- Use purple, warm white and restrained gold. Preserve accessible navigation and reduced motion.
- Do not add em dashes, decorative eyebrow labels, hairline dividers or invented event claims.
- Run npm run check and npm run test:browser before a release. Browser tests use local Workers assets.
- Keep environment files, tokens, local reports and private operational notes out of Git.
- Changes pushed to main deploy only after CI passes when CLOUDFLARE_DEPLOY_ENABLED is true.
- Production deployment, DNS changes, purchases and external messages require owner instruction.
