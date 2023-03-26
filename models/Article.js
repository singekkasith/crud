import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    author: String,
    title: String,
    synopsis: String,
    datePublish: String,
    dateUpdate: String,
    status: String,
    note: String,
    content: String,
  },
  { strict: false }
);

module.exports = mongoose.models.chapters || mongoose.model("chapters", articleSchema);