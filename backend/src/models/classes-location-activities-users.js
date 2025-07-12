import { convertToMySQLDate, convertToMySQLDatetime, db_conn } from "../database.js";

export function newClassWithLocationAndActivityByUser(
  class_id,
  class_datetime,
  class_location_id,
  class_activity_id,
  class_trainer_user_id,
  location_id,
  location_name,
  activity_id,
  activity_name,
  activity_description,
  activity_duration,
  user_id,
  user_email,
  user_password,
  user_role,
  user_firstname,
  user_lastname,
  user_address,
  class_date,
  class_time 
) {
  return {
    class_id,
    class_datetime,
    class_location_id,
    class_activity_id,
    class_trainer_user_id,
    location_id,
    location_name,
    activity_id,
    activity_name,
    activity_description,
    activity_duration,
    user_id,
    user_email,
    user_password,
    user_role,
    user_firstname,
    user_lastname,
    user_address,
    class_date,
    class_time 
  };
}

// export function getById(edit_id) {
//   return db_conn
//     .query(
//       `
//     SELECT * FROM classes
//     INNER JOIN location ON classes.class_location_id = location.location_id
//     INNER JOIN activities ON classes.class_activity_id = activities.activity_id
//     INNER JOIN users ON classes.class_trainer_user_id = user_id
//     WHERE class_id = ?
//     `,
//       [edit_id]
//     )
//     .then(([queryResult]) => {
//       // check that at least 1 match was found
//       if (queryResult.length > 0) {
//         // get the first matching result
//         const row = queryResult[0];

//         // convert result into a model object
//         return newClassWithLocationAndActivityByUser(
//           row.class_id,
//           row.class_datetime,
//           row.class_location_id,
//           row.class_activity_id,
//           row.class_trainer_user_id,
//           row.location_id,
//           row.location_name,
//           row.activity_id,
//           row.activity_name,
//           row.activity_description,
//           row.activity_duration,
//           row.user_id,
//           row.user_email,
//           row.user_password,
//           row.user_role,
//           row.user_firstname,
//           row.user_lastname,
//           row.user_address
//         );
//       } else {
//         return Promise.reject("no matching results");
//       }
//     });
// }

export function getByDateRange(startDate, endDate) {
  return db_conn
    .query(
      `
    SELECT * FROM classes
    INNER JOIN location ON classes.class_location_id = location.location_id
    INNER JOIN activities ON classes.class_activity_id = activities.activity_id
    INNER JOIN users ON classes.class_trainer_user_id = user_id
    WHERE class_datetime BETWEEN ? AND ? AND class_datetime >= NOW() AND class_removed = 0
    ORDER BY class_datetime ASC
        `,
      [convertToMySQLDate(startDate), convertToMySQLDate(endDate)]
    )
    .then(([queryResult]) => {
      return queryResult.map((row) =>
        newClassWithLocationAndActivityByUser(
          row.class_id,
          row.class_datetime,
          row.class_location_id,
          row.class_activity_id,
          row.class_trainer_user_id,
          row.location_id,
          row.location_name,
          row.activity_id,
          row.activity_name,
          row.activity_description,
          row.activity_duration,
          row.user_id,
          row.user_email,
          row.user_password,
          row.user_role,
          row.user_firstname,
          row.user_lastname,
          row.user_address
        )
      );
    });
}

export function getClassByName(activity_name) {
  return db_conn
    .query(
      `
    SELECT *, class_datetime 
    FROM classes
    INNER JOIN location ON classes.class_location_id = location.location_id
    INNER JOIN activities ON classes.class_activity_id = activities.activity_id
    INNER JOIN users ON classes.class_trainer_user_id = users.user_id
    WHERE activity_name = ? AND class_datetime >= NOW() AND class_removed = 0
    ORDER BY class_datetime ASC
    `,
      [activity_name]
    )
    .then(([queryResult]) => {
      return queryResult.map((row) => {
        const classDateTime = new Date(row.class_datetime);

        // Use the custom formatting function to convert to "YYYY-MM-DD 5:30PM" format
        const formattedDateTime = convertToMySQLDatetime(classDateTime);

        return newClassWithLocationAndActivityByUser(
          row.class_id,
          formattedDateTime,
          row.class_location_id,
          row.class_activity_id,
          row.class_trainer_user_id,
          row.location_id,
          row.location_name,
          row.activity_id,
          row.activity_name,
          row.activity_description,
          row.activity_duration,
          row.user_id,
          row.user_email,
          row.user_password,
          row.user_role,
          row.user_firstname,
          row.user_lastname,
          row.user_address,
          formattedDateTime.split(' ')[0],
          formattedDateTime.split(' ')[1] 
        );
      });
    });
}

export function getTrainerClassByDateRange(currentUser, startDate, endDate) {
  return db_conn
    .query(
      `
    SELECT * FROM classes
    INNER JOIN location ON classes.class_location_id = location.location_id
    INNER JOIN activities ON classes.class_activity_id = activities.activity_id
    INNER JOIN users ON classes.class_trainer_user_id = user_id
    WHERE class_trainer_user_id = ? AND class_datetime BETWEEN ? AND ? AND class_datetime >= NOW() AND class_removed = 0
    ORDER BY class_datetime ASC
        `,
      [currentUser, convertToMySQLDate(startDate), convertToMySQLDate(endDate)]
    )
  .then(([queryResult]) => {
    return queryResult.map((row) => {
      const classDateTime = new Date(row.class_datetime);

      // Use the custom formatting function to convert to "YYYY-MM-DD 5:30PM" format
      const formattedDateTime = convertToMySQLDatetime(classDateTime);
      return newClassWithLocationAndActivityByUser(
        row.class_id,
        classDateTime,
        row.class_location_id,
        row.class_activity_id,
        row.class_trainer_user_id,
        row.location_id,
        row.location_name,
        row.activity_id,
        row.activity_name,
        row.activity_description,
        row.activity_duration,
        row.user_id,
        row.user_email,
        row.user_password,
        row.user_role,
        row.user_firstname,
        row.user_lastname,
        row.user_address,
        formattedDateTime.split(' ')[0],
        formattedDateTime.split(' ')[1] 
      );
    });
  });
}

export function getClassByTrainerId(currentUser) {
  return db_conn
    .query(
      `
    SELECT * FROM classes
    INNER JOIN location ON classes.class_location_id = location.location_id
    INNER JOIN activities ON classes.class_activity_id = activities.activity_id
    INNER JOIN users ON classes.class_trainer_user_id = users.user_id
    WHERE class_trainer_user_id = ? AND class_datetime >= NOW() AND class_removed = 0
    ORDER BY class_datetime ASC
    `,
      [currentUser]
    )
    .then(([queryResult]) => {
      return queryResult.map((row) => {
        const classDateTime = new Date(row.class_datetime);

        // Use the custom formatting function to convert to "YYYY-MM-DD 5:30PM" format
        const formattedDateTime = convertToMySQLDatetime(classDateTime);

        return newClassWithLocationAndActivityByUser(
          row.class_id,
          formattedDateTime,
          row.class_location_id,
          row.class_activity_id,
          row.class_trainer_user_id,
          row.location_id,
          row.location_name,
          row.activity_id,
          row.activity_name,
          row.activity_description,
          row.activity_duration,
          row.user_id,
          row.user_email,
          row.user_password,
          row.user_role,
          row.user_firstname,
          row.user_lastname,
          row.user_address,
          formattedDateTime.split(' ')[0],
          formattedDateTime.split(' ')[1] 
        );
      });
    });
}