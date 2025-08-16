
# Products SPA — Next.js 15 + Tailwind + Zustand (GH Pages)

**Главная:** `/products`  
**Детальная:** `/products/:id`  
**Создание:** `/create-product`

## Ключевые решения
- `output: "export"` для статического экспорта на GitHub Pages
- `basePath` и `assetPrefix` настроены на `/app-products`
- `generateStaticParams` для предвычисления страниц `/products/:id`
- Картинки через `next/image` с `unoptimized: true` (статический хостинг)
- Клиентские компоненты вынесены отдельно; стор — Zustand
- Поиск, фильтр Избранного, удаление, лайки, пагинация
- Создание продукта и хранение во внутреннем сторе
- Анимации Framer Motion; стек Tailwind + «шадовский» стиль UI-компонентов
- Футер прижат к низу, SEO-семантика без комментариев в коде

> Важное ограничение: на GitHub Pages нельзя исполнять API-роуты Next.js.  
> Для списка товаров используется публичное API с CORS: `https://dummyjson.com`.

## Локальный запуск
```bash
npm i
npm run dev
```

## Билд и деплой на GitHub Pages
1. Убедись, что репозиторий называется **app-products** (или поправь `repoName` в `next.config.mjs`).
2. Включи GitHub Pages в Settings → Pages → Branch: `gh-pages`, `/ (root)`.
3. Выполни:
```bash
npm run predeploy
npm run deploy
```
Это соберёт в `out/` и запушит в ветку `gh-pages`.

Если репо называется по-другому, измени `repoName` в `next.config.mjs` на фактическое имя.

## Частые проблемы
- **`module is not defined in ES module scope`** — не используй `module.exports` в `next.config.mjs`. Здесь уже ESM и `export default`.
- 404/сломанная статика на GH Pages — проверь `basePath/assetPrefix` и что деплой идёт именно из `out/`.
- Картинки не грузятся — на GH Pages нужно `images.unoptimized = true`.

## Лицензия
MIT
