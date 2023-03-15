import express from "express";
import AuthorController from "../controllers/authorsController.js";

const router = express.Router();

router
  .get("/authors", AuthorController.list)
  .get("/authors/:id", AuthorController.list)
  .post("/authors", AuthorController.register)
  .put("/authors/:id", AuthorController.update)
  .delete("/authors/:id", AuthorController.delete);

export default router;
