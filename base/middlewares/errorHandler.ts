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
  }
  res.status(500).send({ message: "Server error" });
}
