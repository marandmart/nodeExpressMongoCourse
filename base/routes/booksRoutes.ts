import express from "express";
import BooksController from "../controllers/booksController.js";

const router = express.Router();

router
  .get("/books", BooksController.list)
  .get("/books/search", BooksController.searchBooksByAuthor)
  .get("/books/:id", BooksController.list)
  .post("/books", BooksController.register)
  .put("/books/:id", BooksController.update)
  .delete("/books/:id", BooksController.delete);

export default router;
