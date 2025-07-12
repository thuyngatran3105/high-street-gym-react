import { convertToMySQLDatetime, db_conn } from "../database.js";

export function newBookingClass(
  booking_id,
  booking_user_id,
  booking_class_id,
  booking_created_datetime,
  class_id,
  class_datetime,
  activity_id,
  activity_name,
  user_id,
  user_firstname,
  user_lastname,
  user_phone,
  user_email,
  user_auth_key,
  trainer_firstname,
  trainer_lastname,
  location_id,
  location_name,
  class_date,
  class_time 
) {
  return {
    booking_id,
    booking_user_id,
    booking_class_id,
    booking_created_datetime,
    class_id,
    class_datetime,
    activity_id,
    activity_name,
    user_id,
    user_firstname,
    user_lastname,
    user_phone,
    user_email,
    user_auth_key,
    trainer_firstname,
    trainer_lastname,
    location_id,
    location_name,
    class_date,
    class_time 
  };
}

// export function getAll() {
//   return db_conn
//     .query(
//       `
//     SELECT * FROM bookings 
//     INNER JOIN classes ON bookings.booking_class_id = classes.class_id
//     INNER JOIN users ON bookings.booking_user_id = users.user_id
//     INNER JOIN activities ON classes.class_activity_id = activities.activity_id
//     INNER JOIN location ON classes.class_location_id = location.location_id
//     `
//     )
//     .then(([queryResult]) => {
//       return queryResult.map((row) =>
//         newBookingClass(
//           row.booking_id,
//           row.booking_user_id,
//           row.booking_class_id,
//           row.booking_created_datetime,
//           row.class_id,
//           row.class_datetime,
//           row.activity_id,
//           row.activity_name,
//           row.user_id,
//           row.user_firstname,
//           row.user_lastname,
//           row.user_phone,
//           row.trainer_firstname,
//           row.trainer_lastname,
//           row.location_id,
//           row.location_name
//         )
//       );
//     });
// }

export function getByUserId(currentUser) {
  return db_conn
    .query(
      `
    SELECT 
    bookings.booking_id,
    bookings.booking_user_id,
    bookings.booking_created_datetime,
    bookings.booking_class_id,
    classes.class_id,
    classes.class_datetime,
    classes.class_location_id,
    classes.class_activity_id,
    classes.class_trainer_user_id,
    activities.activity_id,
    activities.activity_name,
    trainer.user_id,
    trainer.user_firstname AS trainer_firstname,
    trainer.user_lastname AS trainer_lastname,
    location.location_id,
    location.location_name
    FROM bookings 
    INNER JOIN classes ON bookings.booking_class_id = classes.class_id
    INNER JOIN users AS trainer ON classes.class_trainer_user_id = trainer.user_id
    INNER JOIN activities ON classes.class_activity_id = activities.activity_id
    INNER JOIN location ON classes.class_location_id = location.location_id
    WHERE bookings.booking_user_id = ? AND class_removed = 0 AND class_datetime >= NOW()
    ORDER BY class_datetime ASC
    `,
      [currentUser]
    )
    .then(([queryResult]) => {
      return queryResult.map((row) => {
        const classDateTime = new Date(row.class_datetime);

        const formattedDateTime = convertToMySQLDatetime(classDateTime);

        return newBookingClass(
          row.booking_id,
          row.booking_user_id,
          row.booking_class_id,
          row.booking_created_datetime,
          row.class_id,
          formattedDateTime, 
          row.activity_id,
          row.activity_name,
          row.user_id,
          row.user_firstname,
          row.user_lastname,
          row.user_phone,
          row.user_email,
          row.user_auth_key,
          row.trainer_firstname,
          row.trainer_lastname,
          row.location_id,
          row.location_name,
          formattedDateTime.split(' ')[0], 
          formattedDateTime.split(' ')[1]  
        );
      });
    });
}


// export function getBookingByActivityName(activity_name) {
//   return db_conn
//     .query(
//       `
//     SELECT 
//     bookings.booking_id,
//     bookings.booking_user_id,
//     bookings.booking_created_datetime,
//     bookings.booking_class_id,
//     classes.class_id,
//     classes.class_datetime,
//     classes.class_location_id,
//     classes.class_activity_id,
//     classes.class_trainer_user_id,
//     activities.activity_id,
//     activities.activity_name,
//     users.user_firstname AS user_firstname,
//     users.user_lastname AS user_lastname,
//     users.user_phone,
//     trainer.user_id,
//     trainer.user_firstname AS trainer_firstname,
//     trainer.user_lastname AS trainer_lastname,
//     location.location_id,
//     location.location_name
//     FROM bookings 
//     INNER JOIN classes ON bookings.booking_class_id = classes.class_id
//     INNER JOIN users ON bookings.booking_user_id = users.user_id
//     INNER JOIN users AS trainer ON classes.class_trainer_user_id = trainer.user_id
//     INNER JOIN activities ON classes.class_activity_id = activities.activity_id
//     INNER JOIN location ON classes.class_location_id = location.location_id
//     WHERE activity_name = ? AND users.user_removed = 0 AND class_removed = 0 AND class_datetime >= NOW()
//     `,
//       [activity_name]
//     )
//     .then(([queryResult]) => {
//       return queryResult.map((row) =>
//         newBookingClass(
//           row.booking_id,
//           row.booking_user_id,
//           row.booking_class_id,
//           row.booking_created_datetime,
//           row.class_id,
//           row.class_datetime,
//           row.activity_id,
//           row.activity_name,
//           row.user_id,
//           row.user_firstname,
//           row.user_lastname,
//           row.user_phone,
//           row.trainer_firstname,
//           row.trainer_lastname,
//           row.location_id,
//           row.location_name
//         )
//       );
//     });
// }

// export function getBookingById(booking_id) {
//   return db_conn
//     .query(
//       `
//     SELECT * FROM bookings 
//     INNER JOIN classes ON bookings.booking_class_id = classes.class_id
//     INNER JOIN users ON bookings.booking_user_id = users.user_id
//     INNER JOIN activities ON classes.class_activity_id = activities.activity_id
//     INNER JOIN location ON classes.class_location_id = location.location_id
//     WHERE booking_id = ? AND user_removed = 0
//     `,
//       [booking_id]
//     )
//     .then(([queryResult]) => {
//       if (queryResult.length > 0) {
//         const result = queryResult[0];

//         return newBookingClass(
//           result.booking_id,
//           result.booking_user_id,
//           result.booking_class_id,
//           result.booking_created_datetime,
//           result.class_id,
//           result.class_datetime,
//           result.activity_id,
//           result.activity_name,
//           result.user_id,
//           result.user_firstname,
//           result.user_lastname,
//           result.user_phone,
//           result.trainer_firstname,
//           result.trainer_lastname,
//           result.location_id,
//           result.location_name
//         );
//       } else {
//         return Promise.reject("no matching results");
//       }
//     });
// }

export function getBookingByClassId(class_id) {
  return db_conn
    .query(
      `
      SELECT 
      bookings.booking_id,
      bookings.booking_user_id,
      bookings.booking_created_datetime,
      bookings.booking_class_id,
      classes.class_id,
      classes.class_datetime,
      classes.class_location_id,
      classes.class_activity_id,
      classes.class_trainer_user_id,
      activities.activity_id,
      activities.activity_name,
      users.user_firstname AS user_firstname,
      users.user_lastname AS user_lastname,
      users.user_phone,
      users.user_email,
      users.user_auth_key,
      trainer.user_id,
      trainer.user_firstname AS trainer_firstname,
      trainer.user_lastname AS trainer_lastname,
      location.location_id,
      location.location_name
      FROM bookings 
      INNER JOIN classes ON bookings.booking_class_id = classes.class_id
      INNER JOIN users ON bookings.booking_user_id = users.user_id
      INNER JOIN users AS trainer ON classes.class_trainer_user_id = trainer.user_id
      INNER JOIN activities ON classes.class_activity_id = activities.activity_id
      INNER JOIN location ON classes.class_location_id = location.location_id
      WHERE class_id = ? AND users.user_removed = 0
    `,
      [class_id]
    )
    .then(([queryResult]) => {
      return queryResult.map((row) => {
        const classDateTime = new Date(row.class_datetime);

        const formattedDateTime = convertToMySQLDatetime(classDateTime);

        return newBookingClass(
          row.booking_id,
          row.booking_user_id,
          row.booking_class_id,
          row.booking_created_datetime,
          row.class_id,
          formattedDateTime, 
          row.activity_id,
          row.activity_name,
          row.user_id,
          row.user_firstname,
          row.user_lastname,
          row.user_phone,
          row.user_email,
          row.user_auth_key,
          row.trainer_firstname,
          row.trainer_lastname,
          row.location_id,
          row.location_name,
          formattedDateTime.split(' ')[0], 
          formattedDateTime.split(' ')[1]  
        );
      });
    });
}