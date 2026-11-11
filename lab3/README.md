# Лабораторная работа №3 — Каталог товаров

Products (вариант 2), Next.js App Router, TypeScript, DummyJSON.

## Реализовано

- Zod-схемы создания и редактирования; повторная серверная валидация.
- Auth.js Credentials: вход, выход, JWT-сессия в cookie.
- Роли user (просмотр, создание, изменение) и admin (включая удаление).
- Защита главной страницы и динамической страницы товара проверкой сессии на сервере.
- Защита GET и DELETE Route Handler: без сессии возвращается 401, без роли администратора для удаления — 403.
- Проверка доступа в Server Functions; сервер повторно проверяет права перед мутацией.
- Компонентные тесты Vitest, React Testing Library и user-event.
- Тесты контроля доступа к динамической странице и GET API.
- Coverage: npm run coverage.

## Демо-аккаунты

user@example.com / user123 — user.
admin@example.com / admin123 — admin.

## .env.local

```dotenv
AUTH_SECRET=длинный-случайный-секрет
AUTH_URL=http://localhost:3000
```

Секрет можно сгенерировать командой `npx auth secret`.

## Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:3000.

Проверки:

```bash
npm test
npm run coverage
npm run build
```

HTML-отчёт о покрытии: `coverage/index.html`.

## Предметные правила

Название не короче 3 символов; цена больше нуля; скидка 0–100%; остаток — целое неотрицательное число; URL изображения корректен.

DummyJSON имитирует мутации без постоянного сохранения. Изменения отображаются в Zustand до перезагрузки.
