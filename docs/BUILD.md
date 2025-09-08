# Сборка и локальный запуск

Это статический проект на HTML/CSS/JS. Сборки как таковой нет — для локальной разработки достаточно запустить dev-сервер.

1) Установка зависимостей

```bash
npm install
```

2) Локальный запуск (dev)

```bash
npm start
```

Скрипт `start` в `package.json` использует `servor` для развёртывания файла из корня проекта с авто-перезагрузкой при изменениях.

3) Опции для продакшн-готового деплоя

- Минимизируйте и оптимизируйте CSS/JS (например, через `parcel`, `vite` или `esbuild`) перед деплоем.
- Оптимизируйте изображения (webp, lazy-loading) и используйте CDN.
- Настройте CI (GitHub Actions) для автоматического деплоя при push в ветку `main`.

Пример простого шага в GitHub Actions для деплоя на GitHub Pages представлен ниже (инициализационный пример):

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build || true
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

> Примечание: в этом репозитории нет сборочного шага по умолчанию (`npm run build`), поэтому в примере он помечен `|| true`. При добавлении сборщика (vite/parcel) замените шаг на корректную команду сборки и укажите `publish_dir` на папку с результатом (например `dist/`).
