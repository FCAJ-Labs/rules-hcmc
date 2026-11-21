# AGENTS.md

FCAJ Rules: a Vietnamese documentation site for the FCAJ South Campus (Bitexco, HCMC), built with [Blume](https://www.npmjs.com/package/blume) (Astro-based) and deployed to Vercel.

## Commands

- `pnpm install` — install dependencies (pnpm only; keep `pnpm-lock.yaml` in sync).
- `pnpm dev` — local dev server.
- `pnpm build` — production build to `.vercel/output/`. Run it after content or config changes; it fails on broken image paths.
- `pnpm typecheck` — Blume/Astro type check. Must report 0 errors.
- `pnpm fmt` — Prettier (tabs, width 100, `prettier-plugin-astro`).

Blume's own docs ship in `node_modules/blume/docs/` (configuration, content, components). Read them before guessing at Blume APIs.

## Layout

- `blume.config.ts` — site config (i18n `vi` only, theme fonts, SEO, AI assistant, rate limit, Vercel adapter).
- `components.ts` — registers the layout overrides in `components/`.
- `components/` — `Sidebar` and `Pagination` scope navigation to one audience; `PageFooter` adds Vercel Speed Insights and ArrowLeft/ArrowRight page navigation (`fcaj-keyboard-navigation.ts`).
- `components/navigation/` — audience logic: routes under `/events` belong to the Events audience, everything else to Internship. Keep sidebar and pagination using the same helpers.
- `contents/` — all pages (MDX):
  - `(internship)/` — Internship pages; the route group adds no URL prefix (`/instructions/...`, `/regulations/...`).
  - `events/` — Bitexco Events pages under `/events/...`.
  - `_shared/` — snippets included from both audiences, never routed on their own.
  - `index.mdx` (custom landing page), `internship.mdx`.
- `assets/images/` — content images, referenced from MDX by relative path.
- `public/` — files served as-is (logos, favicon). Not optimized at build time.
- `theme.css` — site-wide style overrides.

## Content conventions

- Write page text in Vietnamese, matching the tone of existing pages.
- Each folder has a `meta.ts` using `defineMeta`; add new pages to its `pages` array in the intended order, or they will not appear where expected.
- Frontmatter: `title`, plus `sidebar.label` when the sidebar text differs.
- Use Blume components already in use (`<Steps>`/`<Step>`, `<Callout>`) rather than raw HTML.
- Put text shared by Internship and Events in `contents/_shared/` and include it with `<include>/_shared/path.mdx</include>`. Pass variables as attributes (`<include occasion="...">`) and read them as `{{occasion}}`.
- Internal links use absolute routes with anchors, e.g. `/regulations/diligence#huy-dang-ky`.
- Every image needs descriptive Vietnamese alt text.

## Images

Images are most of the site's weight, so keep them small:

- Photos: JPEG, at most 1600px on the long side, quality ~82, metadata stripped. Do not store photos as PNG.
- Screenshots: PNG is fine; strip metadata and recompress.
- `public/` images are shipped unprocessed. Size them for display (the header logo renders 32px tall, so logos are 80px tall).
- Delete images that no page references.
- The orb's `magick` binary may not run; `convert` (ImageMagick 6) works.

## Code style

- Prettier settings in `.prettierrc`; run `pnpm fmt` on changed files.
- TypeScript with explicit types on exported functions; `.ts` extensions in local imports.
- Do not add code comments unless asked.

## Verification

Before finishing a change, run `pnpm typecheck` and `pnpm build`. For visual changes, run `pnpm dev` and check the affected pages in both light and dark mode.
