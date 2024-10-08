const ProductRepository = require('./product.repository')

describe("ProductRepository", () => {
  it("has products", () => {
    const productRepository = new ProductRepository()
    return productRepository.fetchAll().then(products => {
      expect(products.length).toBeGreaterThan(0);
    });
  })
});
