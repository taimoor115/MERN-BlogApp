import express from "express";
import { MongoURL, PORT } from "./config.js";
import mongoose from "mongoose";
const app = express();

main()
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MongoURL);
}

app.get("/", (req, res) => {
  res.send("Server working fine....");
});

app.listen(PORT, () => {
  console.log(`Server working on port ${PORT}`);
});
