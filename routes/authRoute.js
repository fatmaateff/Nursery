const express = require("express");
const loginRoute = express.Router();
const authController = require("../controllers/authController");

loginRoute.post("/login", authController.login);
// 4- Exporting route
module.exports = loginRoute;
