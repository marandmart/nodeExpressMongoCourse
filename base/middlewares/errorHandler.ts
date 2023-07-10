import express from "express";
import mongoose from "mongoose";

export default function errorHandler(
  error: express.ErrorRequestHandler,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: "One or more data points are incorrect" });
    return;
  } else if (error instanceof mongoose.Error.ValidationError) {
    const errorMessages = Object.values(error.errors)
      .map((error) => error.message)
      .join(", ");
    res
      .status(400)
      .send({
        message: `Incorrect or incomplete information: ${errorMessages}`,
      });
  }
  res.status(500).send({ message: "Server error" });
}
