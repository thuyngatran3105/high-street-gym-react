import express, { Router } from "express";
import { createActivities, getAllActivities } from "../controllers/APIActivities.js";
import api_auth from "../middleware/api_auth.js";

const activityAPIRouter = express.Router()

activityAPIRouter.get("/", api_auth(["Trainer"]), getAllActivities)

activityAPIRouter.post("/upload-xml", api_auth(["Trainer"]), createActivities)

export default activityAPIRouter