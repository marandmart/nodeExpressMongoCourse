import express from "express";
import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import IncorrectRequest from "../errors/IncorrectRequest.js";
import ValidationError from "../errors/ValidationError.js";

export default function errorHandler(
  error: express.ErrorRequestHandler,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  if (error instanceof mongoose.Error.CastError) {
    new IncorrectRequest().sendResponse(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendResponse(res);
  }
  new BaseError().sendResponse(res);
}
