// ---- Get Methods ---- //
// Get All Classes //

//3-step 3 validation//////////////////////////////////////////
const { validationResult } = require("express-validator");
const Class = require("../models/classSchema");

exports.getAllClasses = (req, res) => {
  Class.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

// Get Class By Id //
exports.getClassById = (req, res) => {
  Class.findOne({ _id: req.params.id }) // ba2olo 3yza el id ele gay mn req.param
    .then((Class) => {
      if (!Class) throw new Error("id doesn't exist");
      //law el data bt3tk be null
      res.status(200).json(Class);
    })
    .catch((error) => {
      // Handle the error appropriately, such as sending an error response
      res.status(500).json({ error: error.message });
    });
};

exports.getTeacherByClassId = (req, res) => {
  Class.findOne({ _id: req.params.id }) // ba2olo 3yza el id ele gay mn req.param
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};
exports.getChildByClassId = (req, res) => {
  Class.findOne({ _id: req.params.id }) // ba2olo 3yza el id ele gay mn req.param
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};
// ---- End Get Methods ---- //

// ---- Post Methods ---- //
exports.addNewClass = (req, res) => {
  const { id: _id, name, supervisor, children } = req.body;
  //create object from child schemaa
  const object = new Class({ _id, name, supervisor, children });
  //{
  // nafs el properties ele ana katbaha fl schema be nafs el dataTypes
  // _id: 10,
  //     name: "classOne",
  //   }
  object
    .save()
    .then((data) => {
      res.status(201).json({ message: "Added", data });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
// ---- End Post Methods ---- //

// ---- Update Methods ---- //
exports.updateClass = (req, res) => {
  Class.updateOne({ _id: req.body.id }, req.body) // Use req.body for the update operation
    .then((result) => {
      if (result.nModified === 0) throw new Error("id doesn't exist"); // Check if any document was modified
      res.status(200).json({ message: "class updated successfully" });
    })
    .catch((error) => {
      // Handle the error appropriately, such as sending an error response
      res.status(500).json({ error: error.message });
    });
};

// ---- End Update Methods ---- //

// ---- Delete Methods ---- //
exports.deleteClass = (req, res) => {
  Class.deleteOne({ _id: req.body.id }) // Use req.params.id to specify which document to delete
    .then((result) => {
      if (result.deletedCount === 0) throw new Error("id doesn't exist"); // Check if any document was deleted
      res.status(200).json({ message: "class deleted successfully" });
    })
    .catch((error) => {
      // Handle the error appropriately, such as sending an error response
      res.status(500).json({ error: error.message });
    });
};

// ---- End Delete Methods ---- //
