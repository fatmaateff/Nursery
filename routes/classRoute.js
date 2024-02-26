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
