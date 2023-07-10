import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import handler404 from "./middlewares/handler404.js";

db.on("error", console.log.bind(console, "Connection error"));
db.once("open", () => console.log("Successfully connected to database"));
db.on("exit", () => db.close());

const app = express();

app.use(express.json());

routes(app);

app.use(handler404);

// Error middleware. Treats errors for the whole application
app.use(errorHandler);

export default app;
