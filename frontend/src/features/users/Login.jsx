import React, { useCallback, useState } from "react";
import "frontend/src/App.css";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../hooks/authentication";

export default function Login() {
  const navigate = useNavigate();
  const [user, login, logout, refresh] = useAuthentication();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [statusMessage, setStatusMessage] = useState("");

  function validateEmail(email) {
    const emailPattern = /^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$/;
    if (!emailPattern.test(email)) {
      return "Email is invalid";
    }
    return "";
  }

  function validatePassword(password) {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return "";
  }

  function handleEmailChange(event) {
    const value = event.target.value;
    setEmail(value);
    setErrors((prevError) => ({
      ...prevError,
      email: validateEmail(value),
    }));
  }

  function handlePasswordChange(event) {
    const value = event.target.value;
    setPassword(value);
    setErrors((prevError) => ({
      ...prevError,
      password: validatePassword(value),
    }));
  }

  const onLogin = useCallback(
    (e) => {
      e.preventDefault();
      // setStatusMessage("Logging in...");

      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);
      setErrors({
        email: emailError,
        password: passwordError,
      });

      if (!emailError && !passwordError) {
        setStatusMessage("Logging in...");
        login(email, password)
          .then((result) => {
            if (result.user && result.user.role === "Member") {
              navigate("/timetable");
            } else {
              navigate("/classes");
          }})
          .catch((error) => {
            setStatusMessage("Invalid credentials");
          });
      }
    },
    [user, email, password, login, setStatusMessage, setErrors]
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('./src/assets/login_background.webp')] bg-cover bg-center">
      <form
        className="flex flex-col gap-4 bg-white bg-opacity-60 border border-darkgray rounded-2xl p-6 m-10 min-w-[28vw]"
        onSubmit={onLogin}
      >
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
            value={email}
            className="grow"
            onChange={handleEmailChange}
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
            className="grow"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        {errors.password && (
          <span className="text-red-600 text-sm">{errors.password}</span>
        )}

        <input 
        type="button" 
        className="btn btn-wide place-self-center mt-[12px] bg-[#E6FE58] border-[#E6FE58] hover:bg-[#E6FE58] text-black font-semibold py-2 px-4 rounded-full text-lg"
        value="Login"
        onClick={(e) => onLogin(e)}
        />

        <p className="text-center text-black text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="font-semibold leading-6 text-black text-sm"
          >
            Register
          </button>
        </p>
        <span className="label-text-alt">{statusMessage}</span>

        {/* This section is included for debugging and development purposes */}
        {/* <h2>Default users</h2>
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th>Role</th>
              <th>Email</th>
              <th>Password</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Member</td>
              <td>jess@gmail.com</td>
              <td>abc123</td>
              <td>
                <button
                  className="btn btn-xs btn-primary"
                  onClick={() => {
                    login("jess@gmail.com", "abc123")
                      .then((result) => {
                        setStatusMessage("Login successful!");
                        navigate("/timetable");
                      })
                      .catch((error) => {
                        setStatusMessage("Login failed: " + error);
                      });
                  }}
                >
                  Login
                </button>
              </td>
            </tr>
            <tr>
              <td>Trainer</td>
              <td>haley@gmail.com</td>
              <td>abc123</td>
              <td>
                <button
                  className="btn btn-xs btn-primary"
                  onClick={() => {
                    login("haley@gmail.com", "abc123")
                      .then((result) => {
                        setStatusMessage("Login successful!");
                        navigate("/classes");
                      })
                      .catch((error) => {
                        setStatusMessage("Login failed: " + error);
                      });
                  }}
                >
                  Login
                </button>
              </td>
            </tr>
          </tbody>
        </table> */}
      </form>
    </div>
  );
}
