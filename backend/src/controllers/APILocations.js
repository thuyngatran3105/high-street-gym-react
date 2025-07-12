import * as Locations from "../models/location.js";
import xml2js from "xml2js";
import validator from "validator";

//GET /api/locations
export function getAllLocations(req, res) {
  Locations.getAll()
    .then((locations) => {
      res.status(200).json({
        status: 200,
        message: "Loaded all locations",
        locations: locations,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        message: "Failed to load all locations",
        err,
      });
    });
}

//POST /api/createLocations
export async function createLocations(req, res) {
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
          const locationUpload = data["locations-upload"];
          const locationUploadAttributes = locationUpload["$"];
          const operation = locationUploadAttributes["operation"];
  
          const locationsData = locationUpload["locations"][0]["location"];

          // Validate all locations
          let validationError = "";
          const locations = locationsData.map((locationData) => {
            const name = locationData.name[0];
  
            // Validate location name
            if (
              !validator.isLength(name, { min: 2, max: 45 }) ||
              /\d/.test(name) ||
              /[^\w\s]/.test(name)
            ) {
              validationError = "Location name must be between 2 and 45 characters and must not contain numbers or special characters."
            }
  
            // Return a location model object if no validation errors
            return {
              name: validator.escape(name.toString())
            };
          });
  
          if (validationError) {
            return res.status(400).json({
              status: 400,
              message: validationError
            });
          }
  
          // Proceed with database operations if no validation errors
          if (operation === "insert") {
            // Map each location to a promise and use Promise.all to handle them
            const createPromises = locations.map((locationModel) =>
              Locations.create(locationModel)
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
              message: "XML Contains invalid operation attribute value",
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
  