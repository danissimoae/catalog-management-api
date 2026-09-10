const request = require('supertest');
const app = require('../src/index');
const productStore = require('../src/models/Product');

beforeEach(() => {
  productStore.clear();
});

describe('Products API', () => {
  const validProduct = {
    name: 'Тестовый товар',
    description: 'Описание тестового товара',
    price: 100,
    category: 'electronics',
    stock: 10
  };

  describe('POST /api/products', () => {
    it('должен создать новый товар', async () => {
      const res = await request(app)
        .post('/api/products')
        .send(validProduct);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(validProduct.name);
      expect(res.body.data.price).toBe(validProduct.price);
      expect(res.body.data.id).toBeDefined();
    });

    it('должен вернуть ошибку при невалидных данных', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({ name: 'Товар' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('должен вернуть ошибку при отрицательной цене', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({ ...validProduct, price: -10 });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/products', () => {
    it('должен вернуть список товаров', async () => {
      productStore.create(validProduct);

      const res = await request(app).get('/api/products');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.pagination).toBeDefined();
    });

    it('должен работать с пагинацией', async () => {
      productStore.create(validProduct);
      productStore.create({ ...validProduct, name: 'Товар 2' });

      const res = await request(app)
        .get('/api/products')
        .query({ page: 1, limit: 1 });

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.pagination.total).toBe(2);
      expect(res.body.pagination.pages).toBe(2);
    });

    it('должен фильтровать по категории', async () => {
      productStore.create(validProduct);
      productStore.create({ ...validProduct, name: 'Книга', category: 'books' });

      const res = await request(app)
        .get('/api/products')
        .query({ category: 'electronics' });

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].category).toBe('electronics');
    });
  });

  describe('GET /api/products/:id', () => {
    it('должен вернуть товар по ID', async () => {
      const product = productStore.create(validProduct);

      const res = await request(app).get(`/api/products/${product.id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(validProduct.name);
    });

    it('должен вернуть 404 для несуществующего товара', async () => {
      const res = await request(app).get('/api/products/999');

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('PUT /api/products/:id', () => {
    it('должен обновить товар', async () => {
      const product = productStore.create(validProduct);
      const updatedData = { price: 150 };

      const res = await request(app)
        .put(`/api/products/${product.id}`)
        .send(updatedData);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.price).toBe(150);
      expect(res.body.data.name).toBe(validProduct.name);
    });

    it('должен вернуть 404 для несуществующего товара', async () => {
      const res = await request(app)
        .put('/api/products/999')
        .send({ price: 150 });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('должен удалить товар', async () => {
      const product = productStore.create(validProduct);

      const res = await request(app).delete(`/api/products/${product.id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const deletedProduct = productStore.findById(product.id);
      expect(deletedProduct).toBeUndefined();
    });

    it('должен вернуть 404 для несуществующего товара', async () => {
      const res = await request(app).delete('/api/products/999');

      expect(res.status).toBe(404);
    });
  });
});
