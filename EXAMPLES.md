# API Examples

Примеры запросов для тестирования API.

## Создание товара

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15 Pro",
    "description": "Флагманский смартфон от Apple с титановым корпусом",
    "price": 1299,
    "category": "electronics",
    "stock": 50
  }'
```

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MacBook Pro 16",
    "description": "Профессиональный ноутбук для разработки",
    "price": 2499,
    "category": "electronics",
    "stock": 20
  }'
```

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Футболка",
    "description": "Хлопковая футболка",
    "price": 25,
    "category": "clothing",
    "stock": 100
  }'
```

## Получение всех товаров

```bash
curl http://localhost:3000/api/products
```

## Получение товаров с пагинацией

```bash
curl "http://localhost:3000/api/products?page=1&limit=5"
```

## Фильтрация по категории

```bash
curl "http://localhost:3000/api/products?category=electronics"
```

## Фильтрация по цене

```bash
curl "http://localhost:3000/api/products?minPrice=1000&maxPrice=2000"
```

## Поиск по названию

```bash
curl "http://localhost:3000/api/products?search=phone"
```

## Получение товара по ID

```bash
curl http://localhost:3000/api/products/1
```

## Обновление товара

```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1199,
    "stock": 45
  }'
```

## Удаление товара

```bash
curl -X DELETE http://localhost:3000/api/products/1
```

## Комплексный запрос с несколькими фильтрами

```bash
curl "http://localhost:3000/api/products?category=electronics&minPrice=500&maxPrice=3000&page=1&limit=10"
```
