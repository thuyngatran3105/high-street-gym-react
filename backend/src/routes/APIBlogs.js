import express, { Router } from "express";
import { createBlog, deleteBlogById, getAllBlogs } from "../controllers/APIBlogs.js";
import api_auth from "../middleware/api_auth.js";

const blogAPIRouter = express.Router()

blogAPIRouter.get("/", api_auth(["Member", "Trainer"]), getAllBlogs)

blogAPIRouter.post("/", api_auth(["Member", "Trainer"]), createBlog)

blogAPIRouter.delete("/:postId", api_auth(["Member", "Trainer"]), deleteBlogById)

export default blogAPIRouter