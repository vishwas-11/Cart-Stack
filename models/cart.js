const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Schema
const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
});

// JOI Validation Function
const validateCart = (cartData) => {
  const schema = Joi.object({
    user: Joi.string().hex().length(24).required(), // MongoDB ObjectId
    products: Joi.array().items(Joi.string().hex().length(24)).required(),
    totalPrice: Joi.number().min(0).required(),
  });

  return schema.validate(cartData);
};

const cartModel = mongoose.model("cart", cartSchema);

module.exports = {
  cartModel,
  validateCart,
};
