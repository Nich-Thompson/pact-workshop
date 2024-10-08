require('dotenv').config();
const { Verifier } = require('@pact-foundation/pact');
const {
  baseOpts,
  setupServer,
  stateHandlers,
  requestFilter
} = require('./pact.setup');

describe('Pact Verification', () => {
  let server;
  
  beforeAll(() => {
    server = setupServer();
  });
  
  afterAll(() => {
    if (server) {
      server.close();
    }
  });

  it('validates the expectations of any consumers, by specified consumerVersionSelectors', () => {
    const fetchPactsDynamicallyOpts = {
      // IMPORTANT: Relative path uses the path relative to the path from where the test is run, 
      // so make sure to run this in the /provider directory
      
      pactUrls: ["./src/product/pact/local-pacts/pactflow-example-consumer-pactflow-example-provider.json"] 
      // pactUrls: ["./src/product/pact/local-pacts/test.json"]
      // pactUrls: ["./src/product/pact/local-pacts/fail.json"] // uncomment to see a failed verification 
    };

    const opts = {
      ...baseOpts,
      ...fetchPactsDynamicallyOpts,
      stateHandlers: stateHandlers,
      requestFilter: requestFilter
    };
    return new Verifier(opts).verifyProvider().then((output) => {
      console.log('Pact Verification Complete!');
    });
  });
});
