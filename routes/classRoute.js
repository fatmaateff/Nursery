// --- Intializing Route --- //
const express = require("express");
//1-step one validation

//// step 2 validation
const { body, query, params } = require("express-validator");
const {
  insertArray,
  paramValidation,
} = require("../middlewares/validation/classValidation");

const validator = require("../middlewares/validation/validator");
///////
const classRoute = express.Router();
// --- End Intializing Route --- //

// --- Importing Class Controller --- //
const classController = require("../controllers/classController");
// --- End Importing Class Controller --- //

// --- Routes --- //

// Mandatory Route

classRoute
  .route("/class")
  .get(classController.getAllClasses)
  .post(insertArray, validator, classController.addNewClass)
  .put(insertArray, validator, classController.updateClass)
  .delete(classController.deleteClass);
// Query Route
classRoute.get("/class/:id", paramValidation, classController.getClassById);
//Class Teacher Route
classRoute.get(
  "/class/teacher/:id",
  paramValidation,
  classController.getTeacherByClassId
);
// Class Child Route
classRoute.get(
  "/class/child/:id",
  paramValidation,
  classController.getChildByClassId
);
// --- End Routes --- //

// --- Exporting Route --- //
module.exports = classRoute;
// --- End Exporting Route --- //
