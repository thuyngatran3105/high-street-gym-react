import { useCallback, useEffect, useState } from "react";
import ClassDetails from "../../common/ClassDetails";
import * as BookingClasses from "../../api/bookings";
import { useAuthentication } from "../../hooks/authentication";

export default function Bookings() {
  const [user] = useAuthentication();
  const auth_key = "";
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [errorModal, setErrorModal] = useState(false);
  const [errorMessageModal, setErrorMessageModal] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const loadBooking = useCallback(() => {
    if (user && user.auth_key) {
      BookingClasses.getByUserId(user.auth_key)
        .then((result) => {
          setBookings(result.bookings);
          setLoading(true);
        })
        .catch((error) => {
          console.error("Failed to load bookings:", error);
        });
    }
  }, [user, setBookings]);

  useEffect(() => {
    loadBooking();
  }, [loadBooking]);

  const onDelete = useCallback(
    (bookingId) => {
      setErrorMessageModal("Do you want to cancel this class?");
      setSelectedBookingId(bookingId);
      setErrorModal(true);
    },
    [setErrorMessageModal, setSelectedBookingId, setErrorModal]
  );

  const confirmDelete = useCallback(() => {
    if (selectedBookingId) {
      BookingClasses.deleteById(selectedBookingId, user.auth_key)
        .then(() => {
          setErrorModal(false);
          setSelectedBookingId(null);
          loadBooking();
        })
        .catch((err) => {
          console.error("Failed to delete booking:", err);
        });
    }
  }, [user, selectedBookingId, loadBooking]);

  const closeModal = useCallback(() => {
    setErrorModal(false);
  }, []);

  return (
    <>
      <ClassDetails bookings={bookings} onDelete={onDelete} loading={loading} />
      {errorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modal-box bg-gray-900 border border-[#E6FE58] text-center">
            <p className="text-white text-lg mb-4 gap-4">{errorMessageModal}</p>
            <div className="flex flex-row gap-4 justify-center">
            <button
              className="btn bg-[#D9D9D9] border-[#D9D9D9] text-black font-semibold py-1 px-2 rounded-full text-lg w-32"
              onClick={closeModal}
            >
              Close
            </button>

            <button
              className="btn bg-[#E6FE58] hover:bg-[#E6FE58] border-[#E6FE58] text-black font-semibold py-1 px-2 rounded-full text-lg w-32"
              onClick={confirmDelete}
            >
              Cancel
            </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
