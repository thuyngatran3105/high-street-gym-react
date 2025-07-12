import { db_conn } from "../database.js";

export function newClass(
  id,
  datetime,
  location_id,
  activity_id,
  trainer_user_id
) {
  return {
    id,
    datetime,
    location_id,
    activity_id,
    trainer_user_id,
  };
}

//Delete
export function deleteById(class_id) {
  return db_conn.query(
    `
    UPDATE classes
    SET class_removed = 1
    WHERE class_id = ?
    `,
    [class_id]
  );
}
