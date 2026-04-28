# HAO Lending — AI Agent Instructions

## Контекст проекта

**HAO** — лендинг школы китайского языка. Сайт принимает заявки через форму, отправляет уведомления в Telegram и записывает в Google Sheets.

**Стек:** Next.js 16 (App Router), TypeScript, Tailwind CSS, задеплоен на Vercel.

> ⚠️ Это Next.js 16 с breaking changes. Перед правками по роутингу/серверным компонентам читай `node_modules/next/dist/docs/`.

---

## Карта файлов

| Что менять | Файл |
|---|---|
| Тексты: отзывы, преподаватели, FAQ, шаги, программы, тарифы | `app/lib/data.ts` |
| Контакты (телефон, email, Telegram, WhatsApp) | `.env.local` → `NEXT_PUBLIC_CONTACT_*` |
| Обработка формы (Telegram, Google Sheets) | `app/api/submit/route.ts` |
| Глобальные стили и CSS-компоненты | `app/globals.css` |
| Компоненты страницы | `app/components/` |
| Общие UI (карусель, кнопки) | `app/components/ui/` |
| Фото преподавателей | `public/images/teacher-*.jpg` |
| Фото в отзывах | `public/images/review-*.jpg` |
| Переменные окружения (шаблон) | `.env.local.example` |

---

## Правила

### Контент
- Все тексты, массивы данных и конфигурация секций — только в `app/lib/data.ts`.
- Контактные данные — только через `app/lib/contacts.ts` (читает из `process.env`), не хардкоди в JSX.
- Не трогай `.env.local` — им управляет владелец проекта.

### Код
- Клиентские компоненты (`"use client"`) — только если нужны хуки или события браузера. Всё остальное — серверные.
- Новые переиспользуемые UI-элементы → `app/components/ui/`.
- CSS: сначала ищи существующий класс в `globals.css` (`.btn-primary`, `.btn-outline`, `.badge-light`, `.carousel-btn`). Новые компонентные классы добавляй в `@layer components`.
- Tailwind-классы в JSX, кастомный CSS — только если Tailwind не справляется.

### Изображения
- Используй `next/image` (`<Image>`), всегда указывай `width`, `height`, `alt`.
- Оптимальный размер фото: преподаватели — 500×600px, отзывы — 200×200px.

### API / форма
- Секреты только в `.env.local` (без `NEXT_PUBLIC_` — они не видны клиенту).
- Время всегда в МСК: вычисляй вручную `new Date().getTime() + 3*60*60*1000`, не используй `toLocaleString` с таймзоной (не работает на всех серверах).
- Телефон в Google Sheets отправляй с пробелом в начале (`" " + phone`), иначе `+7...` интерпретируется как формула → `#ERROR!`.

---

## Типичные задачи

**Добавить отзыв** → `app/lib/data.ts`, массив `REVIEWS`:
```ts
{ name: "Имя", role: "Курс", photo: "/images/review-имя.jpg", text: "Текст..." }
```

**Добавить преподавателя** → `app/lib/data.ts`, массив `TEACHERS`:
```ts
{ name: "Имя", role: "Преподаватель", spec: "Специализация", desc: "Описание.", img: "/images/teacher-имя.jpg" }
```

**Изменить тариф/программу** → `app/lib/data.ts`, массивы `PROGRAMS` / `PRICING`.

**Изменить контакты** → `.env.local`, переменные `NEXT_PUBLIC_CONTACT_*`.

**Добавить получателя уведомлений** → `.env.local`:
```
TELEGRAM_CHAT_IDS=111111111,222222222
```
Каждый получатель должен написать боту хотя бы одно сообщение.
