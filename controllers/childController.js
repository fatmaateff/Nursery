// ---- Get Methods ---- //
// Get All Children //
const { default: mongoose } = require("mongoose");
const Child = require("../models/childSchema");

// get all children method //
exports.getAllChildren = (req, res) => {
  Child.find({})
    .populate({ path: "department" }) //3shan trg3le id fe child populate(path,select)
    // null case msh btzhr 3shan el department da hykon mandatory
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Get Child By Id //

exports.getChildById = (req, res, next) => {
  Child.findOne({ _id: req.params.id }) // ba2olo 3yza el id ele gay mn req.param
    .then((Child) => {
      if (!Child) throw new Error("id doesn't exist");
      //law el data bt3tk be null
      res.status(200).json(Child);
    })
    .catch((error) => {
      // Handle the error appropriately, such as sending an error response
      res.status(500).json({ error: error.message });
    });
};

// ---- End Get Methods ---- //

// ---- Post Methods ---- //
exports.addNewChild = (req, res) => {
  // ////////////////////// ADDDDD IMAGE ///////////////
  // elsora btgele ka binary data

  res.json({ body: req.body, file: req.file });
  // create object from child schemaa
  const object = new Child(req.body);
  //comment//
  //{
  // nafs el properties ele ana katbaha fl schema be nafs el dataTypes
  // _id: 2,
  //     name: "xxx",
  //     password: "123",
  //     department: 1,
  //   }
  //comment//

  object
    .save()
    .then((data) => {
      res.status(201).json({ message: "Added", data });
    })
    .catch((error) => {
      next(error);
    });
};
// ---- End Post Methods ---- //

// ---- Update Methods ---- //
exports.updateChild = (req, res) => {
  Child.updateOne({ _id: req.body.id }, req.body) // Use req.body for the update operation
    .then((result) => {
      if (result.nModified === 0) throw new Error("id doesn't exist"); // Check if any document was modified
      res.status(200).json({ message: "Child updated successfully" });
    })
    .catch((error) => {
      // Handle the error appropriately, such as sending an error response
      res.status(500).json({ error: error.message });
    });
};

// ---- End Update Methods ---- //

// ---- Delete Methods ---- //

exports.deleteChild = (req, res) => {
  Child.deleteOne({ _id: req.body.id }) // Use req.params.id to specify which document to delete
    .then((result) => {
      if (result.deletedCount === 0) throw new Error("id doesn't exist"); // Check if any document was deleted
      res.status(200).json({ message: "Child deleted successfully" });
    })
    .catch((error) => {
      // Handle the error appropriately, such as sending an error response
      res.status(500).json({ error: error.message });
    });
};

// ---- End Delete Methods ---- //
