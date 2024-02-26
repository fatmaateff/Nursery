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
/**
 * @swagger
 * tags:
 *   name: Children
 *   description: APIs related to children
 * 
 * /child:
 *   get:
 *     summary: Retrieve all children
 *     description: Retrieve a list of all children
 *     responses:
 *       '200':
 *         description: A list of children
 *   post:
 *     summary: Add a new child
 *     description: Add a new child to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       '200':
 *         description: Successfully added the child
 *   put:
 *     summary: Update a child
 *     description: Update an existing child
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       '200':
 *         description: Successfully updated the child
 *   delete:
 *     summary: Delete a child
 *     description: Delete an existing child
 *     responses:
 *       '200':
 *         description: Successfully deleted the child
 * 
 * /child/{id}:
 *   get:
 *     summary: Retrieve a child by ID
 *     description: Retrieve details of a specific child
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the child to retrieve
 *     responses:
 *       '200':
 *         description: Details of the requested child
 * 
 * components:
 *   schemas:
 *     Child:
 *       type: object
 *       properties:
 *         // Define properties of the Child object here
 */
