import * as Users from "../models/users.js";
import bcrypt from "bcryptjs";
import validator from "validator";

//GET /api/users/:id
export function getUserById(req, res) {
  const id = req.params.id;
  Users.getById(id)
    .then((user) => {
      res.status(200).json({
        status: 200,
        message: "Found user",
        user: user,
      });
    })
    .catch((err) => {
      if (err == "no matching results") {
        res.status(404).json({
          status: 404,
          message: "User not found",
          err,
        });
      } else {
        res.status(500).json({
          status: 500,
          message: "Database error while loading user",
          err,
        });
      }
    });
}

//GET /api/users/key/:authKey
export function getUserByAuthKey(req, res) {
  const authKey = req.params.authKey;

  Users.getByAuthKey(authKey)
    .then((user) => {
      res.status(200).json({
        status: 200,
        message: "Found user",
        user: user,
      });
    })
    .catch((err) => {
      if (err == "no matching results") {
        res.status(404).json({
          status: 404,
          message: "User not found",
          err,
        });
      } else {
        res.status(500).json({
          status: 500,
          message: "Database error while loading user",
          err,
        });
      }
    });
}

//POST /api/users/register
export function createNewUser(req, res) {
  // Get the user data out of the request
  const userData = req.body;

  // Implement validation
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.email)) {
    res.status(400).json({
      status: 400,
      message: "Please enter valid email.",
    });
    return;
  }

  if (!/^[a-zA-Z0-9-]{6,}$/.test(userData.password)) {
    res.status(401).json({
      status: 401,
      message:
        "Password must be at least 6 characters and contain a variety of characters.",
    });
    return;
  }

  if (
    !/(^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$)/.test(
      userData.phone
    )
  ) {
    res.status(400).json({
      status: 400,
      message: "Please enter a valid Australian phone number",
    });
    return;
  }

  if (!/^[a-zA-Z\-]{2,}$/.test(userData.firstname)) {
    res.status(400).json({
      status: 400,
      message: "First name must be letters",
    });
    return;
  }

  if (!/^[a-zA-Z\-]{2,}$/.test(userData.lastname)) {
    res.status(400).json({
      status: 400,
      message: "Last name must be letters",
    });
    return;
  }

  if (
    !/^\d{1,5} [A-Za-z]+(?: [A-Za-z]+)* (Street|Road|Ave|Avenue|Boulevard|Blvd|Drive|Dr|Lane|Ln|Court|Ct|Circle|Cir|Square|Sq|Trail|Trl|Parkway|Pkwy), [A-Za-z]+(?: [A-Za-z]+)*$/.test(
      userData.address
    )
  ) {
    res.status(400).json({
      status: 400,
      message: "Please enter a valid address",
    });
    return;
  }

  // hash the password
  userData.password = bcrypt.hashSync(userData.password);

  Users.getByEmail(userData.email).then((existingUser) => {
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        message:
          "The email address is already associated with another account.",
      });
    } else {
      const user = Users.newUser(
        null,
        validator.escape(userData.email),
        userData.password,
        "Member",
        validator.escape(userData.phone),
        validator.escape(userData.firstname),
        validator.escape(userData.lastname),
        validator.escape(userData.address),
        null
      );

      Users.create(user)
        .then((user) => {
          res.status(200).json({
            status: 200,
            message: "Registration successful",
            user: user,
          });
        })
        .catch((error) => {
          res.status(500).json({
            status: 500,
            message: "Registration failed",
            error,
          });
        });
    }
  });
}

// PATCH /api/users/:id
export async function updateUser(req, res) {
  const userID = req.params.id;
  //Authenticate the user using auth key
  const auth_key = req.get("X-AUTH-KEY");
  const body = req.body.user;

  Users.getByAuthKey(auth_key).then((loggedInUser) => {
    if (loggedInUser.id !== parseInt(userID)) {
      return res.status(403).json({
        status: 403,
        message: "You are not authorised to update this user.",
      });
    } else {

    Users.getById(userID)
      .then((existingUser) => {
        if (!existingUser) {
          return res.status(404).json({
            status: 404,
            message: "User not found",
          });
        }

        // Validate email format if provided
        if (body.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(body.email)) {
          res.status(400).json({
            status: 400,
            message: "Please enter a valid email.",
          });
          return;
        }

        if (body.phone &&
          !/(^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$)/.test(
            body.phone
          )
        ) {
          res.status(400).json({
            status: 400,
            message: "Please enter a valid Australian phone number",
          });
          return;
        }

        if (body.firstname && !/^[a-zA-Z\-]{2,}$/.test(body.firstname)) {
          res.status(400).json({
            status: 400,
            message: "First name must be letters",
          });
          return;
        }

        if (body.lastname && !/^[a-zA-Z\-]{2,}$/.test(body.lastname)) {
          res.status(400).json({
            status: 400,
            message: "Last name must be letters",
          });
          return;
        }

        if (body.address &&
          !/^\d{1,5} [A-Za-z]+(?: [A-Za-z]+)* (Street|Road|Ave|Avenue|Boulevard|Blvd|Drive|Dr|Lane|Ln|Court|Ct|Circle|Cir|Square|Sq|Trail|Trl|Parkway|Pkwy), [A-Za-z]+(?: [A-Za-z]+)*$/.test(
            body.address
          )
        ) {
          res.status(400).json({
            status: 400,
            message: "Please enter a valid address",
          });
          return;
        }

        // Hash the password only if its in plain text
        if (body.password && !body.password.startsWith("$2a")) {
          if (!/^[a-zA-Z0-9-]{6,}$/.test(body.password)) {
            return res.status(400).json({
              status: 400,
              message: "Password must be at least 6 characters long.",
            });
          }
          body.password = bcrypt.hashSync(body.password);
        } else {
          // Keep existing password if not changed
          body.password = existingUser.password;
        }

        // Check for email uniqueness if the email is changed
        if (body.email && body.email !== existingUser.email) {
          return Users.getByEmail(body.email)
            .then((emailUser) => {
              if (emailUser) {
                return res.status(409).json({
                  status: 409,
                  message:
                    "The provided email address is already associated with another account.",
                });
              } else {
                updateUserDetails();
              }
            })
            .catch((err) => {
              res.status(500).json({
                status: 500,
                message: "Database error while checking email",
                err,
              });
            });
        } else {
          updateUserDetails();
        }

        function updateUserDetails() {
          const user = Users.newUser(
            userID,
            body.email ? validator.escape(body.email) : existingUser.email,
            body.password,
            existingUser.role,
            body.phone ? validator.escape(body.phone) : existingUser.phone,
            body.firstname ? validator.escape(body.firstname) : existingUser.firstname,
            body.lastname ? validator.escape(body.lastname) : existingUser.lastname,
            body.address ? validator.escape(body.address) : existingUser.address,
            body.auth_key
          );

          Users.update(user)
            .then((result) => {
              res.status(200).json({
                status: 200,
                message: "User updated successfully",
                user: result,
              });
            })
            .catch((err) => {
              res.status(500).json({
                status: 500,
                message: "Database error while updating user",
                err,
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          status: 500,
          message: "Database error while retrieving user",
          err,
        });
      });
  }
}
  );
}
