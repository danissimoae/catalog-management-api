# Products REST API

REST API для управления каталогом товаров. Лабораторная работа №1 по дисциплине "Архитектура программных систем".

## Особенности

- CRUD операции для товаров
- Пагинация и фильтрация
- Валидация данных
- Логирование запросов
- Документация API (Swagger)
- Покрытие тестами
- In-memory хранилище данных

## Технологии

- Node.js + Express.js
- In-memory база данных
- Jest для тестирования
- Winston для логирования
- Swagger для документации API

## Структура проекта

```
.
├── src/
│   ├── config/          # Конфигурация
│   │   ├── logger.js
│   │   └── swagger.js
│   ├── controllers/     # Контроллеры
│   │   └── productController.js
│   ├── middlewares/     # Middleware
│   │   ├── errorHandler.js
│   │   ├── requestLogger.js
│   │   └── validators.js
│   ├── models/          # Модели данных
│   │   └── Product.js
│   ├── routes/          # Маршруты
│   │   └── productRoutes.js
│   └── index.js         # Точка входа
├── tests/               # Тесты
│   └── products.test.js
├── package.json
└── README.md
```

## Установка

```bash
npm install
```

## Запуск

```bash
# Режим разработки с автоперезагрузкой
npm run dev

# Продакшн режим
npm start
```

Сервер запустится на `http://localhost:3000`

## API Endpoints

### Получить все товары
```
GET /api/products
```

Параметры запроса:
- `page` - номер страницы (по умолчанию: 1)
- `limit` - количество товаров на странице (по умолчанию: 10)
- `category` - фильтр по категории
- `minPrice` - минимальная цена
- `maxPrice` - максимальная цена
- `search` - поиск по названию и описанию

### Получить товар по ID
```
GET /api/products/:id
```

### Создать товар
```
POST /api/products
Content-Type: application/json

{
  "name": "Ноутбук",
  "description": "Игровой ноутбук",
  "price": 1500,
  "category": "electronics",
  "stock": 5
}
```

Категории: `electronics`, `clothing`, `food`, `books`, `other`

### Обновить товар
```
PUT /api/products/:id
Content-Type: application/json

{
  "price": 1400,
  "stock": 3
}
```

### Удалить товар
```
DELETE /api/products/:id
```

## Документация API

После запуска сервера документация доступна по адресу:
```
http://localhost:3000/api-docs
```

## Тестирование

```bash
# Запустить тесты
npm test

# Запустить тесты в режиме наблюдения
npm run test:watch
```

## Примеры использования

### Создание товара
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Смартфон",
    "description": "Флагманский смартфон",
    "price": 800,
    "category": "electronics",
    "stock": 10
  }'
```

### Получение списка товаров с фильтрацией
```bash
curl "http://localhost:3000/api/products?category=electronics&minPrice=500&page=1&limit=5"
```

### Обновление товара
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 750,
    "stock": 8
  }'
```

### Удаление товара
```bash
curl -X DELETE http://localhost:3000/api/products/1
```

## Логирование

Логи сохраняются в файлы:
- `error.log` - только ошибки
- `combined.log` - все события

## Валидация

API выполняет валидацию входных данных:
- Название: обязательно, максимум 100 символов
- Описание: обязательно, максимум 500 символов
- Цена: обязательно, неотрицательное число
- Категория: обязательно, одно из допустимых значений
- Количество: обязательно, неотрицательное целое число

## Формат ответов

Успешный ответ:
```json
{
  "success": true,
  "data": { ... }
}
```

Ошибка:
```json
{
  "success": false,
  "error": "Описание ошибки"
}
```

## Автор

Студент 5 курса

## Лицензия

MIT
