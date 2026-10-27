# Papeles

A guide to Philippine government requirements. Search for a document or service (passport, NBI clearance, PSA birth certificate, driver's license, TIN) and get:

- a requirements checklist you can tick off and print
- the steps in order
- fees and payment methods
- where to go
- processing times
- crowd-reported wait times per branch

Each item shows when it was last checked against the official source.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Fuse.js, Prisma 7 and SQLite.

## Getting started

Requires Node.js 22.18+ or 24.11+.

```bash
corepack pnpm install          # also generates the Prisma client
cp .env.example .env           # then set IP_HASH_SALT to a random string
corepack pnpm db:migrate       # creates prisma/dev.db
corepack pnpm dev              # http://localhost:3000
```

> On this machine the global `npm` is broken, so use `corepack pnpm …`, which ships with Node. Reinstalling Node fixes npm.

### Scripts

| Command                                      | What it does                                     |
| -------------------------------------------- | ------------------------------------------------ |
| `pnpm dev`                                   | Dev server                                       |
| `pnpm build` / `pnpm start`                  | Production build / server                        |
| `pnpm lint`, `pnpm typecheck`, `pnpm format` | ESLint, TypeScript, Prettier                     |
| `pnpm db:migrate`                            | Apply schema changes in development              |
| `pnpm db:deploy`                             | Apply migrations in production                   |
| `pnpm db:studio`                             | Browse wait-time reports and outdated-info flags |

## Editing service data

Each service is one typed file in [`data/services/`](data/services/). The schema is in [`data/schema.ts`](data/schema.ts).

- **Never guess.** If a value isn't confirmed on an official page, use `TODO` (the string `"TODO: verify"`). The site shows it as **Not yet verified**.
- Every service, requirement, step, fee, processing time, payment block and office has `lastVerified` (`"YYYY-MM-DD"`, or `null` if never checked) and `sourceUrl` (an official `.gov.ph` page or the agency's own portal).
- When you confirm something, update **both** fields. Items older than 90 days get a yellow "May be outdated" warning automatically.
- `id`s are stored in visitors' checklists and in the database, so don't rename them casually.
- `variants` (e.g. "New" vs "Renewal") plus `appliesTo` on items control what shows for each choice.

To add a service, create a file next to the others and add it to [`data/services/index.ts`](data/services/index.ts). The build checks for duplicate ids and unknown variants.

[`VERIFY.md`](VERIFY.md) lists what still needs to be checked against official sources.

## Reports and moderation

- `POST /api/wait-times`: `{ serviceSlug, officeId, waitMinutes, visitDate }`
- `GET /api/wait-times?service=<slug>`: per-branch average and median for the last 30 days. An average only appears after 2 reports.
- `POST /api/flags`: `{ serviceSlug, itemType, itemId?, message? }`

Inputs are validated with Zod against the real service data. Spam protection includes:

- a honeypot field
- per-IP rate limits: 5 wait reports and 10 flags per hour, counted in the database
- one wait report per branch per day per IP

Only a salted hash of the IP (`IP_HASH_SALT`) is stored. Behind a proxy or CDN, make sure it sets `X-Forwarded-For`.

Outdated-info flags land in the `OutdatedFlag` table with `status = "open"`. Review them with `pnpm db:studio`.

## Performance

The site is built for low-end phones and slow connections:

- Pages are static HTML. Guides arrive complete, with no loading skeleton and nothing that depends on JavaScript to appear.
- Text uses the device's **system font**, so there's no web font to download and no text jump while one loads.
- Only small interactive "islands" ship JavaScript: search, checklist boxes, share, report dialog and wait times. The homepage guide list is plain server HTML.
- Fuse.js loads on first use of the search box, and wait times load only when that section scrolls into view.
- Variant filtering is pure CSS (`:has()`), there are no entrance animations, and off-screen sections skip rendering until scrolled near (`content-visibility`).

On a simulated budget phone (4× CPU slowdown, 1.6 Mbps, empty cache), pages paint their main content in about 0.7 s, finish loading in about 1.3 s, and have no layout shift. A guide page loads about 155 KB of gzipped JS, of which roughly 138 KB is the React/Next.js baseline. Avoid adding heavy client libraries or web fonts.

The site always opens in **light mode**. The header toggle switches to dark mode, and the choice is remembered on that device.

## Deploying to Vercel

1. Push this repo to GitHub with `git push` (don't use "Add files via upload": it skips folders and can upload `.env`).
2. Create a free [Turso](https://turso.tech) database and an auth token. Vercel can't keep a SQLite file between requests.
3. In Vercel → Project → Settings → Environment Variables, set `DATABASE_URL` (the `libsql://…` URL), `DATABASE_AUTH_TOKEN`, and `IP_HASH_SALT` (a new random string).
4. Create the tables once, from your computer: put the same `DATABASE_URL` and `DATABASE_AUTH_TOKEN` in `.env`, run `pnpm db:migrate:remote`, then switch `.env` back to the local file.
5. Redeploy. Run `pnpm db:migrate:remote` again whenever you add a new migration.

## Moving to Postgres later

1. In `prisma/schema.prisma`, change `provider = "sqlite"` to `"postgresql"`.
2. In `lib/db.ts`, swap `@prisma/adapter-libsql` for `@prisma/adapter-pg`.
3. Point `DATABASE_URL` at the new database and run `pnpm db:migrate`.

Alternatively, the libSQL adapter already works with a hosted Turso database.
