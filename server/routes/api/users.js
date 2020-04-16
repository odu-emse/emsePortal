import express from "express";
const users = express.Router();
import User from "../../models/User";
import UserSession from "../../models/UserSession";

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
  const { body } = req;
  const { firstName, lastName, email, password } = body;

  if (!firstName) {
    return res.status(400).send({
      success: false,
      message: "First name cannot be blank."
    });
  }
  if (!lastName) {
    return res.status(400).send({
      success: false,
      message: "Last name name cannot be blank."
    });
  }
  if (!email) {
    return res.status(400).send({
      success: false,
      message: "Email cannot be blank."
    });
  }
  if (!password) {
    return res.status(400).send({
      success: false,
      message: "Password cannot be blank."
    });
  }

  const modEmail = email.toLowerCase();

  // verify email doesnt exist
  User.find(
    {
      email: modEmail
    },
    (err, prev) => {
      if (err) {
        return res.status(400).send({
          success: false,
          message: "An error occured."
        });
      } else if (prev.length > 0) {
        return res.status(400).send({
          success: false,
          message: "User with those credentials already exsists."
        });
      }

      //Save new user
      const newUser = new User();

      newUser.email = modEmail;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.status(400).send({
            success: false,
            message: "Cannot register new user."
          });
        }
        return res.status(200).send({
          success: true,
          message: "User register."
        });
      });
    }
  );
});

users.post("/login", (req, res, next) => {
  const { body } = req;
  const { email, password } = body;

  if (!email) {
    return res.status(400).send({
      success: false,
      message: "Email cannot be blank."
    });
  }
  if (!password) {
    return res.status(400).send({
      success: false,
      message: "Password cannot be blank."
    });
  }

  const modEmail = email.toLowerCase();

  // verify if password is valid
  User.find(
    {
      email: modEmail
    },
    (err, users) => {
      if (err) {
        return res.status(400).send({
          success: false,
          message: "Server error."
        });
      }
      if (users.length != 1) {
        return res.status(400).send({
          success: false,
          message: "Some error occured."
        });
      }

      const user = users[0];

      if (!user.validPassword(password, user.password)) {
        return res.status(400).send({
          success: false,
          message: "Credential aren't matching our records."
        });
      }

      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.status(400).send({
            success: false,
            message: "An error occured."
          });
        } else {
          return res.status(200).send({
            success: true,
            message: "Valid login",
            token: doc._id
          });
        }
      });
    }
  );
});

// Authenticator
users.get("/verify", (req, res, next) => {
  const { query } = req;
  const { token } = query;

  console.log(query);

  UserSession.find({
    _id: token,
    isDeleted: false
  })
    .then((session, err) => {
      if (err) {
        return res.status(400).send({
          success: false,
          message: "Server error."
        });
      }
      if (session.length != 1) {
        return res.status(400).send({
          success: false,
          message: "Credentials don't match our records."
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "Successful verification."
        });
      }
    })
    .catch(err => {
      console.error(err);
      next();
    });
});

//closing session
users.get("/logout", (req, res) => {
  const { query } = req;
  const { token } = query;

  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false
    },
    {
      $set: { isDeleted: true }
    },
    null,
    (err, sessions) => {
      if (err) {
        return res.status(400).send({
          success: false,
          message: "Server error."
        });
      }
      return res.status(200).send({
        success: true,
        message: "Successful verification."
      });
    }
  );
});

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

export default users;
