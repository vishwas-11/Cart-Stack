require("dotenv").config()
const { paymentModel } = require("../models/payment")
const Razorpay = require("razorpay")
const express = require("express");
const router = express.Router();
const crypto = require("crypto");


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

router.post("/create/orderId", async (req,res)=>{
    const options = {
        amount: 5000*100,
        currency: "INR",
    }
    try {
        const order = await razorpay.orders.create(options);
        res.send(order);

        const newPayment = await paymentModel.create({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            status: "pending",
        })
    } catch(err) {
        res.status(500).send("Error creating order");
    }
})


router.post("/api/payment/verify", async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, signature } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;
  const body = razorpayOrderId + "|" + razorpayPaymentId;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === signature) {
    try {
      const payment = await paymentModel.findOne({
        orderId: razorpayOrderId,
        status: "pending",
      });

      if (!payment) {
        return res.status(404).send("Payment record not found.");
      }

      payment.paymentId = razorpayPaymentId;
      payment.signature = signature;
      payment.status = "completed";
      await payment.save();

      return res.json({ status: "success" });
    } catch (err) {
      console.error("DB error:", err);
      return res.status(500).send("Internal server error");
    }
  } else {
    return res.status(400).send("Invalid signature");
  }
});



module.exports = router
