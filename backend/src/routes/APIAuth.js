import express from "express"
import { loginUser, logoutUser } from "../controllers/APIAuth.js"
import api_auth from "../middleware/api_auth.js"

const authAPIRouter = express.Router()

authAPIRouter.post("/login", loginUser)

authAPIRouter.post("/logout", api_auth(["Member", "Trainer"]), logoutUser)

export default authAPIRouter