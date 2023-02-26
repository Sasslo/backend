const express = require("express");
const router = express.Router();
const { body, param, query } = require("express-validator");
const googleintegrateController = require("../controllers/integtrations/google");

// admin authorize for data collection
router.route("/google/authorize").get(googleintegrateController.authorize);

//google callback for saving credentials
router
  .route("/google/callback")
  .get(googleintegrateController.authorizationCallback);

//list all users details
router.route("/google/user/all").get(googleintegrateController.fetchUsers);

//list alll activity
router
  .route("/google/activity/all")
  .get(googleintegrateController.fetchActivites);

module.exports = {
  router: router,
};
