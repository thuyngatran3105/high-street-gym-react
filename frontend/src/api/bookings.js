import { API_URL } from "./api";

export function getByUserId(auth_key) {
    return fetch (API_URL + "/bookings", {
        method: "GET",
        headers: {
            "X-AUTH-KEY": auth_key
        }
    }).then(res => res.json())
}

export function getByClassId(class_id, auth_key) {
    return fetch (API_URL + `/bookings/${class_id}`, {
        method: "GET",
        headers: {
            "X-AUTH-KEY": auth_key
        }
    }).then(res => res.json())
}

export function create(booking, auth_key) {
    return fetch(API_URL + "/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-KEY": auth_key
        },
        body: JSON.stringify(booking)
    }).then(res => res.json());
}

export function deleteById(id, auth_key) {
    return fetch(API_URL + "/bookings/" + id, {
        method: "DELETE",
        headers: {
            "X-AUTH-KEY": auth_key
        },
    }).then(res => res.json());
}