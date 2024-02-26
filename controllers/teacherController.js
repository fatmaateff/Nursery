const Teacher = require("../models/teacherSchema");
const bcrypt = require("bcrypt");
const fs = require("fs");

// ------ Get Methods -------//
exports.getAllTeachers = (req, res) => {
  Teacher.find({}) // {} means find all
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
// ------ End Get Methods -------//

// ------ Post Methods -------//
exports.addNewTeacher = async (req, res, next) => {
  const imagePath = req.file.path;
  //to encrypt the pw///
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newTeacher = new Teacher({
      ...rest,
      password: hashedPassword,
      image: imagePath,
    });
    const savedTeacher = await newTeacher.save();
    res
      .status(201)
      .json({ message: "Teacher added successfully", teacher: savedTeacher });
  } catch (error) {
    next(error);
  }
};

// ------ End Post Methods -------//

// ------ Update Methods -------//
exports.updateTeacher = async (req, res) => {
  try {
    const update = req.body;
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }
    res.status(200).json(updatedTeacher);
  } catch (error) {
    next(error);
  }
};
// ------ End Update Methods -------//

// ------ Delete Methods -------//
exports.deleteSpecifiedTeacher = (req, res) => {
  Teacher.deleteOne({ _id: req.params.id }) // Use req.params.id to specify which document to delete
    .then((result) => {
      const imagePath = Teacher.image;
      // delete image from the server
      fs.unlink(imagePath, (error) => {
        if (error) {
          next(error);
        }
      });
      if (result.deletedCount === 0) throw new Error("id doesn't exist"); // Check if any document was deleted
      res.status(200).json({ message: "teacher deleted successfully" });
    })
    .catch((error) => {
      // Handle the error appropriately, such as sending an error response
      res.status(500).json({ error: error.message });
    });
};

// ------ End of Delete Methods -------//

exports.getTeacherById = (req, res) => {
  Teacher.findOne({ _id: req.params.id }) // ba2olo 3yza el id ele gay mn req.param
    .then((Teacher) => {
      if (!Teacher) throw new Error("id doesn't exist");
      //law el data bt3tk be null
      res.status(200).json(Teacher);
    })
    .catch((error) => {
      // Handle the error appropriately, such as sending an error response
      res.status(500).json({ error: error.message });
    });
};

exports.getAllSupervisors = (req, res) => {
  res.status(200).json({
    message: `getAllSupervisors`,
  });
};
