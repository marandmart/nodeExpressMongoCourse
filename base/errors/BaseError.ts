import express from "express";

class BaseError extends Error {
  status: number;

  constructor(message = "Internal server error", status = 500) {
    super();
    this.message = message;
    this.status = status;
  }

  sendResponse(res: express.Response) {
    res
      .status(this.status)
      .send({ message: this.message, status: this.status });
  }
}

export default BaseError;
