// const mongoose = require("mongoose")


// const categorySchema = mongoose.Schema(
//     {
//     name: String,
//     }
// );

// module.exports = mongoose.model("category", categorySchema)


const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Schema
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

// JOI Validation Function
const validateCategory = (categoryData) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
  });

  return schema.validate(categoryData);
};

const categoryModel = mongoose.model("category", categorySchema);

module.exports = {
  categoryModel,
  validateCategory,
};
