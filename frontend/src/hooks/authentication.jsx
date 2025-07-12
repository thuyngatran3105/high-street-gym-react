import { createContext, useContext, useEffect, useState } from "react"
import * as User from "../api/users"

export const AuthenticationContext = createContext(null)

export function AuthenticationProvider({ router, children }) {
    const [authenticatedUser, setAuthenticatedUser] = useState(null)

    // Handle case where the user is logged in and the page
    // is reloaded. Check localStorage to see if the authenticationKey
    // has been saved there, then attempt to load user by authenticationKey 
    // to resume client side session. Redirect to root page if failed. 
    useEffect(() => {
        if (authenticatedUser == null) {
            const authenticationKey = localStorage.getItem("authenticationKey")
            if (authenticationKey) {
                User.getByAuthKey(authenticationKey)
                    .then(response => {
                        setAuthenticatedUser(response.user)
                    })
                    .catch(error => {
                        router.navigate("/")
                    })
            } else {
                router.navigate("/")
            }
        }
    }, [])

    return <AuthenticationContext.Provider value={[authenticatedUser, setAuthenticatedUser]}>
        {children}
    </AuthenticationContext.Provider>
}

export function useAuthentication() {
    const [authenticatedUser, setAuthenticatedUser] = useContext(AuthenticationContext)

    async function login(email, password) {
        // Clear existing client side user record
        setAuthenticatedUser(null)
        // Attempt login and retrieve user if successful
        return User.login(email, password)
            .then(result => {
                if (result.status == 200) {
                    // Store auth key in case page is reloaded
                    localStorage.setItem("authenticationKey", result.user.auth_key)

                    // Set a copy of the user model in the frontend
                    setAuthenticatedUser(result.user)

                    return Promise.resolve({message: result.message, user: result.user})
                } else {
                    return Promise.reject(result.message)
                }
            }).catch(error => {
                return Promise.reject(error)
            })
    }

    async function logout() {
        localStorage.removeItem("authenticationKey")
        if (authenticatedUser) {
            return User.logout(authenticatedUser.auth_key)
                .then(result => {
                    setAuthenticatedUser(null)
                    return Promise.resolve(result.message)
                })
        }
    }

    async function refresh() {
        if (authenticatedUser) {
            return User.getByAuthKey(authenticatedUser.auth_key)
                .then(result => {
                    setAuthenticatedUser(result.user)
                    return Promise.resolve("user refreshed")
                })
        } else {
            return Promise.reject("user must be authenticated")
        }
    }

    return [authenticatedUser, login, logout, refresh]
}