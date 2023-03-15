import "dotenv/config";
import mongoose from "mongoose";

const databaseURL = String(process.env.DATABASE_URL);

mongoose.connect(databaseURL);

let db = mongoose.connection;

export default db;
