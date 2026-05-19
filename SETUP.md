# HAO Landing Setup

## Quick Start

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

## Where To Edit

| What | File |
|---|---|
| Contacts | `.env.local` |
| Content and data | `app/lib/data.ts` |
| Telegram and Google Sheets | `.env.local` |
| Teacher photos | `public/images/teachers/*.webp` |
| Review photos | `public/images/reviews/*.webp` |

## Public Contacts

Fill these values in `.env.local`:

```env
NEXT_PUBLIC_CONTACT_PHONE=+7 (900) 123-45-67
NEXT_PUBLIC_CONTACT_PHONE_RAW=+79001234567
NEXT_PUBLIC_CONTACT_EMAIL=hello@example.com
NEXT_PUBLIC_CONTACT_TELEGRAM=https://t.me/your_username
NEXT_PUBLIC_CONTACT_WHATSAPP=https://wa.me/79001234567
```

Restart the dev server after changing `NEXT_PUBLIC_*`.

## Telegram

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_IDS=123456789
```

You can list multiple chat IDs separated by commas.

## Google Sheets

```env
GOOGLE_SCRIPT_URL=
```

## Images

Use `next/image` for all raster images.

Recommended sizes:
- Teacher photos: `500x600`, format `WebP`
- Review photos: `200x200`, format `WebP`

Current teacher files:
- `teacher-siqin.webp`
- `mandy-zhang-a0EQFTH4ZfA-unsplash.webp`
- `teacher-alua.webp`
- `teacher-dai-wei.webp`
- `teacher-kai-nin.webp`

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

## Lint

```bash
npm run lint
npm run lint:fix
npm run lint:check
```
