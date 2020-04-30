import express from "express";
import path from "path";
import passport from "passport";
import Cors from "cors";
import { database } from "./config/db";
import flash from "connect-flash";
import session from "express-session";

require("./config/passport");

const app = express();

//Middleware
app.use(Cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

// app.use(flash());
// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   next();
// });

//Router imports
import course from "./routes/api/course";
import modules from "./routes/api/modules";
import users from "./routes/api/users";

//Database configuration
database();

//Routes
app.use("/api/modules", modules);
app.use("/api/course", course);
app.use("/api/users", users);

//Serve static assets if in prod
if (process.env.NODE_ENV === "production") {
  //set static dir
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

export default app;
