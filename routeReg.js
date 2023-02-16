const testRouter = require("./routes/test-route");
const version = "/api/v1/";

const routerRegistration = (app) => {
  app.use(version, testRouter.router);
};

module.exports = routerRegistration;
