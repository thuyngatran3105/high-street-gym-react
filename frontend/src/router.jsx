import { createBrowserRouter } from "react-router-dom";
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import Blogs from "./features/blogs/Blogs";
import Profile from "./features/users/Profile";
import Timetable from "./features/classes/Timetable";
import CreateBooking from "./features/bookings/CreateBooking";
import Bookings from "./features/bookings/Bookings";
import ManageClasses from "./features/classes/ManageClasses";
import LocationListPage from "./features/locations/LocationListPage";
import ActivityListPage from "./features/activities/ActivityListPage";
import ManageBookings from "./features/bookings/ManageBookings";
import { RestrictedRoute } from "./common/RestrictedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/timetable",
    element: (
      <RestrictedRoute allowedRoles={["Member"]}>
        <Timetable />
      </RestrictedRoute>
    ),
  },
  {
    path: "/create_booking/:activityName",
    element: (
      <RestrictedRoute allowedRoles={["Member"]}>
        <CreateBooking />
      </RestrictedRoute>
    ),
  },
  {
    path: "/bookings",
    element: (
      <RestrictedRoute allowedRoles={["Member"]}>
        <Bookings />
      </RestrictedRoute>
    ),
  },
  {
    path: "/bookings/:classId",
    element: (
      <RestrictedRoute allowedRoles={["Trainer"]}>
        <ManageBookings />
      </RestrictedRoute>
    ),
  },
  {
    path: "/classes",
    element: (
      <RestrictedRoute allowedRoles={["Trainer"]}>
        <ManageClasses />
      </RestrictedRoute>
    ),
  },
  {
    path: "/blogs",
    element: (
      <RestrictedRoute allowedRoles={["Trainer", "Member"]}>
        <Blogs />
      </RestrictedRoute>
    ),
  },
  {
    path: "/activities",
    element: (
      <RestrictedRoute allowedRoles={["Trainer"]}>
        <ActivityListPage />
      </RestrictedRoute>
    ),
  },
  {
    path: "/locations",
    element: (
      <RestrictedRoute allowedRoles={["Trainer"]}>
        <LocationListPage />
      </RestrictedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <RestrictedRoute allowedRoles={["Trainer", "Member"]}>
        <Profile />
      </RestrictedRoute>
    ),
  },
]);

export default router;
