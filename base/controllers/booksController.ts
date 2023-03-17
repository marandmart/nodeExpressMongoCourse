import books from "../models/Book.js";
import express from "express";

class BooksController {
  static list = async (req: express.Request, res: express.Response) => {
    if (req.params.id) {
      await books
        .findOne({ _id: req.params.id })
        .populate("author")
        .exec()
        .catch(console.error)
        .then((book) => res.status(201).send(book?.toJSON()));
    } else {
      await books
        .find()
        // author is the name of the variable inside the collection
        // name is the field that I want to show
        .populate("author", "name")
        .exec()
        .catch(console.error)
        .then((books) => res.send(books));
    }
  };

  static register = async (req: express.Request, res: express.Response) => {
    const newBook = new books(req.body);
    const { title: hasTitle, author: hasAuthor, pageQnt: hasPages } = newBook;
    if (hasTitle && hasAuthor && hasPages) {
      await books
        .create(newBook)
        .catch((error) => res.status(500).send({ message: error }))
        .then(() => res.status(201).send(newBook.toJSON()));
    } else {
      res.status(400).send("Incorrect or incomplete information");
    }
  };

  static delete = async (req: express.Request, res: express.Response) => {
    const bookId = req.params.id;

    await books
      .deleteOne({ _id: bookId })
      .catch(console.error)
      .then(() => res.send("Book removed successfully."));
  };

  static update = async (req: express.Request, res: express.Response) => {
    const bookId = req.params.id;

    await books
      .updateOne({ _id: bookId }, { $set: req.body })
      .catch(console.error)
      .then((response) => {
        if (!response?.acknowledged)
          res.status(400).send("Incorrect parametters");
        response?.matchedCount === 1
          ? res.send("Book updated successfully")
          : res.status(400).send("Book id is incorrect or doesn't exist");
      });
  };
}

export default BooksController;
