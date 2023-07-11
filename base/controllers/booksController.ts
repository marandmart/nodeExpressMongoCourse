import NotFound from "../errors/NotFound.js";
import authors from "../models/Author.js";
import books from "../models/Book.js";
import express from "express";

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
        // author is the name of the variable inside the collection
        // name is the field that I want to show
        const allBooks = await books.find().populate("author", "name").exec();
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

  static searchBooksByAuthor = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const authorBooks = await books
        .find({ author: req.query.id })
        .populate("author", "name")
        .exec();
      if (authorBooks) {
        res.send(authorBooks);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default BooksController;
