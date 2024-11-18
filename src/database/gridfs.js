// src/database/gridfs.js
import mongoose from "mongoose";
import Grid from "gridfs-stream";

// Create a connection for GridFS
const conn = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;

conn.once("open", () => {
  // Initialize GridFS Stream once the connection is open
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads"); // Specify the collection to store the files
});

export { gfs };
