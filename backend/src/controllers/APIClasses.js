import * as ClassWithLocationAndActivityByUser from "../models/classes-location-activities-users.js";
import * as Users from "../models/users.js";
import * as Classes from "../models/classes.js"

// GET /api/classes
export function getClassesByDateRange(req, res) {
  const today = new Date();

  // Calculate the date of Monday for the current week
  const mondayOfThisWeek = new Date(today);
  mondayOfThisWeek.setDate(today.getDate() - (today.getDay() - 1));

  // Calculate the date of Sunday for the current week
  const sundayOfThisWeek = new Date(mondayOfThisWeek);
  sundayOfThisWeek.setDate(sundayOfThisWeek.getDate() + 6);

  // Array to map days of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Object to store classes by day
  const classesByDay = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  // Fetch classes within the date range of the current week
  ClassWithLocationAndActivityByUser.getByDateRange(
    mondayOfThisWeek,
    sundayOfThisWeek
  )
    .then((classesThisWeek) => {
      classesThisWeek.forEach((classItem) => {
        const classDayName = daysOfWeek[classItem.class_datetime.getDay()];

        // Avoid duplicate activity names within the same day
        if (
          !classesByDay[classDayName].some(
            (classesOnDay) =>
              classesOnDay.activity_name === classItem.activity_name
          )
        ) {
          classesByDay[classDayName].push(classItem);
        }
      });

      // Send the organized classesByDay in the response
      res.status(200).json({
        status: 200,
        message: "Loaded classes for the current week",
        classesByDay,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        message: "Database error loading classes for the current week",
        err,
      });
    });
}

// GET /api/classes?activity_name = _
export function getClassScheduleByName(req, res) {
  const activity_name = req.params.activity_name;
  ClassWithLocationAndActivityByUser.getClassByName(activity_name)
    .then((classes) => {
      res.status(200).json({
        status: 200,
        message: `Loaded all classes of ${activity_name}`,
        classes: classes,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        message: `Failed to load all classes of ${activity_name}`,
        err,
      });
    });
}

// GET /api/classes/trainer (trainer classes)
export async function getClassesOfTrainerByDateRange(req, res) {
  // Authenticate the user using auth key
  const auth_key = req.get("X-AUTH-KEY");
  const currentUser = await Users.getByAuthKey(auth_key);

  const today = new Date();

  // Calculate the date of Monday for the current week
  const mondayOfThisWeek = new Date(today);
  mondayOfThisWeek.setDate(today.getDate() - (today.getDay() - 1));

  // Calculate the date of Sunday for the current week
  const sundayOfThisWeek = new Date(mondayOfThisWeek);
  sundayOfThisWeek.setDate(sundayOfThisWeek.getDate() + 6);

  // Array to map days of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Object to store classes by day
  const classesByDay = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  // Retrieve classes using user_id
  ClassWithLocationAndActivityByUser.getTrainerClassByDateRange(
    currentUser.id,
    mondayOfThisWeek,
    sundayOfThisWeek
  )
    .then((classesThisWeek) => {
      classesThisWeek.forEach((classItem) => {
        const classDayName = daysOfWeek[classItem.class_datetime.getDay()]; 

        // Push the class into the appropriate day of the week
        classesByDay[classDayName].push(classItem);
      });

      res.status(200).json({
        status: 200,
        message: "Loaded all classes of trainer for the current week",
        classesByDay,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        message: "Failed to load all classes of trainer for the current week",
        err,
      });
    });
}

//GET /api/classes
export async function getClassesByTrainerId(req, res) {
  //Authenticate the user using auth key
  const auth_key = req.get("X-AUTH-KEY")
  const currentUser = await Users.getByAuthKey(auth_key) 

  //Retrieve bookings using user_id
  ClassWithLocationAndActivityByUser.getClassByTrainerId(currentUser.id).then(classes => {
      res.status(200).json({
          status: 200,
          message: "Loaded all classes of trainer",
          classes: classes
      })
  }).catch(err => {
      res.status(500).json({
          status: 500,
          message: "Failed to load all classes of trainer",
          err
      })
  })
}

//DELETE /api/classes/:id
export function deleteClassById(req, res) {
  const classId = req.params.class_id
  Classes.deleteById(classId).then(classes => {
      res.status(200).json({
          status: 200,
          message: "Successfully delete the class",
          classes: classes
      })
  }).catch(err => {
      res.status(500).json({
          status: 500,
          message: "Failed to delete the class",
          err
      })
  })
}