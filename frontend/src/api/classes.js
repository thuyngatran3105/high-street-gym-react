import { API_URL } from "./api";

export function getAll(auth_key) {
    return fetch(API_URL + "/classes", {
        method: "GET",
        headers: {
            "X-AUTH-KEY": auth_key
        }
    }).then(res => res.json())
}

export function getClassScheduleByName(auth_key, activity_name) {
    return fetch(API_URL + `/classes/${activity_name}`, {
        method: "GET",
        headers: {
            "X-AUTH-KEY": auth_key,
        }
    }).then(res => res.json())
}

export function getClassesOfTrainerByDateRange(auth_key) {
    return fetch(API_URL + "/classes/trainer", {
        method: "GET",
        headers: {
            "X-AUTH-KEY": auth_key
        }
    }).then(res => res.json())
}

export function getByTrainerId(auth_key) {
    return fetch(API_URL + "/classes/trainer-classes", {
        method: "GET",
        headers: {
            "X-AUTH-KEY": auth_key
        }
    }).then(res => res.json())
}

export function deleteById(id, auth_key) {
    return fetch(API_URL + "/classes/" + id, {
        method: "DELETE",
        headers: {
            "X-AUTH-KEY": auth_key
        },
    }).then(res => res.json());
}