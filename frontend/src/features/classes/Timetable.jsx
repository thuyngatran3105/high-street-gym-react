import { useEffect, useState } from "react";
import Nav from "../../common/Nav";
import { Link, useNavigate } from "react-router-dom";
import * as Classes from "../../api/classes";
import { useAuthentication } from "../../hooks/authentication";
import LoadingSpinner from "../../common/LoadingSpinner";

export default function Timetable() {
  const [user] = useAuthentication();
  const [classesByDay, setClassesByDay] = useState({});
  const [loadedClasses, setLoadedClasses] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const auth_key = user.auth_key;
        Classes.getAll(auth_key)
          .then((result) => {
            setClassesByDay(result.classesByDay);
            setLoadedClasses(true);
          })
          .catch((err) => {
            console.error("Failed to load classes:", err);
          });
    }
  }, [user]);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <section className="bg-gray-900 w-full min-h-screen flex flex-col">
      <Nav />
      <div className="flex-grow flex items-center justify-center pt-[12vh]">
        {!loadedClasses ? (
          <LoadingSpinner />
        ) : (
          <div className="bg-gray-800 bg-opacity-90 rounded-xl w-[85%] mb-[10vh]">
            <div className="border border-gray-700 rounded-lg">
              {daysOfWeek.map((day) => (
                <details key={day} className="border border-gray-700 p-5" open>
                  <summary className="cursor-pointer text-white text-center font-semibold rounded flex items-center justify-center hover:text-[#E6FE58] focus:text-[#E6FE58] transition duration-300 ease-in-out">
                    {day}
                  </summary>
                  {classesByDay[day] && classesByDay[day].length > 0 ? (
                    classesByDay[day].map((classItem, index) => (
                      <div key={index} className="grid grid-cols-2 gap-2 p-2">
                        <div className="flex justify-center items-center">
                          <p className="text-white">
                            {classItem.activity_name}
                          </p>
                        </div>
                        <div className="flex items-center justify-center">
                            <Link
                              to={`/create_booking/${classItem.activity_name}`}
                              className="btn hover:bg-[#E6FE58] bg-[#E6FE58] border-none text-black font-semibold py-1 px-3 rounded-[30px] w-24 h-2"
                            >
                              BOOK
                            </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-white mt-5 text-center text-[14px]">
                      No classes on this day
                    </p>
                  )}
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
