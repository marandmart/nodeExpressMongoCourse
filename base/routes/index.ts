import express from "express";
import { Application } from "express-serve-static-core";
import books from "./booksRoutes.js";

const routes = (app: Application) => {
  app
    .route("/")
    .get((_: express.Request, res: express.Response) =>
      res.send({ title: "Curso de Node" })
    );

  app.use(express.json(), books);
};

export default routes;
