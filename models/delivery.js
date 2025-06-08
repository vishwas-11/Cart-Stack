// const mongoose = require("mongoose")


// const deliverySchema = mongoose.Schema({
//     oder: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "order",
//     },
    
//     deliveryBoy: String,
//     status: String,
//     trackingURL: String,
//     estimatedDeliveryTime: Number,
// }
// );

// module.exports = mongoose.model("delivery", deliverySchema)


const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Schema
const deliverySchema = mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
    required: true,
  },
  deliveryBoy: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "shipped", "out for delivery", "delivered", "cancelled"], // adjust as needed
    required: true,
  },
  trackingURL: {
    type: String,
    required: false,
  },
  estimatedDeliveryTime: {
    type: Number, // in hours, minutes, or timestamp? clarify if needed
    required: true,
  },
});

// JOI Validation
const validateDelivery = (deliveryData) => {
  const schema = Joi.object({
    order: Joi.string().hex().length(24).required(),
    deliveryBoy: Joi.string().required(),
    status: Joi.string()
      .valid("pending", "shipped", "out for delivery", "delivered", "cancelled")
      .required(),
    trackingURL: Joi.string().uri(),
    // .optional().allow(""),
    estimatedDeliveryTime: Joi.number().min(0).required(),
  });

  return schema.validate(deliveryData);
};

const deliveryModel = mongoose.model("delivery", deliverySchema);

module.exports = {
  deliveryModel,
  validateDelivery,
};
