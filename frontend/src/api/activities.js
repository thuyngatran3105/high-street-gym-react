import { API_URL } from "./api";

export function getAll(auth_key) {
    return fetch(API_URL + "/activities", {
        method: "GET",
        headers: {
            "X-AUTH-KEY": auth_key
        }
    }).then(res => res.json())
}

export function create(activities, auth_key) {
    return fetch(API_URL + "/activities", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-KEY": auth_key
        },
        body: JSON.stringify(activities)
    }).then(res => res.json());
}