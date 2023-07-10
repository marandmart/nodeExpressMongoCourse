import IncorrectRequest from "./IncorrectRequest.js";
import mongoose from "mongoose";

class ValidationError extends IncorrectRequest {
  constructor(error: mongoose.Error.ValidationError) {
    const errorMessages = Object.values(error.errors)
      .map((error) => error.message)
      .join(", ");
    super(`Incorrect or incomplete information: ${errorMessages}`);
  }
}

export default ValidationError;
