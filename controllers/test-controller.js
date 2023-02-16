const models = require("../models");
const { body, validationResult } = require("express-validator");

const Error = require("../exceptions/error");
const ValidateError = Error.ValidateError;

const test = async (req, res) => {
  const methodName = "[test] : ";
  try {
    let test1 = await models["test"].create({
      name: "test1",
      age: 1,
    });
    return res.json({ success: true, msg: "Success", data: test1});
  }
  catch (e) {
    Error.res(res, e);
  }
};

module.exports = {
  test: test,
};
