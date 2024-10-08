const Product = require('./product');

class ProductRepository {

    constructor() {
        this.products = new Map([
            ["1", new Product("1", "CREDIT_CARD", "Paypal", "1.0")],
            ["2", new Product("2", "CREDIT_CARD", "Mastercard", "1.0")],
            ["3", new Product("3", "Kist", "Mooie Eikenhouten Kist", "M")],
            ["4", new Product("4", "Kist", "Lelijke Eikenhouten Kist", "L")],
            ["5", new Product("5", "Zaal", "Zaal A", "A")],
            ["6", new Product("6", "Zaal", "Zaal B", "B")],
            ["7", new Product("7", "Zaal", "Zaal C", "C")],
            ["8", new Product("8", "Rijwerk", "Zwarte Rouwauto", "1.0")],
            ["9", new Product("9", "Rijwerk", "Witte Rouwbakfiets", "1.0")],
            ["10", new Product("10", "Rijwerk", "Kleurrijke Rouw TukTuk", "1.0")],
            ["11", new Product("11", "Rijwerk", "Grijze Model 3S Tesla - Grijs", "2.7.Æ.0 ver.1.7")],
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
