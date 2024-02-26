const mongoose = require("mongoose"); //schema is build by mongoose
//1-create object from mongoose schema
const Schema = new mongoose.Schema({
  _id: Number,
  name: String,
  email: String,
  password: String,
  class: Number,
  image: String,
});

//2-mapping the schema to department (ba2olha hasgl 3ndk model)
module.exports = mongoose.model("Teacher", Schema); // el model da ha5do m3aya 3nd el controllers w abd2 a2olo schema.find masln w hakaza
//department is the same as departments
