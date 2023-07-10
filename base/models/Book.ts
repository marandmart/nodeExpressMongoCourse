import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: [true, "Book title is a required field"] },
  author: {
    type: String,
    ref: "authors",
    required: [true, "Author name is a required field"],
  },
  pageQnt: {
    type: Number,
    required: [true, "Page quantity is a required field"],
  },
});

const books = mongoose.model("books", booksSchema);

export default books;
