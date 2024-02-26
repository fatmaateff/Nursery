//1-require express
//2-make rouer
//3-export route
//4-at app.js server.use(route)
//5-controller
//6-require controller

//---- Intializing Route ---- //
const express = require("express");

/////////////validation/////////////////
const { body, query, params } = require("express-validator");
const {
  insertArray,
  paramValidation,
} = require("../middlewares/validation/teacherValidation");
const validator = require("../middlewares/validation/validator");
/////////////validation/////////////////

const teacherRoute = express.Router();
//---- End Intializing Route ---- //

// ---- Importing Teacher Controller ---- //
const teacherController = require("../controllers/teacherController.js");
const { isAdmin } = require("./../middlewares/authorizationMW");

// ---- End Importing Teacher Controller ---- //
// ---- Routes ---- //

// Mandatory Route
teacherRoute
  .route("/teachers")
  .all(isAdmin)
  .get(teacherController.getAllTeachers)
  .post(insertArray, validator, teacherController.addNewTeacher)
  .put(insertArray, validator, teacherController.updateTeacher)
  .delete(teacherController.deleteSpecifiedTeacher);

// --- End Routes --- //
teacherRoute.get(
  "/teachers/supervisors",

  teacherController.getAllSupervisors
);
teacherRoute.get(
  "/teachers/:id",
  paramValidation,

  teacherController.getTeacherById
);

// ---- Exporting Route ---- //
module.exports = teacherRoute;
// ---- End Exporting Route ---- //
