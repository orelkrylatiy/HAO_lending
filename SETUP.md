# HAO Landing Setup

## Quick Start

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

`npm install` also installs the repository pre-commit hook.

## Where To Edit

| What | File |
|---|---|
| Contacts | `app/lib/contacts.ts` |
| Content and data | `app/lib/data.ts` |
| Telegram and Google Sheets | `.env.local` |
| Lead submission | `app/api/submit/route.ts` |
| Lead validation / anti-spam helpers | `app/api/submit/lead-utils.mjs` |
| Teacher photos | `public/images/teachers/*.webp` |
| Review photos | `public/images/reviews/*.webp` |

## Public Contacts

Contacts (phone, email, Telegram, WhatsApp) are public site content — edit them directly in `app/lib/contacts.ts`.

## Lead Delivery

A successful lead submission means the lead has been saved to Google Sheets. Telegram is a secondary notification channel and does not determine whether the user sees success.

Flow:

```text
form -> /api/submit -> Google Sheets -> Telegram notification
                         |
                         +-> failed-leads.ndjson on Sheets failure (best effort)
```

The endpoint rejects malformed/oversized requests, validates the fields, uses a honeypot and minimum fill time, and applies an in-memory per-IP rate limit.

### Telegram

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_IDS=123456789
```

You can list multiple chat IDs separated by commas. Each recipient is handled explicitly; one failed Telegram delivery does not hide the result for the other recipients.

### Google Sheets

```env
GOOGLE_SCRIPT_URL=
```

The Google Sheets integration is the current source of truth for accepted leads. HTTP 4xx/5xx responses and timeouts are treated as failures.

### Failed lead fallback

If Sheets fails, the server tries to append the full lead to a local NDJSON file:

```text
.data/failed-leads.ndjson
```

You can override the path with:

```env
FAILED_LEADS_FILE=/secure/path/failed-leads.ndjson
```

The file contains personal data and must not be committed or exposed publicly. `.data/` is gitignored.

On Vercel/serverless the filesystem is ephemeral. The production fallback is therefore best effort only; use the structured server logs and move to durable storage if lead volume becomes business-critical.

## Logs and metrics

`/api/submit` writes structured JSON server logs with a `leadId`. Normal logs contain statuses, timings and errors but no name, phone or email. Typical events:

```text
lead.accepted
lead.sheets_saved
lead.sheets_failed
lead.fallback_saved
lead.telegram_sent
lead.telegram_partial
lead.completed
```

The client also sends Yandex Metrika goals without personal data:

```text
lead_submit_attempt
lead_submit_success
lead_submit_failed
```

## Images

Use `next/image` for all raster images.

Recommended sizes:
- Teacher photos: `500x600`, format `WebP`
- Review photos: `200x200`, format `WebP`

Current teacher files:
- `teacher-siqin.webp`
- `teacher-alua.webp`
- `teacher-dai-wei.webp`
- `teacher-kai-nin.webp`
- `teacher-li-wen.webp`

Current review files:
- `aiony-haust-3TLl_97HNJo-unsplash.webp`
- `ben-den-engelsen-eNyXK17so6A-unsplash.webp`
- `almos-bechtold-3402kvtHhOo-unsplash.webp`
- `icons8-team-FcLyt7lW5wg-unsplash.webp`
- `charlie-green-3JmfENcL24M-unsplash.webp`
- `meritt-thomas-aoQ4DYZLE_E-unsplash.webp`

Example review item:

```ts
{
  name: "Имя",
  role: "Курс",
  photo: "/images/reviews/review-name.webp",
  text: "Текст..."
}
```

Example teacher item:

```ts
{
  name: "Имя",
  role: "Преподаватель",
  spec: "Специализация",
  desc: "Описание.",
  img: "/images/teachers/teacher-name.webp"
}
```

## Quality checks

```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm test
npm run build
npm run check
```

Before every commit the installed hook formats staged source files, stages the formatting changes, runs ESLint with zero warnings, and runs the lead tests. GitHub Actions repeats lint, tests and production build for pull requests and pushes to `main`.
