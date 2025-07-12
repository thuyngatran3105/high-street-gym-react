import * as Users from "../models/users.js";
import bcrypt from "bcryptjs";
import { v4 as uuid4 } from "uuid";
import validator from "validator";

// POST /api/auth/login
export function loginUser(req, res) {
  const login = req.body;

  //Sanitisation 
  const sanitisedEmail = validator.escape(login.email)
  const sanitisedPassword = validator.escape(login.password)

  // Implement validation
  if (!validator.isEmail(sanitisedEmail)) {
    res.status(400).json({
      status: 400,
      message: "Please enter valid email.",
    });
    return;
  }

  if (!validator.isLength(sanitisedPassword, {min: 6})) {
    res.status(401).json({
      status: 401,
      message:
        "Password must be at least 6 characters and contain a variety of characters.",
    });
    return;
  }

  Users.getByEmail(sanitisedEmail)
    .then((user) => {
      if (bcrypt.compareSync(sanitisedPassword, user.password)) {
        // Generate a new uuid to use as the authentication key
        //and put a copy in the currently loaded user model object
        user.auth_key = uuid4();

        //Save the user model objet back to the database with
        //the new authentication key inside
        Users.update(user).then((result) => {
          res.status(200).json({
            status: 200,
            message: "Logged in",
            user: user,
          });
        });
      } else {
        res.status(401).json({
          status: 401,
          message: "Invalid credentials",
        });
      }
    })
    .catch((err) => {
      res.status(401).json({
        status: 401,
        message: "Invalid credentials",
      });
    });
}

// POST /api/auth/logout
export function logoutUser(req, res) {
  const auth_key = req.get("X-AUTH-KEY");

  Users.getByAuthKey(auth_key)
    .then((user) => {
      user.auth_key = null;

      Users.update(user)
        .then((result) => {
          //Logged out
          res.status(200).json({
            status: 200,
            message: "Logged out",
          });
        })
        .catch((err) => {
          res.status(500).json({
            status: 500,
            message: "Database error",
          });
        });
    })
    .catch((err) => {
      res.status(401).json({
        status: 401,
        message: "Auth key not found / not logged in",
      });
    });
}
