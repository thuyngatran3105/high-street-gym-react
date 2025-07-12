import express from "express";
import { createNewUser, getUserByAuthKey, getUserById, updateUser } from "../controllers/APIUsers.js";
import api_auth from "../middleware/api_auth.js";

const userAPIRouter = express.Router()

userAPIRouter.get("/key/:authKey", api_auth(["Member", "Trainer"]), getUserByAuthKey)

userAPIRouter.get("/:id", api_auth(["Member", "Trainer"]), getUserById)

userAPIRouter.post("/register", createNewUser)

userAPIRouter.patch("/:id", api_auth(["Member", "Trainer"]), updateUser)

export default userAPIRouter