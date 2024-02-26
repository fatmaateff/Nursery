const { body, param, query } = require("express-validator");
exports.insertArray = [
  //2-step two add validation an //3-at classController i should raising validation
  body("id").isInt().withMessage("Child Id should be integer"),
  body("name")
    .isAlpha()
    .withMessage("Child name should be string")
    .isLength({ max: 10 })
    .withMessage("Child name length must be less than 10"),
  body("password")
    .optional()
    .isString()
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 charachter"),
];
    exports.paramValidation = param("id")
      .isInt()
      .withMessage("child Id should be integer");
