import axios from 'axios';
import { Product } from './model/product';

class API {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  withPath(path) {
    return `${this.baseURL}${path}`;
  }

  generateAuthToken() {
    // Implement token generation logic here
    return 'Bearer 2019-01-14T11:34:18.045Z';
  }

  async getProduct(id) {
    try {
      const response = await axios.get(this.withPath('/product/' + id), {
        headers: {
          Authorization: this.generateAuthToken()
        }
      });
      return new Product(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  async getAllProducts() {
    try {
      const response = await axios.get(this.withPath('/products'), {
        headers: {
          Authorization: this.generateAuthToken()
        }
      });
      return response.data.map((p) => new Product(p));
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
}

export default new API(
  'http://localhost:8080'
);

export { API };