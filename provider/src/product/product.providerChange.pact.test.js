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
    if (process.env.PACT_URL) {
      console.log('pact url specified, so this test should not run');
      return;
    }
    const fetchPactsDynamicallyOpts = {
      // IMPORTANT: Relative path to the pact file does not work, so use your absolute path

      pactUrls: ["D:/Docs/Projects/pact-workshop/provider/src/product/local-pacts/test.json"]
      // pactUrls: ["D:/Docs/Projects/pact-workshop/provider/src/product/local-pacts/fail.json"]
      // pactUrls: ["D:/Docs/Projects/pact-workshop/provider/src/product/local-pacts/pactflow-example-consumer-pactflow-example-provider.json"]
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
