import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/authentication";
import * as Users from "../api/users";
import LoadingSpinner from "./LoadingSpinner";

export default function Form({ userID, onSubmit, children }) {
  const navigate = useNavigate();
  const [user, login, logout, refresh] = useAuthentication();
  const [statusMessage, setStatusMessage] = useState("");

  const [userInfo, setUserInfo] = useState({
    id: null,
    firstname: "",
    lastname: "",
    phone: "",
    role: "",
    address: "",
    email: "",
    password: "",
    auth_key: null,
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });

  // Initialize loading to true for register, and false for profile
  const [loading, setLoading] = useState(onSubmit === "profile" ? false : true);

  useEffect(() => {
    if (onSubmit === "profile" && user && userID) {
      if (user.auth_key) {
        Users.getUserByID(userID, user.auth_key)
          .then((result) => {
            const userData = result.user;
            setUserInfo({
              id: userID,
              firstname: userData.firstname,
              lastname: userData.lastname,
              role: userData.role,
              phone: userData.phone,
              address: userData.address,
              email: userData.email,
              password: userData.password,
              auth_key: user.auth_key,
            });
            setLoading(true);
          })
          .catch((error) => {
            setStatusMessage("Failed to fetch user data: " + error);
            setLoading(true);
          });
      } else {
        setStatusMessage("User authentication key is missing.");
        setLoading(true);
      }
    }
  }, [userID, onSubmit, user]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserInfo((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setErrors((prevError) => ({
      ...prevError,
      [name]: validateForm(name, value),
    }));
  }

  function validateForm(name, value) {
    const emailPattern = /^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$/;
    const namePattern = /^[a-zA-Z-]{2,}$/;
    const phonePattern =
    /(^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$)/;
    const addressPattern =
      /^\d{1,5} [A-Za-z]+(?: [A-Za-z]+)* (Street|Road|Ave|Avenue|Boulevard|Blvd|Drive|Dr|Lane|Ln|Court|Ct|Circle|Cir|Square|Sq|Trail|Trl|Parkway|Pkwy), [A-Za-z]+(?: [A-Za-z]+)*$/;

    if (name === "firstname" && !namePattern.test(value)) {
      return "First name must be letters";
    }

    if (name === "lastname" && !namePattern.test(value)) {
      return "Last name must be letters";
    }

    if (name === "phone" && !phonePattern.test(value)) {
      return "Please enter a valid Australian phone number";
    }

    if (name === "address" && !addressPattern.test(value)) {
      return "Invalid address";
    }

    if (name === "email" && !emailPattern.test(value)) {
      return "Email is invalid";
    }

    if (name === "password" && value.length < 6) {
      return "Password must be at least 6 characters long";
    }

    return "";
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    setStatusMessage(
      onSubmit === "register" ? "Registering..." : "Updating profile..."
    );

    const errorMessage = {
      firstname: validateForm("firstname", userInfo.firstname),
      lastname: validateForm("lastname", userInfo.lastname),
      phone: validateForm("phone", userInfo.phone),
      address: validateForm("address", userInfo.address),
      email: validateForm("email", userInfo.email),
      password: validateForm("password", userInfo.password),
    };

    setErrors(errorMessage);

    if (onSubmit === "register") {
      // Register then attempt login
      Users.registerUser(userInfo).then((result) => {
        setStatusMessage(result.message);
        login(userInfo.email, userInfo.password)
          .then((result) => {
            setStatusMessage(result.message);
            navigate("/timetable");
          })
          .catch((error) => {
            setStatusMessage("Login failed: " + error);
          });
      });
    } else if (onSubmit === "profile") {
      Users.update(userInfo, user.auth_key)
        .then((result) => {
          setLoading(true);
          setStatusMessage(result.message);
          // If the user is updating themselves, refresh local data
          // if (userInfo.id === user.id) {
          //   refresh();
          // }
        })
        .catch((error) => {
          setStatusMessage("Update failed: " + error);
        });
    }
  }

  return (
    <>
      {!loading && onSubmit === "profile" ? (
        <LoadingSpinner />
      ) : (
        <form
          onSubmit={handleSubmitForm}
          className="flex flex-col gap-4 bg-white bg-opacity-60 border border-darkgray rounded-2xl p-6 m-10 min-w-[28vw]"
        >
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              placeholder="First name"
              name="firstname"
              className="grow"
              value={userInfo.firstname}
              onChange={handleInputChange}
            />
          </label>
          {errors.firstname && (
            <span className="text-red-600 text-sm">{errors.firstname}</span>
          )}

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              placeholder="Last name"
              name="lastname"
              className="grow"
              value={userInfo.lastname}
              onChange={handleInputChange}
            />
          </label>
          {errors.lastname && (
            <span className="text-red-600 text-sm">{errors.lastname}</span>
          )}

          <label className="input input-bordered flex items-center gap-2">
            <svg
              className="h-4 w-4 opacity-70"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
            </svg>

            <input
              type="tel"
              placeholder="Phone number"
              name="phone"
              className="grow"
              value={userInfo.phone}
              onChange={handleInputChange}
            />
          </label>
          {errors.phone && (
            <span className="text-red-600 text-sm">{errors.phone}</span>
          )}
          {onSubmit === "profile" ? (
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                placeholder="Role"
                name="role"
                className="grow"
                value={userInfo.role}
                disabled
              />
            </label>
          ) : null}

          <label className="input input-bordered flex items-center gap-2">
            <svg
              className="h-4 w-4 opacity-70"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                clip-rule="evenodd"
              />
            </svg>

            <input
              type="text"
              name="address"
              placeholder="Address"
              className="grow"
              value={userInfo.address}
              onChange={handleInputChange}
            />
          </label>
          {errors.address && (
            <span className="text-red-600 text-sm">{errors.address}</span>
          )}

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="grow"
              value={userInfo.email}
              onChange={handleInputChange}
            />
          </label>
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email}</span>
          )}

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="grow"
              value={userInfo.password}
              onChange={handleInputChange}
            />
          </label>
          {errors.password && (
            <span className="text-red-600 text-sm">{errors.password}</span>
          )}
          {children}
          <span className="label-text-alt">{statusMessage}</span>
        </form>
      )}
    </>
  );
}
