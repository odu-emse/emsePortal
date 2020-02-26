import express from "express";
import mongoose from "mongoose";
import path from "path";
require("dotenv").config();

const app = express();

//Middleware
app.use(express.json());

//Router imports
import { course } from "./routes/api/course";
import { modules } from "./routes/api/modules";
import { users } from "./routes/api/users";
import { authRoute } from "./routes/api/auth";

//Database configuration
let url = process.env.MongoURI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
};
mongoose
  .connect(url, options)
  .then(() => {
    console.log("Connected to db... ");
  })
  .catch(err => {
    console.error(err);
  });

//Routes
app.use("/api/modules", modules);
app.use("/api/course", course);
app.use("/api/users", users);
app.use("/api/auth", authRoute);

//Serve static assets if in prod
if (process.env.NODE_ENV === "production") {
  //set static dir
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

export default app;
