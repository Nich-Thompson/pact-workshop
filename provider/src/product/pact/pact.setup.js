const controller = require("../service/product.controller");
const Product = require("../service/product");

const baseOpts = {
  logLevel: "INFO",
  providerBaseUrl: "http://localhost:8081",
  // providerVersion: process.env.GIT_COMMIT,
  // providerVersionBranch: process.env.GIT_BRANCH, // the recommended way of publishing verification results with the branch property
  verbose: process.env.VERBOSE === "true",
};

// Setup provider server to verify

const setupServer = () => {
  const app = require("express")();
  const authMiddleware = require("../../middleware/auth.middleware");
  app.use(authMiddleware);
  app.use(require("../service/product.routes"));
  const server = app.listen("8081");
  return server;
};

const stateHandlers = {
  "products exists": () => {
    controller.repository.products = new Map([
      ["3", new Product("3", "Kist", "Mooie Eikenhouten Kist", "M")],
    ]);
  },
  "products exist": () => {
    controller.repository.products = new Map([
      ["3", new Product("3", "Kist", "Mooie Eikenhouten Kist", "M")],
    ]);
  },
  "a product with ID 3 exists": () => {
    controller.repository.products = new Map([
      ["3", new Product("3", "Kist", "Mooie Eikenhouten Kist", "M")],
    ]);
  },
  "a product with ID 100 does not exist": () => {
    controller.repository.products = new Map();
  },
};

const requestFilter = (req, res, next) => {
  if (!req.headers["authorization"]) {
    next();
    return;
  }
  req.headers["authorization"] = `Bearer ${new Date().toISOString()}`;
  next();
};

module.exports = {
  baseOpts,
  setupServer,
  stateHandlers,
  requestFilter,
};
