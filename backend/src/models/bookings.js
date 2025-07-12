import { db_conn } from "../database.js";

export function newBooking(id, booking_user_id, booking_class_id, booking_created_datetime) {
    return {
        id,
        booking_user_id, 
        booking_class_id,
        booking_created_datetime
    }
}

//Create
export function create(booking) {
    return db_conn.query(`
    INSERT INTO bookings (booking_user_id, booking_class_id, booking_created_datetime)
    VALUES (?, ?, ?)
    `, [booking.booking_user_id, booking.booking_class_id, booking.booking_created_datetime])
}

//Read
// export function getAll() {
//     return db_conn.query(`SELECT * FROM bookings`)
//     .then(([queryResult]) => {
//         return queryResult.map(row => newBooking(
//             row.booking_id,
//             row.booking_user_id,
//             row.booking_class_id,
//             row.booking_created_datetime
//         ))
//     })
// }

// export function getById(id) {
//     return db_conn.query(`SELECT * FROM bookings WHERE booking_id = ?`, [id])
//         .then(([queryResult]) => {
//             if (queryResult.length > 0) {
//                 const row = queryResult[0]
//                 return newBooking (
//                     row.booking_id,
//                     row.booking_user_id,
//                     row.booking_class_id,
//                     row.booking_created_datetime
//                 )
//             } else {
//                 return Promise.reject("no matching results")
//             }
//         })
// }

//Filter bookings by member
// export function getByUserId(userId) {
//     return db_conn.query(`SELECT * FROM bookings WHERE booking_user_id = ?`, [userId])
//         .then(([queryResult]) => {
//             if (queryResult.length > 0) {
//                 const row = queryResult[0]
//                 return newBooking (
//                     row.booking_id,
//                     row.booking_user_id,
//                     row.booking_class_id,
//                     row.booking_created_datetime
//                 )
//             } else {
//                 return Promise.reject("no matching results")
//             }
//         })
// }

// export function getByBookingId(bookingId) {
//     return db_conn.query(`SELECT * FROM bookings WHERE booking_user_id = ?`, [bookingId])
//         .then(([queryResult]) => {
//             if (queryResult.length > 0) {
//                 const row = queryResult[0]
//                 return newBooking (
//                     row.booking_id,
//                     row.booking_user_id,
//                     row.booking_class_id,
//                     row.booking_created_datetime
//                 )
//             } else {
//                 return Promise.reject("no matching results")
//             }
//         })
// }


//Prevent duplicate booking
export function getByUserIdAndClassId(userId, classId) {
    return db_conn.query(
        `SELECT * FROM bookings WHERE booking_user_id = ? AND booking_class_id = ?`,
        [userId, classId]
    ).then(([queryResult]) => {    
        if (queryResult.length > 0) {
            return queryResult[0];
        } else {
            return null; 
        }
    });
}

//maybe do not need
//Update
// export function update(booking) {
//     return db_conn.query(`
//     UPDATE bookings
//     SET booking_class_id = ?
//     WHERE booking_id = ?
//     `, [booking.booking_class_id, booking.booking_id])
// }

//Delete
export function deleteById(booking_id) {
    return db_conn.query(`DELETE FROM bookings WHERE booking_id = ?`, [booking_id])
}