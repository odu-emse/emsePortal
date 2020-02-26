import express from "express";
const authRoute = express.Router();
import User from "../../models/User";
import bcript from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth";

authRoute.post("/", (req, res) => {
  //deconstructing the body getting from the server
  const { email, password } = req.body;

  //check for completed fields
  if (!email || !password) {
    res.status(400).json({ msg: "Please fill in all fields." });
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      //error handling for non-existing user trying to sign in
      res
        .status(400)
        .json({ msg: "User does not exist, please verify your credentials." });
    }
    //validating password
    bcript.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid credentials." });

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
    });
  });
});

//checks for token availability
authRoute.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

export { authRoute };
