const mongoose = require("mongoose");
const Joi = require("joi");

// Address Sub-schema for Mongoose
const AddressSchema = mongoose.Schema({
  state: String,
  zip: Number,
  city: String,
  address: String,
});

// User Schema for Mongoose
const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    phone: Number,
    addresses: [AddressSchema],
  },
  { timestamps: true }
);

// JOI Validation Schema
const addressJoiSchema = Joi.object({
  state: Joi.string().required(),
  zip: Joi.number().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
});

const validateUser = (userData) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.number().required(),
    addresses: Joi.array().items(addressJoiSchema),
  });

  return schema.validate(userData);
};

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
  validateUser,
};
