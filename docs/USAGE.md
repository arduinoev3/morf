# Руководство по использованию

Это руководство поможет разработчикам и деплой-инженерам быстро понять, как работать с проектом.

## Локальная разработка

- Клонируйте репозиторий и установите зависимости:

    git clone <repo-url>
    cd morf
    npm install

- Запустите dev-сервер:

    npm start

Откроется локальная страница, обычно по адресу http://localhost:8080 (уточните в консоли `servor`).

## Переменные окружения

Проект статический и не использует переменные окружения по умолчанию.

Если вы добавляете интеграцию с API, используйте файл `.env` (и `.gitignore`) и храните там чувствительные данные. Пример:

    API_URL=https://api.example.com
    API_KEY=xxx

На клиенте не храните секреты — используйте серверный прокси или защищённый бэкенд.

## Интеграция с бэкендом (рекомендации)

1. Создайте endpoint на сервере, который будет принимать POST-заявки из формы.
2. На клиенте замените alert/локальную логику на отправку данных через fetch:

    fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item, name, phone })
    });

3. Обрабатывайте ошибки и показывайте пользователю статус отправки.

## Запуск тестов (рекомендации)

1. Добавьте тестовый раннер: `npm i -D jest @testing-library/dom`.
2. Напишите unit-тесты для `scripts/script.js`: проверка фильтрации и валидации формы.

Пример простого теста (Jest + DOM environment):

```js
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('filter', () => {
  let dom;
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    // подключите script.js или импортируйте отдельные функции
  });

  test('shows all items when "Все" clicked', () => {
    // реализация теста
  });
});
```
