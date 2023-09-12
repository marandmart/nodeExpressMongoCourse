import express, { Application } from "express";
import books from "./booksRoutes.js";
import authors from "./authorsRoutes.js";

const routes = (app: Application) => {
  app
    .route("/")
    .get((_: express.Request, res: express.Response) =>
      res.send({ title: "Curso de Node" })
    );

  app.use(books, authors);
};

export default routes;
