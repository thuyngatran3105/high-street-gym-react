import { db_conn } from "../database.js";

export function newLocation(id, name) {
    return {
        id,
        name
    }
}

//Create
export function create(location) {
    return db_conn.query(`
    INSERT INTO location (location_name)
    VALUES (?)
    `, [location.name])
}

//Read
export function getAll() {
    return db_conn.query(`SELECT * FROM location`)
        .then(([queryResult]) => {
            return queryResult.map(row => newLocation(
                row.location_id,
                row.location_name
            ))
    })
}
