// --- Intailziing Route --- //
const express = require("express");
/////////////validation/////////////////
const { body, query, params } = require("express-validator");
const {
  insertArray,
  paramValidation,
} = require("../middlewares/validation/childValidation");
const validator = require("../middlewares/validation/validator");
/////////////validation/////////////////

const childRoute = express.Router();
// --- End Intailziing Route --- //

// --- Importing Child Controller --- //
const childController = require("../controllers/childController");

// --- End Importing Child Controller --- //

// --- Routes --- //

// Mandatory Route
childRoute
  .route("/child")
  .get(childController.getAllChildren)
  .post(insertArray, validator, childController.addNewChild)
  .put(insertArray, validator, childController.updateChild)
  .delete(childController.deleteChild);
// Query Route
childRoute.get("/child/:id", paramValidation, childController.getChildById);
// --- End Routes --- //

// --- Exporting Route --- //
module.exports = childRoute;
// --- End Exporting Route --- //
