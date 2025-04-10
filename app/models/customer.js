const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, index: true }, // Indexed for fast lookup
  age: { type: Number },
  location: { type: String },
  gender: { type: String },
});

module.exports = mongoose.model("Customer", CustomerSchema);
