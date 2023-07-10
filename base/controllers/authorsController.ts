import NotFound from "../errors/NotFound.js";
import authors from "../models/Author.js";
import express from "express";

class AuthorController {
  static list = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      if (req.params.id) {
        const author = await authors.findOne({ _id: req.params.id });
        if (author !== null) {
          res.status(201).send(author.toJSON());
        }
        next(new NotFound("Author not found"));
      } else {
        const allAuthors = await authors.find();
        if (allAuthors !== null) {
          res.status(201).send(allAuthors);
        }
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
      const deletedAuthor = await authors.deleteOne({ _id: authorId });
      if (deletedAuthor) res.send("Author removed successfully.");
      next(new NotFound("Author not found"));
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
