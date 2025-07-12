import { useRef, useState } from "react";
import { useAuthentication } from "../../hooks/authentication";
import { API_URL } from "../../api/api";

export default function XMLUploader({ onUploadSuccess, uploadUrl, disabled = false }) {
  const [user] = useAuthentication()

    const [statusMessage, setStatusMessage] = useState("")

    // useRef is the react way of getting an element reference like below:
    // const uploadInput = document.getElementById("file-input")
    const uploadInputRef = useRef(null);

    function uploadFile(e) {
        e.preventDefault()

        // Files is an array because the user could select multiple files
        // we choose to upload only the first selected file in this case.
        const file = uploadInputRef.current.files[0];

        // Fetch expects multi-part form data to be provided
        // inside a FormData object.  
        const formData = new FormData()
        formData.append("xml-file", file)

        fetch(API_URL + uploadUrl,
            {
                method: "POST",
                headers: {
                    'X-AUTH-KEY': user.auth_key
                },
                body: formData,
            })
            .then(res => res.json())
            .then(APIResponse => {
                setStatusMessage(APIResponse.message)
                // clear the selected file
                uploadInputRef.current.value = null
                // Notify of successful upload
                if (typeof onUploadSuccess === "function") {
                    onUploadSuccess()
                }
            })
            .catch(error => {
                setStatusMessage("Upload failed - " + error)
            })
    }

  return <>
     <div className="flex flex-col items-center justify-center" onSubmit={uploadFile}>
        <form className="flex flex-col items-center max-w-2xl w-full px-6">
       <div className="form-control w-full">
           <label className="label">
             <span className="label-text text-white">XML File Import</span>
           </label>
           <div className="flex flex-col">
             <input
              ref={uploadInputRef}
              type="file"
              className="file-input file-input-bordered file-input-[#E6FE58]"
            />
            <button disabled={disabled} className="btn bg-[#E6FE58] hover:bg-[#E6FE58] border-[#E6FE58] mt-6 text-lg">
              Upload
            </button>
          </div>
          <label className="label">
            <span className="label-text-alt text-white">{statusMessage}</span>
          </label>
        </div>
      </form>
    </div>
    </>
}
