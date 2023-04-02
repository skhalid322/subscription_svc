const mongoose = require("mongoose");
const subscriptionSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    amount: Number,
    currency: String,
    type: {
      type: String,
      enums: ["duration", "quantity", "duration_quantity"],
    },
    meta: {},
    duration: Number, // days
    quantity: Number,
    expired: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("subscription", subscriptionSchema);
