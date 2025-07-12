import { API_URL } from "./api";

export function getAll(auth_key) {
    return fetch(API_URL + "/locations", {
        method: "GET",
        headers: {
            "X-AUTH-KEY": auth_key
        }
    }).then(res => res.json())
}

export function create(locations, auth_key) {
    return fetch(API_URL + "/locations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-KEY": auth_key
        },
        body: JSON.stringify(locations)
    }).then(res => res.json());
}