const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    materialId: {
      type: String,
      required: true,
      unique: true
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    category: {
      type: String,
      requires: [true, "catergory is required"],
    },
    description: {
      type: String,
      required: [true, "desc is required"],
    },
    paymentStatus: {
      type: String,
      required: [true, "Payment status is required"],
    },
    orderStatus: {
      type: String,
      required: [true, "Order status is required"],
    }
  },
  { timestamps: true }
);

const materialModel = mongoose.model("materials", materialSchema);
module.exports = materialModel;
