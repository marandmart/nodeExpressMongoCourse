import BaseError from "./BaseError.js";

class IncorrectRequest extends BaseError {
  constructor(message = "One or more data point are incorrect") {
    super(message, 400);
  }
}

export default IncorrectRequest;
