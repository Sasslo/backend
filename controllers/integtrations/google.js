const models = require("../../models");
const { body, validationResult } = require("express-validator");
const fs = require("fs").promises;
path = require("path");
const Error = require("../../exceptions/error");
const {
  authorizationUrlGenerator,
  tokenReedem,
} = require("../../utils/googleWorkSpace/authorize");
const {
  listUsers,
  listActivities,
} = require("../../utils/googleWorkSpace/helper");
const ValidateError = Error.ValidateError;

const authorize = async (req, res) => {
  const methodName = "[authorize] : ";
  try {
    const redirect_url = authorizationUrlGenerator();
    return res.redirect(redirect_url);
  } catch (e) {
    Error.res(res, e);
  }
};

const authorizationCallback = async (req, res) => {
  const methodName = "[authorizationCallback] : ";
  try {
    const param_code = req.query.code;
    const tokens = await tokenReedem(param_code);
    // TODO ? fetch company details from autorized persons data then select that comany from database and pass the id
    await models["credential"].create({
      ...tokens,
      company_id: "1",
    });
    return res.redirect("/");
  } catch (e) {
    Error.res(res, e);
  }
};

const fetchUsers = async (req, res) => {
  const methodName = "[fetchUsers] : ";
  try {
    // fetch credentials
    // TODO ? for now fetching manually but it should be fetched from the authorised persons details
    const credential = await models["credential"].findOne({ company_id: "1" });
    const users = await listUsers(credential);

    //save in jason file
    fs.writeFile(
      path.join(__dirname, "../../tempData/users.json"),
      JSON.stringify(users)
    );
    return res.json({ success: true, msg: "Success", data: users });
  } catch (e) {
    Error.res(res, e);
  }
};

const fetchActivites = async (req, res) => {
  const methodName = "[fetchActivites] : ";
  try {
    // fetch credentials
    // TODO ? for now fetching manually but it should be fetched from the authorised persons details
    const credential = await models["credential"].findOne({ company_id: "1" });
    const activities = await listActivities(credential);

    //save in jason file
    fs.writeFile(
      path.join(__dirname, "../../tempData/activities.json"),
      JSON.stringify(activities)
    );
    return res.json({ success: true, msg: "Success", data: activities });
  } catch (e) {
    Error.res(res, e);
  }
};

module.exports = {
  authorize: authorize,
  authorizationCallback: authorizationCallback,
  fetchUsers: fetchUsers,
  fetchActivites: fetchActivites,
};
