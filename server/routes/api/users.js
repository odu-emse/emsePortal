import express from "express";
const users = express.Router();
import User from "../../models/User";
import passport from "passport";
import bcrypt from "bcryptjs";
require("dotenv").config();
import jwt from "jsonwebtoken";

//Authenticator
users.get(
  "/verify",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    console.log(req.user);
    return res.send(req.user);
  }
);

//-------------------------DEV debug helper route----------------------------------------
users.get("/", (req, res, next) => {
  //res.redirect("/users/login");
  User.find()
    .then(data => {
      if (!data) {
        return res.status(404).end;
      } else {
        res.status(200).json({
          conf: "success",
          data: data
        });
      }
    })
    .catch(err => {
      console.error(err);
      next();
    });
});
//-------------------------End of DEV debug helper route---------------------------------

users.post("/register", (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(400).json("email already in use");
      } else {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password
        });
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.json(user);
              })
              .catch(err => {
                res.status(400).json(err);
                console.error(err);
              });
          });
        });
      }
    })
    .catch(err => {
      return console.error(err);
    });
});

users.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).send("no fields");
  }
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(400).json("no account found with these credentials");
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { id: user._id };
          jwt.sign(
            payload,
            process.env.jwtSecret,
            { expiresIn: 36000 },
            (err, token) => {
              if (err) {
                return res.status(500).json(`Token error: ${err}`);
              }
              res.send({
                success: true,
                token
              });
            }
          );
        } else {
          return res.status(401).json("incorrect password given");
        }
      });
    })
    .catch(err => {
      res.status(400).json(err);
      return console.error(err);
    });
});

export default users;
