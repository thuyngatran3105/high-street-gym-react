import Nav from "../../common/Nav";
import * as Bookings from "../../api/bookings";
import { useAuthentication } from "../../hooks/authentication";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../common/LoadingSpinner";

export default function ManageBookings() {
  const [user] = useAuthentication();
  const { classId } = useParams(); // Destructure classId
  const [loading, setLoading] = useState(false); 
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const auth_key = user.auth_key;
    Bookings.getByClassId(classId, auth_key).then((result) => {
      const bookings = result.bookings;
      setBookings(bookings);
      setLoading(true);
    });
  }
  }, [classId, user]);

  const activityName = bookings.length > 0 ? bookings[0].activity_name : "";
  const classDate = bookings.length > 0 ? bookings[0].class_date : "";
  const classTime = bookings.length > 0 ? bookings[0].class_time : "";
  const location = bookings.length > 0 ? bookings[0].location_name : "";

  return (
    <section className="bg-gray-900 w-full min-h-screen">
      <Nav />
      <div className="flex flex-col items-center min-h-screen bg-gray-900">
      {!loading ? (
      <div className="flex flex-grow items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : bookings.length > 0 ? (
          <>
            <h2 className="text-center font-bold text-white mt-10 text-lg">
              {activityName} ({classDate} {classTime}) - {location}
            </h2>
            <div className="container p-2 mx-auto min-w-[80%]">
              <div className="rounded border-2 border-white p-2 mt-5">
                <div className="overflow-x-auto">
                  <table className="table table-compact w-full">
                    <thead>
                      <tr>
                        <th className="text-white">Member Name</th>
                        <th className="text-white">Phone</th>
                        <th className="text-white">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking, index) => (
                        <tr key={index}>
                          <td className="text-white">
                            {booking.user_firstname} {booking.user_lastname}
                          </td>
                          <td className="text-white">{booking.user_phone}</td>
                          <td className="text-white">{booking.user_email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

      <div className="flex justify-center w-full mt-4">
        <button
          className="btn bg-[#D9D9D9] border-[#D9D9D9] text-black font-semibold py-1 px-2 rounded-full text-lg w-40 flex justify-center"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      </>
      ) : (
          <div className="flex flex-grow items-center justify-center">
            <p className="text-white text-lg">No bookings for this class yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
