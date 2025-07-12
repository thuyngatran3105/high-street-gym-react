import { db_conn } from "../database.js";

export function newUser(id, email, password, role, phone, firstname, lastname, address, auth_key) {
    return {
        id,
        email,
        password,
        role,
        phone,
        firstname,
        lastname,
        address,
        auth_key,
    }
}

//Create
export function create(user) {
    return db_conn.query(`
    INSERT INTO users (user_email, user_password, user_role, user_phone, user_firstname, user_lastname, user_address)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [user.email, user.password, user.role, user.phone, user.firstname, user.lastname, user.address])
}

//Read
// export function getAll() {
//     return db_conn.query(`SELECT * FROM users WHERE user_removed = 0`)
//         .then(([queryResult]) => {
//             return queryResult.map(row => newUser(
//                 row.user_id,
//                 row.user_email,
//                 row.user_password,
//                 row.user_role,
//                 row.user_phone,
//                 row.user_firstname,
//                 row.user_lastname,
//                 row.user_address
//             ))
//         })
// }

export function getById(id) {
    return db_conn.query(`SELECT * FROM users WHERE user_id = ? `, [id])
        .then(([queryResult]) => {
            if (queryResult.length > 0) {
                const row = queryResult[0]
                return newUser(
                    row.user_id,
                    row.user_email,
                    row.user_password,
                    row.user_role,
                    row.user_phone,
                    row.user_firstname,
                    row.user_lastname,
                    row.user_address,
                    row.user_auth_key
                )
            } else {
                return Promise.reject("no matching results")
            }
        })
}

export function getByEmail(email) {
    return db_conn.query(`SELECT * FROM users WHERE user_email = ? AND user_removed = 0`, [email])
      .then(([queryResult]) => {
        if (queryResult.length > 0) {
          const row = queryResult[0];
  
          return newUser(
            row.user_id,
            row.user_email,
            row.user_password,
            row.user_role,
            row.user_phone,
            row.user_firstname,
            row.user_lastname,
            row.user_address,
            row.user_auth_key
          );
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.error("Database error while querying email", err);
      });
  }
  

export function getByAuthKey(auth_key) {
    return db_conn.query(`SELECT * FROM users WHERE user_auth_key = ? AND user_removed = 0`, [auth_key])
        .then(([queryResult]) => {
             // check that at least 1 match was found
            if (queryResult.length > 0) {
                // get the first matching result
                const row = queryResult[0]

                // convert result into a model object
                return newUser(
                    row.user_id,
                    row.user_email,
                    row.user_password,
                    row.user_role,
                    row.user_phone,
                    row.user_firstname,
                    row.user_lastname,
                    row.user_address,
                    row.user_auth_key
                )
            } else {
                return Promise.reject("no matching results")
            }
        })
}

//Update
export function update(user) {
    return db_conn.query(`
    UPDATE users 
    SET user_email = ?, user_password = ?, user_role = ?, user_phone = ?, user_firstname = ?, user_lastname = ?, user_address = ?, user_auth_key = ?
    WHERE user_id = ?
    `, [user.email, user.password, user.role, user.phone, user.firstname, user.lastname, user.address, user.auth_key, user.id])
}

//Delete
// export function deleteById(userId) {
//     return db_conn.query(`
//     UPDATE users
//     SET user_removed = 1
//     WHERE user_id = ?
//     `, [userId])
// }