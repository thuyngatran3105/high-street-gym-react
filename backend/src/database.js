import mysql from "mysql2/promise"

export const db_conn = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Nga31052005",
    database: "high-street-gym-fullstack"
})

export function convertToMySQLDate(date) {
    const year = date.toLocaleString('default', {year: 'numeric'});
    const month = date.toLocaleString('default', {
      month: '2-digit',
    });
    const day = date.toLocaleString('default', {day: '2-digit'});
  
    return [year, month, day].join('-');
  }

  export function convertToMySQLDatetime(datetime) {
    const year = datetime.toLocaleString('default', { year: 'numeric' });
    const month = datetime.toLocaleString('default', { month: '2-digit' });
    const day = datetime.toLocaleString('default', { day: '2-digit' });
  
    const hour = datetime.toLocaleString('default', {
      hour: 'numeric',
      hour12: true,
    }).split(' ')[0];
    
    let minutes = datetime.toLocaleString('default', {
      minute: '2-digit',
    });

    // Ensure minutes always have 2 digits
  minutes = minutes.padStart(2, '0');

  
    const period = datetime.toLocaleString('default', {
      hour: 'numeric',
      hour12: true,
    }).split(' ')[1]; 
  
    // Return the formatted datetime string: YYYY-MM-DD H:MMAM/PM
    return `${year}-${month}-${day} ${hour}:${minutes}${period}`;
  }
