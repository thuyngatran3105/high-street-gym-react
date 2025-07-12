import { useEffect, useState } from "react";
import * as Activities from "../../api/activities";
import Nav from "../../common/Nav";
import XMLUploader from "../xml/XMLUploader";
import LoadingSpinner from "../../common/LoadingSpinner";
import { useAuthentication } from "../../hooks/authentication";

export default function ActivityListPage() {
  const [user] = useAuthentication();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user) {
    Activities.getAll(user.auth_key).then((result) => {
      if (user) {
      const activitiesArray = result.activities;
      setActivities(activitiesArray);
      setLoading(true);
    }});
  }
  }, [user]);

  return (
    <section className="bg-gray-900 w-full min-h-screen">
      <Nav />
      <div className="flex flex-col items-center min-h-screen bg-gray-900">
        {!loading ? (
          <div className="flex flex-grow items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="container p-3 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="rounded border-2 border-white p-2 mt-[20px]">
              <h2 className="text-center text-white">All Activities</h2>
              <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                  <thead>
                    <tr>
                      <th className="text-white">ID</th>
                      <th className="text-white">Name</th>
                      <th className="text-white">Description</th>
                      <th className="text-white">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((activity) => (
                      <tr key={activity.id}>
                        <td className="text-white">{activity.id}</td>
                        <td className="text-white">{activity.name}</td>
                        <td className="text-white">{activity.description}</td>
                        <td className="text-white">{activity.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="rounded border-2 border-white min-h-16 p-2 mt-[20px]">
              <h2 className="text-center text-white">Upload Activities</h2>
              <XMLUploader
                uploadUrl={"/activities/upload-xml"}
                onUploadSuccess={() => {
                  Activities.getAll(user.auth_key).then(result => 
                    setActivities(result.activities)) 
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
