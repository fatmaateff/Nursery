const { body, param, query } = require("express-validator");
exports.insertArray =     [
      //2-step two add validation an //3-at classController i should raising validation
      body("id").isInt().withMessage("Class Id should be integer"),
      body("name")
        .isAlpha()
        .withMessage("class name should be string")
        .isLength({ max: 10 })
        .withMessage("class name length must be less than 10"),
    ];
    exports.paramValidation = param("id")
      .isInt()
      .withMessage("class Id should be integer");
