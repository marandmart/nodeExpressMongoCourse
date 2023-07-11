import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: [true, "Name is a required field"] },
    nationality: {
      type: String,
      required: [true, "Nationality is a required field"],
      // enum: {
      //   values: ["array of countries that are allowed"],
      //   message: "Error message to display if information does not comply"
      // }
    },
  },
  { versionKey: false }
);

const authors = mongoose.model("authors", authorSchema);

export default authors;
