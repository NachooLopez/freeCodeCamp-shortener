const mongoose = require("mongoose");
const { Schema } = mongoose;

const UrlSchema = new Schema({
  destination: { type: String, unique: true, required: true },
  number: Number,
});

module.exports = Url = mongoose.model("Url", UrlSchema);
