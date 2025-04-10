const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true, index: true }, // Faster lookup of orders by customer
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, index: true }, // Fast search for product sales
      quantity: { type: Number, required: true },
      priceAtPurchase: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, required: true, index: true }, // Queries based on date range
  status: { type: String, enum: ["pending", "completed", "cancelled"], index: true }, // Queries based on status
});

// Compound Index for optimized order queries
OrderSchema.index({ customerId: 1, orderDate: -1 });

module.exports = mongoose.model("Order", OrderSchema);
