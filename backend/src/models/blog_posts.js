import { db_conn } from "../database.js";

export function newPost(id, datetime, user_id, title, content) {
    return {
        id,
        datetime,
        user_id,
        title,
        content
    }
}

//Create
export function create(post) {
    return db_conn.query(`
    INSERT INTO blog_posts (post_datetime, post_user_id, post_title, post_content)
    VALUES (?, ?, ?, ?)
    `, [post.datetime, post.user_id, post.title, post.content])
}

//Delete
export function deleteById(postID) {
    return db_conn.query(`DELETE FROM blog_posts WHERE post_id = ?`, [postID])
}