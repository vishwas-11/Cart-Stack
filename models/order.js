const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Schema
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  address: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled", "processing"],
    default: "pending",
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "payment",
  },
  delivery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "delivery",
  },
}, { timestamps: true });

// JOI Validation Function
const validateOrder = (orderData) => {
  const schema = Joi.object({
    user: Joi.string().hex().length(24).required(),
    products: Joi.array().items(Joi.string().hex().length(24)).required(),
    totalPrice: Joi.number().min(0).required(),
    address: Joi.string().required(),
    status: Joi.string().valid("pending", "confirmed", "shipped", "delivered", "cancelled", "processing").optional(),
    payment: Joi.string().hex().length(24).optional(),
    delivery: Joi.string().hex().length(24).optional(),
  });

  return schema.validate(orderData);
};

const orderModel = mongoose.model("order", orderSchema);

module.exports = {
  orderModel,
  validateOrder,
};
