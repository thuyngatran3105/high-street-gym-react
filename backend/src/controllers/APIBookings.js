import * as BookingClass from "../models/bookings-classes-users.js";
import * as Bookings from "../models/bookings.js";
import * as Users from "../models/users.js";
import validator from "validator";

//GET /api/bookings
export async function getBookingsByUserId(req, res) {
  //Authenticate the user using auth key
  const auth_key = req.get("X-AUTH-KEY");
  const currentUser = await Users.getByAuthKey(auth_key);

  //Retrieve bookings using user_id
  BookingClass.getByUserId(currentUser.id)
    .then((bookings) => {
      res.status(200).json({
        status: 200,
        message: "Loaded all bookings of user",
        bookings: bookings,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        message: "Failed to load all bookings of user",
        err,
      });
    });
}

//POST /api/bookings
export async function createBooking(req, res) {
  //Authenticate the user using auth key
  const auth_key = req.get("X-AUTH-KEY");
  const currentUser = await Users.getByAuthKey(auth_key);

  const body = req.body;
  
  if (!validator.isInt(currentUser.id.toString())) {
    return res.status(400).json({
      status: 400,
      message: "Current user must be an integer.",
    });
  }

  if (!validator.isInt(body.booking_class_id.toString())) {
    return res.status(400).json({
      status: 400,
      message: "Class ID must be an integer.",
    });
  }

  // Check for duplicate booking
  const existingBooking = await Bookings.getByUserIdAndClassId(
    currentUser.id,
    body.booking_class_id
  );
  if (existingBooking) {
    return res.status(400).json({
      status: 400,
      message: "You have already booked this class.",
    });
  } else {
    const booking = Bookings.newBooking(
      null,
      validator.escape(currentUser.id.toString()),
      validator.escape(body.booking_class_id.toString()),
      new Date()
    );

    Bookings.create(booking)
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: "Successfully created a booking",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: 500,
          message: "Failed to create a booking",
          err,
        });
      });
  }
}

//GET /api/bookings/:class_id
export function getUserBookingsByClassId(req, res) {
  const class_id = req.params.class_id;
  BookingClass.getBookingByClassId(class_id)
    .then((bookings) => {
      res.status(200).json({
        status: 200,
        message: "Loaded all bookings",
        bookings: bookings,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        message: "Failed to loaded all bookings",
        err,
      });
    });
}

//DELETE /api/bookings/:id
export function deleteBookingById(req, res) {
  const bookingId = req.params.booking_id;
  Bookings.deleteById(bookingId)
    .then((booking) => {
      res.status(200).json({
        status: 200,
        message: "Successfully delete the booking",
        booking: booking,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        message: "Failed to delete the booking",
        err,
      });
    });
}
