const { body, param, query } = require("express-validator");
exports.insertArray = [
  //2-step two add validation an //3-at classController i should raising validation
  body("id").isInt().withMessage("teacher Id should be integer"),
  body("name")
    .isAlpha()
    .withMessage("teacher name should be string")
    .isLength({ max: 10 })
    .withMessage("teacher name length must be less than 10"),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 charachter"),
  body("email").isEmail().withMessage("Invalid email address"),
];
exports.paramValidation = [
  param("_id").isInt().withMessage("teacher Id should be integer"),
];
