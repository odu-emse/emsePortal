import express from "express";
const users = express.Router();
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//-------------------------DEV debug helper route----------------------------------------
users.get("/", (req, res) => {
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
    });
});
//-------------------------End of DEV debug helper route---------------------------------

//Handling the user who send GET request for register component
users.get("/register", (req, res) => {
  res.status(200).json({ msg: "WIP: need to compete form component." });
});

//Handling the user who sends GET request for login component
users.get("/login", (req, res) => {
  res.status(200).json({ msg: "WIP: need to compete form component." });
});

//closing session
users.get("/logout", (req, res) => {});

//user profile page
users.get("/:id", (req, res, next) => {
  const id = req.params.id;
  User.findOne({ _id: id })
    .then(data =>
      res.status(200).json({
        msg: "success",
        user: data
      })
    )
    .catch(err => console.error(err));
});

//Handling form submission for registration
users.post("/register", (req, res) => {
  //deconstructing the body getting from the server
  const { firstName, lastName, email, password } = req.body;

  //creates empty errors array to store response in
  let errors = [];

  //check for completed fields
  if (!firstName || !lastName || !email || !password) {
    errors.push({ msg: "Please fill in all fields." });
  }

  //adding errors to array if present
  if (errors.length > 0) {
    errors.push({ msg: "An error occurred." });
    res.status(400);
  } else {
    User.findOne({ email }).then(user => {
      if (user) {
        //error handling for existing user trying to sign up
        errors.push({
          msg:
            "This email is already in use. Please sign in, or contact the administrator."
        });
        res.status(400);
      } else {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password
        });

        //password hashing
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            //changed plain text password to hashed and saved in db
            newUser.password = hash;

            //saving POST data in db
            newUser
              .save()
              .then(user => {
                //Gen JWT

                jwt.sign(
                  {
                    id: user.id
                  },
                  process.env.jwtSecret,
                  {
                    expiresIn: 3600
                  },
                  (err, token) => {
                    if (err) throw err;

                    res.status(200).json({
                      token,
                      user: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                      }
                    });
                  }
                );
              })
              .catch(err => console.log(err));
          })
        );
      }
    });
  }
});

export default users;
