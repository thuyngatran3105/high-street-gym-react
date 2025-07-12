import { API_URL } from "./api";

export function getAll(auth_key) {
    return fetch(API_URL + "/blogs", {
        method: "GET",
        headers: {
            "X-AUTH-KEY": auth_key
        }
    }).then(res => res.json())
}

export function create(postBlog, auth_key) {
    return fetch(API_URL + "/blogs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-KEY": auth_key
        },
        body: JSON.stringify(postBlog)
    }).then(res => res.json());
}

export function deleteById(id, auth_key) {
    return fetch(API_URL + "/blogs/" + id, {
        method: "DELETE",
        headers: {
            "X-AUTH-KEY": auth_key
        },
    }).then(res => res.json());
}