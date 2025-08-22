# ProductsHub - Тестовое приложение

SPA приложение для управления каталогом товаров с возможностью добавления, редактирования, поиска и фильтрации.

## 🚀 Функциональность

- **Просмотр товаров**: Сетка карточек с информацией о товарах
- **Избранное**: Лайк и фильтрация избранных товаров
- **Поиск**: Поиск по названию, описанию, бренду и категории
- **Добавление/редактирование**: Формы создания и редактирования товаров
- **Пагинация**: Постраничный вывод товаров
- **Адаптивный дизайн**: Оптимизация для мобильных устройств

## 🛠 Технологический стек

- **React** + **TypeScript**
- **Zustand** (управление состоянием)
- **React Router** (навигация)
- **Tailwind CSS** (стилизация)
- **Framer Motion** (анимации)
- **Vite** (сборка)

## 📦 Установка и запуск

### Предварительные требования

- Node.js 16+
- npm или yarn

### Установка

```bash
git clone https://github.com/NerpaBosikom/app-products.git
cd app-products
npm install
```

### Запуск в development режиме

```bash
npm run dev
```

### Сборка для production

```bash
npm run build
```

### Превью сборки

```bash
npm run preview
```

### Деплой на GitHub Pages

```bash
npm run deploy
```

## 🎯 Особенности реализации

- Offline-first подход с fallback на локальные данные
- Валидация форм на клиенте
- Оптимизированная работа с большими списками
- Persistence состояния в localStorage
- Кастомные хуки и утилиты

## 📁 Структура проекта

```
src/
├── components/     # React компоненты
├── pages/         # Страницы приложения
├── store/         # Zustand store
├── lib/           # Вспомогательные утилиты
├── types.ts       # TypeScript типы
└── index.css      # Глобальные стили
```

## 🌐 Публичное API

Основной источник — `https://dummyjson.com/products?limit=100` (открытый CORS). Если сеть недоступна, используется локальный `lib/sampleProducts.json`.

## 🧭 Навигация

- `/` или `/products` — главная страница с товарами
- `/products/:id` — детальная страница товара
- `/edit-product/:id` — редактирование товара
- `/create-product` — создание нового товара

## 🚀 Деплой

Приложение доступно на GitHub Pages: [https://nerpabosikom.github.io/app-products/](https://nerpabosikom.github.io/app-products/)


