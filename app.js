// ----- my conf is on .env file -----//
require("dotenv").config();

// ------ Loading Modules ------ //
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

// ------ End Loading Modules ------ //

// ----- Importing Routes ----- //
const authenticationMiddleware = require("./middlewares/authenticationMW");
const authorizationMiddleware = require("./middlewares/authorizationMW");
const authRoute = require("./routes/authRoute");
const teacherRoute = require("./routes/teacherRoute");
const childRoute = require("./routes/childRoute");
const classRoute = require("./routes/classRoute");
const upload = require("./middlewares/MulterMw");
// ----- End Importing Routes ----- //

// ----- initializing express server ----- //
const server = express();
// ----- End initializing express server ----- //

// ----- Listening to the server ----- //

mongoose
  .connect(process.env.url)
  .then(() => {
    console.log("connected to the database");
    const port = process.env.PORT || 8080;
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("error connecting to the database", error);
  });

// ----- End Listening to the server ----- //

// ----- Middlewares ----- //

// --- Logging Middleware --- //
server.use(morgan("dev"));
// --- End Logging Middleware --- //

// --- Cors Middleware --- //
server.use(cors());
// --- End Cors Middleware --- //

// --- Settings --- //

// Body Parser
// Json Format Handling
server.use(express.json());
// Form Data Handling
server.use(express.urlencoded({ extended: true }));
server.use(upload.single("images"));

// End Body Parser

// ----- End Settings ----- //

// ----- Routes ----- //
server.use(authRoute); //doesn't need token
server.use(authenticationMiddleware);
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);
/// ----- End Routes ----- //

// ----- Error Handling MiddleWare ----- //
// 404 Not Found Error Handling
server.use((req, res) => {
  res.status(404).json({
    message: "404 Not Found",
  });
});
//Server Error Handling
server.use((err, req, res, next) => {
  let status = err.statusCode || 500;
  console.error(err.message);
  res.status(status).json({ Error: err.message + "" });
  // res.status(500).json({
  //   message: "Server Error",
  // });
});
// ----- End Error Handling MiddleWare ----- //
