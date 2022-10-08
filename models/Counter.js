const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CounterSchema = new Schema({
  _id: String,
  value: Number,
});

module.exports = Counter = model("Counter", CounterSchema);
