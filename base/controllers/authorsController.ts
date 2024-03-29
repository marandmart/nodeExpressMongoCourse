import BaseError from "../errors/BaseError.js";
import NotFound from "../errors/NotFound.js";
import { authors } from "../models/index.js";
import express from "express";
import { paginateResponse } from "../utils/index.js";

class AuthorController {
  static list = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      if (req.params.id) {
        const author = await authors.findOne({ _id: req.params.id });

        author !== null
          ? res.status(201).send(author.toJSON())
          : next(new NotFound("Author not found"));
      } else {
        paginateResponse(req, res, next, authors);
      }
    } catch (error) {
      next(error);
    }
  };

  static register = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const newAuthor = new authors(req.body);
    try {
      const createdAuthor = await authors.create(newAuthor);
      if (createdAuthor) {
        res.status(201).send(newAuthor.toJSON());
      }
    } catch (error) {
      next(error);
    }
  };

  static delete = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const authorId = req.params.id;

    try {
      const { acknowledged, deletedCount } = await authors.deleteOne({
        _id: authorId,
      });
      if (!acknowledged) return next(new BaseError());

      if (deletedCount === 1) res.send("Author removed successfully.");
      else next(new NotFound("Author not found"));
    } catch (error) {
      next(error);
    }
  };

  static update = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const authorId = req.params.id;
    try {
      const { matchedCount } = await authors.updateOne(
        { _id: authorId },
        { $set: req.body }
      );
      if (matchedCount === 1) {
        res.send("Author updated successfully");
      }
      next(new NotFound("Author not found"));
    } catch (error) {
      next(error);
    }
  };
}

export default AuthorController;
