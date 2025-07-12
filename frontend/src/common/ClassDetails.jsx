import { useState } from "react";
import Nav from "../common/Nav";
import { useAuthentication } from "../hooks/authentication";
import LoadingSpinner from "./LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";

export default function ClassDetails({
  bookings = [],
  classes = [],
  onDelete,
  loading = false,
}) {
  const [user] = useAuthentication();
  const navigate = useNavigate();

  // Determine which data to render based on user role
  const dataToRender = user && user.role === "Member" ? bookings : classes;

  return (
    <section className="bg-gray-900 w-full min-h-screen">
      <Nav />
      <div className="flex flex-col items-center min-h-screen bg-gray-900 pt-16 pb-8">
        {!loading ? (
          <div className="flex flex-grow items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : dataToRender.length ? (
          dataToRender.map((item) => (
            <div
              key={item.booking_id || item.class_id}
              className="border border-[#E6FE58] grid grid-cols-4 p-3 rounded-box h-32 w-[90vw] mb-8"
            >
              {user.role === "Member" ? (
                <div className="grid grid-rows-2 items-center">
                  <p className="text-white">{item.activity_name}</p>
                  <p className="text-white">{item.trainer_firstname}</p>
                </div>
              ) : (
                <div className="grid items-center">
                  <p className="text-white">{item.activity_name}</p>
                </div>
              )}

              <div className="grid grid-rows-2 col-span-2 items-center mr-[6px]">
                <p className="text-white">
                  {item.class_date} {item.class_time}
                </p>
                <p className="text-white">{item.location_name}</p>
              </div>

              {user.role == "Trainer" ? (
                <div className="flex flex-col justify-center items-center">
                  <button
                    className="btn bg-[#E6FE58] hover:bg-[#E6FE58] border border-[#E6FE58] rounded-full"
                    onClick={() => navigate(`/bookings/${item.class_id}`)}
                  >
                    View bookings
                  </button>

                  <button className="btn p-0 flex items-center justify-center bg-gray-900 border-none hover:bg-gray-900">
                    <p
                      className="flex items-center text-red-600 text-[16px]"
                      onClick={() => onDelete(item.booking_id || item.class_id)}
                    >
                      Cancel
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 22 22"
                        stroke="red"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </p>
                  </button>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <button className="btn p-0 flex items-center justify-center bg-gray-900 border-none hover:bg-gray-900">
                    <p
                      className="flex items-center text-red-600 text-[16px]"
                      onClick={() => onDelete(item.booking_id || item.class_id)}
                    >
                      Cancel
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 22 22"
                        stroke="red"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </p>
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-grow items-center justify-center">
            <p className="text-white text-lg">There is nothing in here!</p>
          </div>
        )}
      </div>
    </section>
  );
}
