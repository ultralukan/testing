## Установка зависимостей

```bash
npm i
```

## Запуск проекта

```bash
npm run dev
```
## Структура
- src/api - описание запросов на Backend
- src/app - страницы приложения(название - маршрут), глобальные стили/переменные стилей
- src/components - переиспользуемые компоненты приолжения
- src/containers - переиспользуемые контейнеры(состоящие из компонентов) приолжения
- src/store - создание хранилища и слайсов (методы по работе с хранилищем)
- src/axiosConfig - описание базового запроса, который используется в /api
- src/middleware - мидлвара nextjs для создания приаватных маршрутов и редиректа

- src/login/page.tsx - пример реализации авторизации с валидацией описанной в validation.ts