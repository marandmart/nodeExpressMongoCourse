import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: [true, "Name is a required field"] },
    nationality: {
      type: String,
      required: [true, "Nationality is a required field"],
    },
  },
  { versionKey: false }
);

const authors = mongoose.model("authors", authorSchema);

export default authors;
