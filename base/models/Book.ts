import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
    required: true,
  },
  pageQnt: { type: Number, required: true },
});

const books = mongoose.model("books", booksSchema);

export default books;
