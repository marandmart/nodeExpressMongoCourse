import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://marandmar:kamtut-0wazde-peJwuj@basecluster.qrvu1rs.mongodb.net/curso-node"
);

let db = mongoose.connection;

export default db;
