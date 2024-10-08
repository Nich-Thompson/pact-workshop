const PactV3 = require('@pact-foundation/pact').PactV3;
import { API } from './web/api';
const MatchersV3 = require('@pact-foundation/pact').MatchersV3;
import { Product } from './web/model/product';
const { like } = MatchersV3;
const Pact = PactV3;

const mockProvider = new Pact({
  consumer: 'pactflow-example-consumer',
  provider: 'pactflow-example-provider'
});

describe('API Pact test', () => {
  describe('retrieving a product', () => {
    test('ID 3 exists', async () => {
      // Arrange
      // Zet het object op dat we later terugverwachten
      let expectedProduct = {
        id: '3',
        type: 'Kist',
        name: 'Mooie Eikenhouten Kist'
      };

      // Zorg dat de mockProvider het verwachtte object terug gaat geven wanneer we de request doen
      mockProvider
        .given('a product with ID 3 exists')
        .uponReceiving('a request to get a product')
        .withRequest({
          method: 'GET',
          path: '/product/3',
          headers: {
            Authorization: like('Bearer 2019-01-14T11:34:18.045Z')
          }
        })
        .willRespondWith({
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: like(expectedProduct)
        });

      // Act - perform the request on the mock provider
      return mockProvider.executeTest(async (mockserver) => {
        const api = new API(mockserver.url);
        const product = await api.getProduct('3');

        // Assert - did we get the expected response
        expect(product).toStrictEqual(new Product(expectedProduct));
        return;
      });
    });
  });
});
