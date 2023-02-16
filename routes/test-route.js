const express = require("express");
const router = express.Router();
const { body, param, query } = require("express-validator");
const testController = require("../controllers/test-controller");

router.route("/public/test").get(testController.test);

module.exports = {
  router: router,
};
