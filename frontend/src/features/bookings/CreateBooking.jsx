import { useNavigate, useParams } from "react-router-dom";
import Nav from "../../common/Nav";
import { useCallback, useEffect, useState } from "react";
import * as Classes from "../../api/classes";
import * as Bookings from "../../api/bookings"
import { useAuthentication } from "../../hooks/authentication";
import LoadingSpinner from "../../common/LoadingSpinner";

export default function CreateBooking() {
  const [user] = useAuthentication();
  const navigate = useNavigate()
  const { activityName } = useParams();
  const [classSchedule, setClassSchedule] = useState([]);
  const [errorModal, setErrorModal] = useState(false)
  const [errorMessageModal, setErrorMessageModal] = useState("")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (user) {
    const auth_key = user.auth_key;
    Classes.getClassScheduleByName(auth_key, activityName).then(
      (classDetails) => {
        setClassSchedule(classDetails.classes);
        setLoaded(true)
      }
    );
    }
  }, [user, activityName]);

  const onBook = useCallback((class_id) => {
    const booking = {
      booking_class_id: class_id
    }

    Bookings.create(booking, user.auth_key).then(result => {
      if (result.status === 200 && result.message == "Successfully created a booking") {
        navigate("/timetable")
      } else if (result.status === 400 && result.message == "You have already booked this class.") {
        setErrorMessageModal("You have already booked this class!")
        setErrorModal(true)
      }
    }).catch(err => {
      console.error("Failed to create a booking: ", err);
    })
  }, [user, navigate])

  const closeModal = useCallback(() => {
    setErrorModal(false)
  })

  return (
    <section className="bg-gray-900 min-h-screen">
      <Nav />
      <div className="flex flex-col flex-grow items-center min-h-screen bg-gray-900 pt-24">
        {!loaded ? (
          <div className="flex flex-grow items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>
        <h1 className="text-base-200 text-3xl font-bold mb-5">
          Create a booking
        </h1>
        <h2 className="text-white font-semibold text-2xl mb-10">
          {activityName}
        </h2>
        {classSchedule.map((classes) => (
          <div key={classes.class_id} className="border border-[#E6FE58] grid grid-cols-2 p-2 mb-3 rounded-box h-44 w-[90vw] items-center">
            <div className="grid grid-rows-2 gap-5 mb-5 justify-center">
              <p className="text-white">Date: {classes.class_date}</p>
              <p className="text-white">Time: {classes.class_time}</p>
            </div>

            <div className="grid grid-rows-2 gap-5 mb-5 justify-center w-[46vw]">
              <p className="text-white">Location: {classes.location_name}</p>
              <p className="text-white">Trainer: {classes.user_firstname}</p>
            </div>

            <div className="flex col-span-2 justify-around w-full mt-4">
              <button 
              className="btn bg-[#D9D9D9] border-[#D9D9D9] text-black font-semibold py-1 px-2 rounded-full text-lg w-32"
              onClick={() => navigate(-1)}
              >
                Back
              </button>
              <button
                type="submit"
                className="btn bg-[#E6FE58] hover:bg-[#E6FE58] border-[#E6FE58] text-black font-semibold py-1 px-2 rounded-full text-lg w-32"
                onClick={() => onBook(classes.class_id)}
              >
                Book Now
              </button>
              </div>
              </div>
        ))}
                  </>
        )}

        {errorModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="modal-box bg-gray-900 border border-[#E6FE58] text-center">
              <p className="text-white text-lg mb-4">{errorMessageModal}</p>
              <button
                className="btn bg-[#D9D9D9] border-[#D9D9D9] text-black font-semibold py-1 px-2 rounded-full text-lg w-32"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
