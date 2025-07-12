import { useEffect, useState } from "react";
import * as Locations from "../../api/locations";
import Nav from "../../common/Nav";
import XMLUploader from "../xml/XMLUploader";
import LoadingSpinner from "../../common/LoadingSpinner";
import { useAuthentication } from "../../hooks/authentication";

export default function LocationListPage() {
    const [user] = useAuthentication();
    const [locations, setLocations] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (user) {
        Locations.getAll(user.auth_key).then(result => 
            setLocations(result.locations))
            setLoading(true)
    }
}, [user])

    return <section className="bg-gray-900 w-full min-h-screen">
        <Nav />
        <div className="flex flex-col items-center min-h-screen bg-gray-900">
        {!loading ? (
          <div className="flex flex-grow items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
        <div className="container p-3 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="rounded border-2 border-white p-2 mt-[20px]">
                <h2 className="text-center text-white">All Locations</h2>
                <div className="overflow-x-auto">
                    <table className="table table-compact w-full">
                        <thead>
                            <tr>
                                <th className="text-white">ID</th>
                                <th className="text-white">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map(location =>
                                <tr key={location.id}>
                                    <td className="text-white">{location.id}</td>
                                    <td className="text-white">{location.name}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="rounded border-2 border-white min-h-16 p-2 mt-[20px]">
                <h2 className="text-center text-white">Upload Locations</h2>
                <XMLUploader uploadUrl={"/locations/upload-xml"} onUploadSuccess={() => {
                    Locations.getAll(user.auth_key).then(result => setLocations(result.locations))
                }} />
            </div>
          </div>
        )}
      </div>
    </section>
}