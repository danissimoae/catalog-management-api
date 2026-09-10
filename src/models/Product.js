class Product {
  constructor(id, name, description, price, category, stock) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.stock = stock;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  update(data) {
    if (data.name !== undefined) this.name = data.name;
    if (data.description !== undefined) this.description = data.description;
    if (data.price !== undefined) this.price = data.price;
    if (data.category !== undefined) this.category = data.category;
    if (data.stock !== undefined) this.stock = data.stock;
    this.updatedAt = new Date();
  }
}

class ProductStore {
  constructor() {
    this.products = new Map();
    this.currentId = 1;
  }

  create(data) {
    const product = new Product(
      this.currentId++,
      data.name,
      data.description,
      data.price,
      data.category,
      data.stock
    );
    this.products.set(product.id, product);
    return product;
  }

  findAll(filters = {}) {
    let products = Array.from(this.products.values());

    if (filters.category) {
      products = products.filter(p => p.category === filters.category);
    }

    if (filters.minPrice !== undefined) {
      products = products.filter(p => p.price >= filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      products = products.filter(p => p.price <= filters.maxPrice);
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }

    return products.sort((a, b) => b.createdAt - a.createdAt);
  }

  findById(id) {
    return this.products.get(parseInt(id));
  }

  update(id, data) {
    const product = this.findById(id);
    if (!product) return null;
    product.update(data);
    return product;
  }

  delete(id) {
    return this.products.delete(parseInt(id));
  }

  count(filters = {}) {
    return this.findAll(filters).length;
  }

  clear() {
    this.products.clear();
    this.currentId = 1;
  }
}

module.exports = new ProductStore();
