const integrateRouter = require("./routes/integrate");
const version = "/api/v1/";

const routerRegistration = (app) => {
  app.use(version, integrateRouter.router);
};

module.exports = routerRegistration;
