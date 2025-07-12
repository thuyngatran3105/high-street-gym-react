import { db_conn } from "../database.js";

export function newActivity(id, name, description, duration) {
    return {
        id,
        name,
        description,
        duration
    }
}

//Create
export function create(activity) {
    return db_conn.query(`
    INSERT INTO activities (activity_name, activity_description, activity_duration)
    VALUES (?, ?, ?)   
    `, [activity.name, activity.description, activity.duration])
}

//Read
export function getAll() {
    return db_conn.query(`SELECT * FROM activities WHERE activity_removed = 0`)
        .then(([queryResult]) => {
            return queryResult.map(row => newActivity(
                row.activity_id,
                row.activity_name,
                row.activity_description,
                row.activity_duration
            ))
        })
}

// export function getById(id) {
//     return db_conn.query(`SELECT * FROM activities WHERE activity_id = ?`, [id])
//         .then(([queryResult]) => {
//             // check at least one activity was found
//             if (queryResult.length > 0) {
//                 // get the first matching row
//                 const row = queryResult[0]
//                 // convert row to javascript object 
//                 return newActivity(
//                     row.activity_id,
//                     row.activity_name,
//                     row.activity_description,
//                     row.activity_duration
//                 )
//             } else {
//                 return Promise.reject("no matching results")
//             }
//         })
// }

//Update
// export function update(activity) {
//     return db_conn.query(`
//     UPDATE activities 
//     SET activity_name = ?, activity_description = ?, activity_duration = ?
//     WHERE activity_id = ?
//     `, [activity.name, activity.description, activity.duration, activity.id])
// }
