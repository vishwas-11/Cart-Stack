// const mongoose = require("mongoose")


// const adminSchema = mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
//     role: String,
// }
// );

// module.exports = mongoose.model("admin", adminSchema)


const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Schema
const adminSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

// JOI Validation Schema
const validateAdmin = (adminData) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("superadmin", "admin", "editor", "viewer").required(), // adjust roles as needed
  });

  return schema.validate(adminData);
};

const adminModel = mongoose.model("admin", adminSchema);

module.exports = {
  adminModel,
  validateAdmin,
};
