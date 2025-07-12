import { useNavigate } from "react-router-dom"
import { useAuthentication } from "../hooks/authentication"
import Nav from "./Nav"

export function RestrictedRoute({ allowedRoles = [], children }) {
    const [user, login, logout] = useAuthentication()
    const navigate = useNavigate()

    const userIsAuthorised = user && allowedRoles.includes(user.role)

    return userIsAuthorised
        ? children
        : 
            <section className="bg-gray-900 w-full min-h-screen">
            <Nav />
            <div className="flex flex-col justify-center items-center gap-4 text-white pt-[12vh]">
                <h2 className="text-4xl">Not Authorised</h2>
                <span>Access role is not permitted to view this page.</span>
                <button className="btn btn-wide bg-[#D9D9D9] border-[#D9D9D9] text-black font-semibold py-1 px-2 rounded-full text-lg w-32" onClick={() => navigate(-1)}>Back</button>
                </div>
            </section>
}