import express from "express"
import fileUpload from "express-fileupload"
import cors from "cors"
import userAPIRouter from "./routes/APIUsers.js"
import authAPIRouter from "./routes/APIAuth.js"
import classAPIRouter from "./routes/APIClasses.js"
import blogAPIRouter from "./routes/APIBlogs.js"
import bookingAPIRouter from "./routes/APIBookings.js"
import activityAPIRouter from "./routes/APIActivities.js"
import locationAPIRouter from "./routes/APILocations.js"

const app = express()
const port = 8080

// Setup cors
app.use(cors({
    origin: true
}))

// Enable the ejs view engine
app.set("view engine", "ejs")

// Enable support for URL-encoded request bodies (POST-ed form data)
app.use(express.urlencoded({
    extended: true,
}))

// Enable support for JSON body parsing
app.use(express.json())

// Enable file upload support
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}))

// Use each API controller with /api path segment
app.use("/api/users", userAPIRouter)
app.use("/api/auth", authAPIRouter)
app.use("/api/classes", classAPIRouter)
app.use("/api/blogs", blogAPIRouter)
app.use("/api/bookings", bookingAPIRouter)
app.use("/api/activities", activityAPIRouter)
app.use("/api/locations", locationAPIRouter)

//TODO: Catch all for 500 and 404 errors

app.listen(port, () => {
    console.log("Express backend started on http://localhost:" + port)
})