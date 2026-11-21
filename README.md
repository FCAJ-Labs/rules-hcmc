# FCAJ Rules

Vietnamese documentation site for the FCAJ South Campus (Bitexco, HCMC), built with [Blume](https://www.npmjs.com/package/blume) and deployed to Vercel.

## Development

```sh
pnpm install
pnpm dev
```

| Command          | Description                              |
| ---------------- | ---------------------------------------- |
| `pnpm dev`       | Start the local dev server               |
| `pnpm build`     | Build for production to `.vercel/output` |
| `pnpm typecheck` | Run the Blume/Astro type check           |
| `pnpm fmt`       | Format files with Prettier               |
| `pnpm up`        | Check for dependency updates with taze   |

## Structure

- `contents/(internship)/` — Internship pages
- `contents/events/` — Bitexco Events pages under `/events`
- `contents/_shared/` — snippets shared by both audiences
- `components/` — layout overrides (sidebar, pagination, page footer)
- `assets/images/` — content images
- `public/` — static files served as-is

## Dependencies

Dependency updates are managed by [Renovate](https://docs.renovatebot.com/) via `.github/renovate.json`.
