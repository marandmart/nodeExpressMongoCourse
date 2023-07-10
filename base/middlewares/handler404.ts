import express from "express";
import NotFound from "../errors/NotFound.js";

const handler404 = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const error404 = new NotFound();
  next(error404);
};

export default handler404;
