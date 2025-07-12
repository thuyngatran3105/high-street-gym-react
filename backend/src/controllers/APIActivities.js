import * as Activities from "../models/activities.js";
import xml2js from "xml2js";
import validator from "validator";

//GET /api/activities
export function getAllActivities(req, res) {
  Activities.getAll()
    .then((activities) => {
      res.status(200).json({
        status: 200,
        message: "Loaded all activities",
        activities: activities,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        message: "Failed to load all activities",
        err,
      });
    });
}

// POST /api/createActivities
export async function createActivities(req, res) {
    if (req.files && req.files["xml-file"]) {
    // Access the XML file as a string
      const XMLFile = req.files["xml-file"];
  
      // Validate file type
      if (
        XMLFile.mimetype !== "text/xml" &&
        XMLFile.mimetype !== "application/xml"
      ) {
        return res.status(400).json({
          status: 400,
          message: "Invalid file type. Please only upload XML file",
        });
      }
  
      const file_text = XMLFile.data.toString();
  
      // Set up XML parser
      const parser = new xml2js.Parser();
      parser
        .parseStringPromise(file_text)
        .then((data) => {
          const activityUpload = data["activities-upload"];
          const activityUploadAttributes = activityUpload["$"];
          const operation = activityUploadAttributes["operation"];
          const activitiesData = activityUpload["activities"][0]["activity"];
  
          // Validate all activities
          const validationErrors = [];
          const activities = activitiesData.map((activityData) => {
            const name = activityData.name[0];
            const description = activityData.description[0];
            const duration = activityData.duration[0];
  
            if (
              !validator.isLength(name, { min: 2, max: 45 }) ||
              /\d/.test(name) ||
              /[^\w\s]/.test(name)
            ) {
              validationErrors.push("Activity name must be between 2 and 45 characters and must not contain numbers or special characters.");
            }
  
            if (
              !validator.isLength(description, { min: 5, max: 600 })
            ) {
              validationErrors.push("Activity description must be between 5 and 600 characters.");
            }
  
            if (
              !validator.isLength(duration, { min: 5, max: 50 }) ||
              !/^(\d+ (minutes?|hours?))$/.test(duration)
            ) {
              validationErrors.push("Activity duration must be between 5 and 50 characters and follow the pattern like 'X minute(s)' or 'X hour(s)', where X is a number.");
            }
  
            // Convert the xml object into a model object if no validation errors
            return {
              name: validator.escape(name.toString()),
              description: validator.escape(description.toString()),
              duration: validator.escape(duration.toString())
            };
          });
  
          if (validationErrors.length > 0) {
            return res.status(400).json({
              status: 400,
              message: validationErrors.join(' ')
            });
          }
  
          // Proceed with database operations if no validation errors
          if (operation === "insert") {
            // Map each activity to a promise and use Promise.all to handle them
            const createPromises = activities.map((activityModel) =>
              Activities.create(activityModel)
            );
  
            Promise.all(createPromises)
              .then(() => {
                res.status(200).json({
                  status: 200,
                  message: "XML Upload insert successful",
                });
              })
              .catch((error) => {
                res.status(500).json({
                  status: 500,
                  message: "XML upload failed on database operation",
                });
              });
          } else {
            res.status(400).json({
              status: 400,
              message: "XML contains invalid operation attribute value",
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            status: 500,
            message: "You uploaded invalid file",
          });
        });
    } else {
      res.status(400).json({
        status: 400,
        message: "No file selected",
      });
    }
  }
  
