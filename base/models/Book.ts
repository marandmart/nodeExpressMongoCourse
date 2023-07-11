import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
  id: { type: String },
  title: {
    type: String,
    required: [true, "Book title is a required field"],
  },
  author: {
    type: String,
    ref: "authors",
    required: [true, "Author is a required field"],
  },
  pageQnt: {
    type: Number,
    required: [true, "Page quantity is a required field"],
    // native way of doing number validation
    // min: [20, "Minimal number of pages is 20. Value given {VALUE}"],
    // max: [10000, "Maximal number of pages is 10000. Value given {VALUE}"],
    // custom validation
    validate: {
      validator: (value: number): boolean => value >= 20 && value <= 10000,
      message:
        "Number of pages should be more than 20 and less than 10000. Value given {VALUE}",
    },
  },
});

const books = mongoose.model("books", booksSchema);

export default books;
