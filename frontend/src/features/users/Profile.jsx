import Form from "../../common/Form";
import { useNavigate } from "react-router-dom";
import Nav from "../../common/Nav";
import { useAuthentication } from "../../hooks/authentication";

export default function Profile() {
  const [user, login, logout, refresh] = useAuthentication();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex justify-center my-16">
        <span className="loading loading-dots loading-lg text-white"></span>
      </div>
    );
  }

  return (
    <section className="bg-gray-900 w-full min-h-screen">
      <Nav />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
        <Form userID={user.id} onSubmit="profile">
          <div className="flex flex-row place-content-around gap-1">
            <button
              className="btn btn-wide bg-[#D9D9D9] border-[#D9D9D9] text-black font-semibold py-1 px-2 rounded-full text-lg w-32"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn-wide bg-[#E6FE58] hover:bg-[#E6FE58] border-[#E6FE58] text-black font-semibold py-1 px-2 rounded-full text-lg w-32"
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </section>
  );
}
