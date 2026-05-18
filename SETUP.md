# HAO Лендинг — Инструкция по настройке

## Быстрый старт

```bash
cp .env.local.example .env.local   # создай файл с настройками
npm install
npm run dev                         # http://localhost:3000
```

---

## Где что менять

| Что нужно изменить | Файл |
|---|---|
| Контакты (телефон, email, Telegram, WhatsApp) | `.env.local` |
| Тексты и данные (отзывы, преподаватели, FAQ, шаги, программы, тарифы) | `app/lib/data.ts` |
| Настройки Telegram и Google Sheets | `.env.local` |
| Фото преподавателей | `public/images/teacher-*.jpg` |
| Фото отзывов | `public/images/review-*.jpg` |

---

## 1. Контакты на сайте

Открой `.env.local` и заполни блок `NEXT_PUBLIC_`:

```env
NEXT_PUBLIC_CONTACT_PHONE=+7 (900) 123-45-67
NEXT_PUBLIC_CONTACT_PHONE_RAW=+79001234567
NEXT_PUBLIC_CONTACT_EMAIL=hello@haoznaet.ru
NEXT_PUBLIC_CONTACT_TELEGRAM=https://t.me/твой_username
NEXT_PUBLIC_CONTACT_WHATSAPP=https://wa.me/79001234567
```

После изменений перезапусти сервер (`npm run dev`).

---

## 2. Уведомления в Telegram

### Шаг 1 — Создай бота

1. Напиши [@BotFather](https://t.me/BotFather) в Telegram
2. Отправь команду `/newbot`
3. Задай имя и username бота
4. Скопируй **токен** вида `7123456789:AAF...`

### Шаг 2 — Узнай chat_id

1. Напиши своему новому боту любое сообщение
2. Открой в браузере:
   ```
   https://api.telegram.org/bot<ТОКЕН>/getUpdates
   ```
3. Найди в ответе `"chat": { "id": 123456789 }` — это твой chat_id

### Шаг 3 — Заполни .env.local

```env
TELEGRAM_BOT_TOKEN=7123456789:AAFxxxxxxxxxxxxxxxxxxxxxxx
TELEGRAM_CHAT_IDS=123456789
```

### Несколько получателей

Чтобы уведомления приходили нескольким людям — перечисли chat_id через запятую:

```env
TELEGRAM_CHAT_IDS=123456789,987654321,555000111
```

> **Важно:** каждый получатель должен сам написать боту хоть одно сообщение, иначе бот не сможет ему писать.

---

## 3. Google Таблица (необязательно)

### Шаг 1 — Создай таблицу

1. Открой [Google Sheets](https://sheets.google.com) и создай новую таблицу
2. Назови столбцы в первой строке: `Дата`, `Имя`, `Телефон`, `Email`

### Шаг 2 — Добавь Apps Script

1. В таблице: **Расширения → Apps Script**
2. Вставь код:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow() + 1;

    // Сначала форматируем столбец телефона как текст,
    // иначе Sheets воспринимает +7... как формулу и показывает #ERROR!
    sheet.getRange(lastRow, 3).setNumberFormat('@STRING@');
    sheet.getRange(lastRow, 1, 1, 4).setValues([[
      data.date,
      data.name,
      data.phone,
      data.email
    ]]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Шаг 3 — Разверни скрипт

1. Нажми **Развернуть → Новое развёртывание**
2. Тип: **Веб-приложение**
3. Выполнять от имени: **Я**
4. Доступ: **Все**
5. Нажми **Развернуть** → скопируй URL

### Шаг 4 — Добавь в .env.local

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/ВАШ_ID/exec
```

---

## 4. Фото и контент

### Замена фотографий преподавателей

Замени файлы в `public/images/`:

| Файл | Преподаватель |
|---|---|
| `peng-jin-photo.jpg` | Пэн Цзин (реальное фото) |
| `teacher-li-na.jpg` | Ли На (временное) |
| `teacher-sun-mei.jpg` | Сунь Мэй (временное) |
| `teacher-wang-tao.jpg` | Ван Тао (временное) |

Рекомендуемый размер: **500×600px**, формат JPG/WebP.

### Замена фотографий в отзывах

| Файл | Студент |
|---|---|
| `teacher-peng-jin.webp` | Анна Гернер / Александра |
| `teacher-dai-wei.jpg` | Никита |
| `teacher-siqin.jpg` | Елена Форонова |
| `teacher-alua.jpg` | Тимур |
| `teacher-kai-nin.webp` | Анастасия |

Рекомендуемый размер: **200×200px**, формат JPG.

### Редактирование текстов

Все данные (отзывы, шаги, FAQ, программы, тарифы) — в `app/lib/data.ts`.

Пример — добавить отзыв:

```typescript
// app/lib/data.ts
export const REVIEWS = [
  // ... существующие
  {
    name: "Иван",
    role: "Разговорный китайский",
    photo: "/images/review-ivan.jpg",
    text: "Текст отзыва...",
  },
];
```

### Редактирование преподавателей

```typescript
// app/lib/data.ts
export const TEACHERS = [
  {
    name: "Имя Фамилия",
    role: "Преподаватель китайского",
    spec: "Специализация",
    desc: "Описание преподавателя.",
    img: "/images/teacher-имя.jpg",
  },
  // ...
];
```

---

## 5. Запуск на VPS через systemd

Если сайт запускается на VPS, не поднимай production-сервер как одноразовый фоновый процесс (`nohup`, ручной `next start`, закрытая SSH-сессия и т.п.).

### Почему сайт может падать

Если порт, например `3010`, больше не слушает, локальный `curl` не проходит, снаружи сайт тоже недоступен, процесса `next start` / `node` нет, а лог давно не обновлялся — значит процесс просто умер и его никто не поднял обратно.

Проблема в таком случае не в вёрстке и не в Next.js, а в способе запуска.

### Что использовать

Для VPS лучше использовать `systemd + next start`.

Почему `systemd`:

- автозапуск после ребута сервера
- автоматический restart при падении процесса
- нормальный системный сервис
- для одного Next-проекта проще и чище, чем PM2

PM2 тоже допустим, но для этого проекта он не нужен как основной вариант. `systemd` решает задачу напрямую.

### Готовые файлы

В проекте уже есть готовые файлы:

- `deploy/systemd/hao-lending.service` — шаблон systemd-сервиса
- `deploy/systemd/install-service.sh` — установщик сервиса на VPS

По умолчанию они рассчитаны на:

- директорию проекта: `/var/www/HAO`
- порт: `3010`
- пользователя: `www-data`
- сервис: `hao-lending`

### Что делает сервис

```ini
[Unit]
Description=HAO Lending Next.js app
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/HAO
Environment=NODE_ENV=production
Environment=PORT=3010
ExecStart=/usr/bin/npm run start
Restart=always
RestartSec=5
User=www-data
Group=www-data
KillSignal=SIGINT
TimeoutStopSec=30

[Install]
WantedBy=multi-user.target
```

### Установка на VPS

На сервере сначала подготовь проект:

```bash
npm install
npm run build
```

Затем из корня проекта:

```bash
sudo ./deploy/systemd/install-service.sh
```

Если путь, порт или пользователь отличаются:

```bash
sudo APP_DIR=/var/www/HAO PORT=3010 APP_USER=www-data APP_GROUP=www-data ./deploy/systemd/install-service.sh
```

Проверка статуса:

```bash
sudo systemctl status hao-lending
```

Логи сервиса:

```bash
sudo journalctl -u hao-lending -f
```

После изменений в коде:

```bash
git pull
npm install
npm run build
sudo systemctl restart hao-lending
```

---

## 6. Деплой на Vercel

1. Загрузи проект на GitHub (уже сделано)
2. Открой [vercel.com](https://vercel.com) → **Import Project** → выбери репозиторий
3. В настройках проекта: **Settings → Environment Variables**
4. Добавь все переменные из `.env.local` (скопируй каждую)
5. Нажми **Deploy**

> Файл `.env.local` не заливается на GitHub — это нормально и правильно.
> На Vercel переменные добавляются вручную через интерфейс.
# Lint
# npm run lint
# npm run lint:fix
# npm run lint:check
