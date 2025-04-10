const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true }, // Name-based searches
  category: { type: String, required: true, index: true }, // Category filtering
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

// Compound Index: Faster searches when filtering by both name & category
ProductSchema.index({ name: 1, category: 1 });

module.exports = mongoose.model("Product", ProductSchema);
