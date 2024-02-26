require("dotenv").config(); // Ensure this is at the top of your file to load environment variables
const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacherSchema");
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRET_KEY; // Use a more descriptive variable name

exports.login = (req, res, next) => {
  const { name, password } = req.body; // Destructure for cleaner access
  console.log(process.env.password);
  if (name === process.env.name && password == process.env.password) {
    const token = jwt.sign({ id: name, role: "admin" }, secretKey, {
      expiresIn: "1h",
    }); // Optional: add expiration
    return res.status(200).json({ token: token });
  } else {
    console.log("name :>> ", name);
    Teacher.findOne({ name: name })
      .then((teacher) => {
        if (!teacher) {
          // If no teacher is found with the provided name
          return res.status(401).json({ message: "Incorrect name" });
        }

        // Compare provided password with hashed password
        bcrypt
          .compare(password, teacher.password)
          .then((isMatch) => {
            if (!isMatch) {
              // If the password doesn't match
              return res.status(401).json({ message: "Incorrect Password" });
            }

            // Password matches, sign the token
            const token = jwt.sign(
              { id: teacher._id, role: "teacher" },
              secretKey,
              { expiresIn: "1h" }
            ); // Optional: add expiration
            res.status(200).json({ token: token });
          })
          .catch((err) => {
            // Handle bcrypt error
            res
              .status(500)
              .json({ message: "Server error during authentication" });
          });
      })
      .catch((err) => {
        // Handle error in finding teacher
        console.error(err);
        res.status(500).json({ message: "Server error during authentication" });
      });
  }
};

//---------Authentication-------------//
