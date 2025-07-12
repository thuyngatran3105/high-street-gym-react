import validator from "validator";
import * as Blogs from "../models/blog_posts-users.js";
import * as PostBlog from "../models/blog_posts.js";
import * as Users from "../models/users.js";

//GET /api/blogs
export async function getAllBlogs(req, res) {
  //Authenticate the user using auth key
  const auth_key = req.get("X-AUTH-KEY");
  const currentUser = await Users.getByAuthKey(auth_key);
  Blogs.getAll()
    .then((blogs) => {
      res.status(200).json({
        status: 200,
        message: "Loaded all blogs",
        blogs: blogs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        message: "Failed to load all blogs",
        err,
      });
    });
}

//POST /api/createBlog
export async function createBlog(req, res) {
  //Authenticate the user using auth key
  const auth_key = req.get("X-AUTH-KEY");
  const currentUser = await Users.getByAuthKey(auth_key);

  const body = req.body;

  // Validation
  if (
    !validator.isLength(body.post_title, { min: 5, max: 255 }) ||
    /[^\w\s]/.test(body.title)
  ) {
    res.status(400).json({
      status: 400,
      message:
        "Post title must be between 5 and 255 characters and does not content special characters.",
    });
    return;
  }

  if (!validator.isLength(body.post_content, { min: 5, max: 600 })) {
    res.status(400).json({
      status: 400,
      message: "Post content must be between 5 and 600 characters.",
    });
    return;
  }

  const post = PostBlog.newPost(
    null,
    new Date(),
    currentUser.id,
    validator.escape(body.post_title),
    validator.escape(body.post_content)
  );

  PostBlog.create(post)
    .then((blogs) => {
      res.status(200).json({
        status: 200,
        message: "Successfully create a blog",
        blogs: blogs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        message: "Failed to create a blog",
        err,
      });
    });
}

// DELETE /api/blogs
export async function deleteBlogById(req, res) {
  //Authenticate the user using auth key
  const auth_key = req.get("X-AUTH-KEY");
  const currentUser = await Users.getByAuthKey(auth_key);

  if (!currentUser) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized: Invalid authentication key",
    });
  }

  const postId = req.params.postId;
  PostBlog.deleteById(postId)
    .then((blog) => {
      res.status(200).json({
        status: 200,
        message: "Deleted blog",
        blog: blog,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        message: "Failed to delete blog",
        err,
      });
    });
}
