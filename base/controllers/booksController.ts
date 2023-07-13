import NotFound from "../errors/NotFound.js";
import { authors, books } from "../models/index.js";
import express from "express";
import { isEmptyObject } from "../utils/index.js";
import IncorrectRequest from "../errors/IncorrectRequest.js";
import { SortOrder } from "mongoose";

class BooksController {
  static list = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      if (req.params.id) {
        const book = await books
          .findOne({ _id: req.params.id })
          .populate("author")
          .exec();
        if (book !== null) {
          res.status(201).send(book.toJSON());
        }
        next(new NotFound("Book not found"));
      } else {
        const { limit = 5, page = 1, ordering = "_id:-1" } = req.query;

        const [field, order] = String(ordering).split(":");
        if (
          Number(limit) <= 0 ||
          Number(page) <= 0 ||
          Number.isNaN(Number(limit)) ||
          Number.isNaN(Number(page)) ||
          (Number(order) !== 1 && Number(order) !== -1)
        )
          next(new IncorrectRequest());

        const sortObj = {
          [field]: Number(order) as SortOrder,
        };

        const allBooks = await books
          .find()
          .sort(sortObj)
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit))
          // author is the name of the variable inside the collection
          // name is the field that I want to show
          .populate("author", "name")
          .exec();
        if (allBooks !== null) {
          res.status(201).send(allBooks);
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
    try {
      const { author } = req.body;
      const authorInDatabase = await authors.findOne({ name: author });
      if (!authorInDatabase) throw new NotFound("Author is not in database");
      const { _id } = authorInDatabase;
      const newBook = { ...req.body, author: _id };
      const newlyCreatedBook = await books.create(newBook);
      if (newlyCreatedBook) {
        res.status(201).send(newlyCreatedBook.toJSON());
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
    const bookId = req.params.id;
    try {
      const deletedBook = await books.deleteOne({ _id: bookId });
      if (deletedBook) {
        res.send("Book removed successfully.");
      }
      next(new NotFound("Book not found"));
    } catch (error) {
      next(error);
    }
  };

  static update = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const bookId = req.params.id;
    try {
      const { matchedCount } = await books.updateOne(
        { _id: bookId },
        { $set: req.body }
      );
      if (matchedCount === 1) {
        res.send("Book updated successfully");
      }
      next(new NotFound("Book not found"));
    } catch (error) {
      next(error);
    }
  };

  static searchBooks = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { author, title, minPages, maxPages } = req.query;
    let authorId;

    try {
      if (author) {
        const authorInDatabase = await authors.findOne({
          name: { $regex: author, $options: "i" },
        });
        if (authorInDatabase) {
          const { _id } = authorInDatabase;
          authorId = _id;
        }
      }

      const parameters = Object.fromEntries(
        Object.entries({
          author: authorId,
          title: title && { $regex: title, $options: "i" },
          pageQnt:
            (maxPages && minPages && { $gte: minPages, $lte: maxPages }) ||
            (minPages && { $gte: minPages }) ||
            (maxPages && { $lte: maxPages }),
        }).filter(([_, value]) => value)
      );

      if (isEmptyObject(parameters)) res.send([]);

      const searchResult = await books
        .find(parameters)
        .populate("author", "name")
        .exec();
      if (searchResult) {
        res.send(searchResult);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default BooksController;
