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
/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: APIs related to classes
 *
 * /class:
 *   get:
 *     summary: Retrieve all classes
 *     description: Retrieve a list of all classes
 *     responses:
 *       '200':
 *         description: A list of classes
 *   post:
 *     summary: Add a new class
 *     description: Add a new class to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       '200':
 *         description: Successfully added the class
 *   put:
 *     summary: Update a class
 *     description: Update an existing class
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       '200':
 *         description: Successfully updated the class
 *   delete:
 *     summary: Delete a class
 *     description: Delete an existing class
 *     responses:
 *       '200':
 *         description: Successfully deleted the class
 *
 * /class/{id}:
 *   get:
 *     summary: Retrieve a class by ID
 *     description: Retrieve details of a specific class
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the class to retrieve
 *     responses:
 *       '200':
 *         description: Details of the requested class
 *
 * /class/teacher/{id}:
 *   get:
 *     summary: Retrieve teacher by class ID
 *     description: Retrieve details of the teacher associated with a class
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the class
 *     responses:
 *       '200':
 *         description: Details of the teacher
 *
 * /class/child/{id}:
 *   get:
 *     summary: Retrieve children by class ID
 *     description: Retrieve details of children associated with a class
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the class
 *     responses:
 *       '200':
 *         description: Details of the children
 *
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       properties:
 *         // Define properties of the Class object here
 */
