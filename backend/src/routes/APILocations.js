import express, { Router } from "express";
import { createLocations, getAllLocations } from "../controllers/APILocations.js";
import api_auth from "../middleware/api_auth.js";

const locationAPIRouter = express.Router()

locationAPIRouter.get("/", api_auth(["Trainer"]), getAllLocations)

locationAPIRouter.post("/upload-xml", api_auth(["Trainer"]), createLocations)

export default locationAPIRouter