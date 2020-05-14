import express from "express";
const users = express.Router();
import User from "../../models/User";
import bcrypt from "bcryptjs";
require("dotenv").config();
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import UserVerify from "../../models/UserVerify";

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
                  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                  const msg = {
                    to: email,
                    from: "daniel_papp@outlook.com",
                    subject:
                      "Asyncronous Learning Management Platform Verification",
                    html: `<strong>damn this is lame no 🧢</strong>
                          <br/>
                          https://localhost:5000/userVerify?token=${user._id}`
                  };
                  sgMail.send(msg);
                  const userVerify = new UserVerify({
                    token: user._id
                  });
                  userVerify.save();
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
      if (user.active == false) {
        return res.status(400).json({
          error:
            "Account not yet activated. Please check your inbox and spam folder for our email."
        });
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

users.get("/userVerify", (req, res, next) => {
  const { token } = req.query;
  console.log(token);
  UserVerify.findOne({ token })
    .then(async document => {
      if (!document) {
        res.status(400).end;
      } else {
        const { expires, used, token } = document;
        //check if used is false
        if (!used) {
          const now = new Date();
          if (expires > now) {
            const filter = { _id: token };
            await User.updateOne(filter, { active: true });
            const updateDoc = await User.findOne();
            //res.json({ updateDoc });
            console.log(updateDoc._id);
            await UserVerify.updateOne(
              { token: updateDoc._id },
              { used: true }
            );
            const toBeRemoved = await UserVerify.findOne();
            res.json({ verify: toBeRemoved, updateDoc });
          } else {
            res.status(400).json({ error: "Error: This token has expired." });
            next();
          }
        } else {
          res
            .status(400)
            .json({ error: "Error: This token has already been used." });
          next();
        }
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
      next();
    });
});

//TODO: [ALMP-90] user id profile check

// users.get("/:id", (req, res, next) => {
//   const { id } = req.params;
//   User.findById(id)
//     .then(user => {
//       if (!user) throw err;
//       res.status(200).json({ user });
//     })
//     .catch(err => {
//       res.status(400).json({ err });
//       next();
//     });
// });

export default users;
