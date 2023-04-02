const mongoose = require("mongoose");
const subscriptionSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    amountPaid: { type: Number, required: true },
    currency: { type: String, required: true },
    paymentRef: { type: String, required: true },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "subscription" },
    meta: {},
    duration: Number, // days
    quantity: Number,
    expired: { type: Boolean, default: false },
    expireAt: { type: Date, default: null },
    user: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("subscription", subscriptionSchema);
