import express from "express";
const users = express.Router();
import User from "../../models/User";
import passport from "passport";
import bcrypt from "bcryptjs";
require("dotenv").config();
import jwt from "jsonwebtoken";

//Authenticator
users.get("/verify", (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (bearerToken) {
    const token = bearerToken.split(" ")[1];
    if (token !== "null") {
      jwt.verify(token, process.env.jwtSecret, (err, result) => {
        if (err) {
          res.status(400);
          console.error(err);
          next();
        }
        User.findById(result.id)
          .then(data => {
            if (!data) {
              res.status(400);
            } else {
              res.status(200).json({
                authenticated: true,
                data
              });
            }
          })
          .catch(err => {
            res.status(400);
            console.error(err);
            next();
          });
      });
    } else {
      return res.status(401);
    }
  } else {
    return res.status(401);
  }
});

//-------------------------DEV debug helper route----------------------------------------
users.get("/", (req, res, next) => {
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
  const { firstName, lastName, email, password, passwordConf } = req.body;
  User.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(400).json("email already in use");
      } else {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password,
          passwordConf
        });
        if (password == passwordConf) {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.passwordConf = newUser.password;
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
        } else {
          res.status(400);
          next();
        }
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
