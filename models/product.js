const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Schema
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number, // Consider changing to Number for calculations
    required: true,
  },
  category: {
    type: String, // Or mongoose.Schema.Types.ObjectId if referencing category collection
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: Buffer, // Image URL
    required: false,
  },
}, { timestamps: true });

// JOI Validation Function
const validateProduct = (productData) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.string().required(), // Consider using Joi.number() if price is numeric
    category: Joi.string().required(),
    stock: Joi.number().required(),
    description: Joi.string().optional().allow(""),
    image: Joi.string().optional().allow(""),
  });

  return schema.validate(productData);
};

const productModel = mongoose.model("Product", productSchema);

module.exports = {
  productModel,
  validateProduct,
};
