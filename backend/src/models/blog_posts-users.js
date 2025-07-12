import { db_conn } from "../database.js";

export function newPostUser(
  post_id,
  post_datetime,
  post_user_id,
  post_title,
  post_content,
  user_id,
  user_email,
  user_password,
  user_role,
  user_firstname,
  user_lastname,
  user_address
) {
  return {
    post_id,
    post_datetime,
    post_user_id,
    post_title,
    post_content,
    user_id,
    user_email,
    user_password,
    user_role,
    user_firstname,
    user_lastname,
    user_address,
  };
}

export function getAll() {
  return db_conn
    .query(
      `
    SELECT * FROM blog_posts 
    INNER JOIN users ON blog_posts.post_user_id = users.user_id
    WHERE user_removed = 0
    ORDER BY post_datetime DESC
    `
    )
    .then(([queryResult]) => {
      return queryResult.map((row) =>
        newPostUser(
          row.post_id,
          row.post_datetime,
          row.post_user_id,
          row.post_title,
          row.post_content,
          row.user_id,
          row.user_email,
          row.user_password,
          row.user_role,
          row.user_firstname,
          row.user_lastname,
          row.user_address
        )
      );
    })
    .catch((error) => {
      return Promise.reject("No matching results" + error);
    });
}
