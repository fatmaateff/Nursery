const mongoose = require("mongoose");

//---EmbededSchemaaa---//
const addressSchema = new mongoose.Schema(
  {
    city: String,
    street: String,
    building: Number,
  },
  { _id: false } // 3shan my3mlsh generate lel id lwhdoooooo
);

const Schema = mongoose.Schema({
  _id: Number,
  name: String,
  agr: Number,
  password: String,
  department: { type: Number, ref: "department" },
  image: String,
  //class msh department //ref de property gwa mongo bt5lene a2dr a-refrence w hwa byroh ll _id lwhdo
  address: addressSchema,
  level: {
    type: String,
    enum: ["PreKG", "KG1", "KG2"],
  },
});
//ref : btshel collection name ele ana bashawer 3leh
module.exports = mongoose.model("child", Schema);
