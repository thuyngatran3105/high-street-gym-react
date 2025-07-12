import express from "express";
import { deleteClassById, getClassScheduleByName, getClassesByDateRange, getClassesByTrainerId, getClassesOfTrainerByDateRange } from "../controllers/APIClasses.js";
import api_auth from "../middleware/api_auth.js";

const classAPIRouter = express.Router()

classAPIRouter.get("/trainer", api_auth(["Trainer"]), getClassesOfTrainerByDateRange)

classAPIRouter.get("/trainer-classes", api_auth(["Trainer"]), getClassesByTrainerId)

classAPIRouter.get("/", api_auth(["Member"]), getClassesByDateRange)

classAPIRouter.get("/:activity_name", api_auth(["Member"]), getClassScheduleByName)

classAPIRouter.delete("/:class_id", api_auth(["Trainer"]), deleteClassById)

export default classAPIRouter