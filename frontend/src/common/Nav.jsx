import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/authentication";

export default function Nav() {
  const [user, login, logout] = useAuthentication();
  const navigate = useNavigate();

  function onLogoutClick(e) {
    logout();
    navigate("/");
  }

  return (
    <div className="navbar bg-gray-500 bg-opacity-60">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-500 text-white rounded-box z-[1] mt-5 w-52 p-3 gap-4"
          >
            {user && user.role === "Member" ? (
              <li>
                <Link to="/timetable">Timetable</Link>
              </li>
            ) : null}

            {user && user.role === "Member" ? (
              <li>
                <Link to="/bookings">Bookings</Link>
              </li>
            ) : (
              <li>
                <Link to="/classes">Classes</Link>
              </li>
            )}

            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            {user && user.role == "Trainer" ? (
              <li>
                <a>XML Import</a>
                <ul className="p-2">
                  <li>
                    <Link to="/activities">Upload activities</Link>
                  </li>
                  <li>
                    <Link to="/locations">Upload locations</Link>
                  </li>
                </ul>
              </li>
            ) : (
              <></>
            )}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>

        {user && user.role === "Member" ? (
          <Link
            to="/timetable"
            className="btn btn-ghost text-2xl text-white font-bold"
          >
            High Street Gym
          </Link>
        ) : (
          <Link
            to="/classes"
            className="btn btn-ghost text-2xl text-white font-bold"
          >
            High Street Gym
          </Link>
        )}
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white">
          {user && user.role === "Member" ? (
            <li>
              <Link to="/timetable">Timetable</Link>
            </li>
          ) : null}

          {user && user.role === "Member" ? (
            <li>
              <Link to="/bookings">Bookings</Link>
            </li>
          ) : (
            <li>
              <Link to="/classes">Classes</Link>
            </li>
          )}

          <li>
            <Link to="/blogs">Blogs</Link>
          </li>

          {user && user.role == "Trainer" ? (
            <li>
              <details>
                <summary>XML Import</summary>
                <ul className="p-2 bg-gray-500 w-40">
                  <li>
                    <Link to="/activities">Upload activities</Link>
                  </li>
                  <li>
                    <Link to="/locations">Upload locations</Link>
                  </li>
                </ul>
              </details>
            </li>
          ) : (
            <></>
          )}

          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button
          onClick={onLogoutClick}
          className="flex flex-col items-center justify-center px-3 py-2"
        >
          <svg
            className="w-5 h-5 mb-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="red"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
            />
          </svg>
          <span className="text-[11px] text-white">Logout</span>
        </button>
      </div>
    </div>
  );
}
