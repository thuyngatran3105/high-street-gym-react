import express from "express"
import { createBooking, deleteBookingById, getBookingsByUserId, getUserBookingsByClassId } from "../controllers/APIBookings.js"
import api_auth from "../middleware/api_auth.js"

const bookingAPIRouter = express.Router()

bookingAPIRouter.get("/", api_auth(["Member"]), getBookingsByUserId)

bookingAPIRouter.post("/", api_auth(["Member"]), createBooking)

bookingAPIRouter.get("/:class_id", api_auth(["Trainer"]), getUserBookingsByClassId)

bookingAPIRouter.delete("/:booking_id", api_auth(["Member"]), deleteBookingById)

export default bookingAPIRouter