import ClassDetails from "../../common/ClassDetails";
import * as Classes from "../../api/classes";
import { useAuthentication } from "../../hooks/authentication";
import { useCallback, useEffect, useState } from "react";

export default function ManageClasses() {
  const [user] = useAuthentication();
  const auth_key = "";
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [errorModal, setErrorModal] = useState(false);
  const [errorMessageModal, setErrorMessageModal] = useState("");
  const [selectedClassId, setSelectedClassId] = useState(null);

  const loadClass = useCallback(() => {
    if (user && user.auth_key) {
      Classes.getByTrainerId(user.auth_key)
        .then((result) => {
          setClasses(result.classes);
          setLoading(true);
        })
        .catch((error) => {
          console.error("Failed to load classes:", error);
        });
    }
  }, [user, setClasses]);

  useEffect(() => {
    loadClass();
  }, [loadClass]);

  const onDelete = useCallback(
    (classId) => {
      setErrorMessageModal("Do you want to cancel this class?");
      setSelectedClassId(classId);
      setErrorModal(true);
    },
    [setErrorMessageModal, setSelectedClassId, setErrorModal]
  );

  const confirmDelete = useCallback(() => {
    if (selectedClassId) {
      Classes.deleteById(selectedClassId, user.auth_key)
        .then(() => {
          setErrorModal(false);
          setSelectedClassId(null);
          loadClass();
        })
        .catch((err) => {
          console.error("Failed to delete class:", err);
        });
    }
  }, [user, selectedClassId, loadClass]);

  const closeModal = useCallback(() => {
    setErrorModal(false);
  }, []);

  return (
    <>
    <ClassDetails classes={classes} onDelete={onDelete} loading={loading} />
    {errorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modal-box bg-gray-900 border border-[#E6FE58] text-center">
            <p className="text-white text-lg mb-4 gap-4">{errorMessageModal}</p>
            <div className="flex flex-row gap-4 justify-center">
            <button
              className="btn bg-gray-400 border-gray-400 border-[#E6FE58] text-black font-semibold py-1 px-2 rounded-full text-lg w-32"
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
