const Product = require('./product');

class ProductRepository {

    constructor() {
        this.products = new Map([
            ["1", new Product("1", "CREDIT_CARD", "Paypal", "1.0")],
            ["2", new Product("2", "CREDIT_CARD", "Mastercard", "1.0")],
            ["3", new Product("3", "Kist", "Mooie Eikenhouten Kist", "M")],
            ["4", new Product("4", "Kist", "Lelijke Eikenhouten Kist", "L")],
        ]);
    }

    async fetchAll() {
        return [...this.products.values()]
    }

    async getById(id) {
        return this.products.get(id);
    }
}

module.exports = ProductRepository;
