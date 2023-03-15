import authors from "../models/Author.js";
import express from "express";

class AuthorController {
  static list = async (req: express.Request, res: express.Response) => {
    if (req.params.id) {
      await authors
        .findOne({ _id: req.params.id })
        .catch(console.error)
        .then((author) => res.status(201).send(author?.toJSON()));
    } else {
      await authors
        .find()
        .catch(console.error)
        .then((authors) => res.send(authors));
    }
  };

  static register = async (req: express.Request, res: express.Response) => {
    const newAuthor = new authors(req.body);
    const { name: hasName, nationality: hasNationality } = newAuthor;
    if (hasName && hasNationality) {
      await authors
        .create(newAuthor)
        .catch((error) => res.status(500).send({ message: error }))
        .then(() => res.status(201).send(newAuthor.toJSON()));
    } else {
      res.status(400).send("Incorrect or incomplete information");
    }
  };

  static delete = async (req: express.Request, res: express.Response) => {
    const authorId = req.params.id;

    await authors
      .deleteOne({ _id: authorId })
      .catch(console.error)
      .then(() => res.send("Author removed successfully."));
  };

  static update = async (req: express.Request, res: express.Response) => {
    const authorId = req.params.id;

    await authors
      .updateOne({ _id: authorId }, { $set: req.body })
      .catch(console.error)
      .then((response) => {
        if (!response?.acknowledged)
          res.status(400).send("Incorrect parametters");
        response?.matchedCount === 1
          ? res.send("Author updated successfully")
          : res.status(400).send("Author id is incorrect or doesn't exist");
      });
  };
}

export default AuthorController;
