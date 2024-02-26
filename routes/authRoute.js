const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { insertArray } = require("../middlewares/validation/teacherValidation");
const validator = require("../middlewares/validation/validator");
const teacherController = require("../controllers/teacherController.js");

router.post("/login", authController.login);
router.post(
  "/teachers",
  insertArray,
  validator,
  teacherController.addNewTeacher
);

// 4- Exporting route
module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: APIs related to authentication
 *
 * /login:
 *   post:
 *     summary: Login
 *     description: Authenticate user and generate access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *       '401':
 *         description: Unauthorized - Invalid credentials
 *
 * /teachers:
 *   post:
 *     summary: Add a new teacher
 *     description: Add a new teacher to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       '200':
 *         description: Successfully added the teacher
 *
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *           format: password
 *     Teacher:
 *       type: object
 *       properties:
 *         // Define properties of the Teacher object here
 */
