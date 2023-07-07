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
          return;
        }
        res.status(400).send({ message: "ID not found" });
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

  static register = async (req: express.Request, res: express.Response) => {
    const newAuthor = new authors(req.body);
    const { name: hasName, nationality: hasNationality } = newAuthor;
    if (hasName && hasNationality) {
      await authors
        .create(newAuthor)
        .catch((error) => res.status(500).send({ message: error }))
        .then(() => res.status(201).send(newAuthor.toJSON()));
    } else {
      // mandar pro next
      res.status(400).send("Incorrect or incomplete information");
    }
  };

  static delete = async (req: express.Request, res: express.Response) => {
    const authorId = req.params.id;

    await authors
      .deleteOne({ _id: authorId })
      .catch(console.error) // mandar pro next
      .then(() => res.send("Author removed successfully."));
  };

  static update = async (req: express.Request, res: express.Response) => {
    const authorId = req.params.id;

    await authors
      .updateOne({ _id: authorId }, { $set: req.body })
      .catch(console.error) // mandar pro next
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
