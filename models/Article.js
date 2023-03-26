import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    phone: String,
  },
  { strict: false }
);

module.exports = mongoose.models.article || mongoose.model("article", articleSchema);