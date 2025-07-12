import { API_URL } from "./api"

export function login(email, password) {
    return fetch(API_URL + "/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email, 
            password
        })
    }).then(response => response.json())
    // .then(data => {
    //     // Store the authentication key
    //     localStorage.setItem("X-AUTH-KEY", data.authKey);
    //     return data; // Return the response for further processing
    // });
}

export function logout(authKey) {
    return fetch(API_URL + "/auth/logout", {
        method: "POST",
        headers: {
            "X-AUTH-KEY": authKey
        }
    }).then(response => response.json())
}

export function getByAuthKey(authKey) {
    return fetch(API_URL + "/users/key/" + authKey, {
        method: "GET",
        headers: {
            "X-AUTH-KEY": authKey
        }
    }).then(response => response.json())
}

export async function getUserByID(userID, authKey) {
    return fetch(
        API_URL + "/users/" + userID,
        {
            method: "GET",
            headers: {
                'X-AUTH-KEY': authKey
            },
        }).then(response => response.json())
}

export async function update(user, authKey) {
    const response = await fetch(
        API_URL + "/users/" + user.id,
        {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json",
                'X-AUTH-KEY': authKey
            },
            body: JSON.stringify({ user })
        }
    )

    const patchUserResult = await response.json()

    return patchUserResult
}

// export async function update(user) {
//     const authKey = localStorage.getItem("X-AUTH-KEY"); // Retrieve the key
//     const response = await fetch(API_URL + "/users/" + user.id, {
//         method: "PATCH",
//         headers: {
//             'Content-Type': "application/json",
//             'X-AUTH-KEY': authKey // Use the stored key
//         },
//         body: JSON.stringify({ user })
//     });
// }

export async function registerUser(user) {
    const response = await fetch(
        API_URL + "/users/register",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(user)
        }
    )

    const patchUserResult = await response.json()

    return patchUserResult
}
