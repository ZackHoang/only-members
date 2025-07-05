const pool = require("./pool")

exports.insertUserSignUp = async (firstName, lastName, username, passwords, isAdmin) => {
    if (isAdmin === undefined) {
        await pool.query(`INSERT INTO only_members_users 
            (first_name, last_name, username, password, is_admin) VALUES
            ($1, $2, $3, $4, $5);
        `, [firstName, lastName, username, passwords, false]);
    } else {
        await pool.query(`INSERT INTO only_members_users 
            (first_name, last_name, username, password, is_admin) VALUES
            ($1, $2, $3, $4, $5);
        `, [firstName, lastName, username, passwords, true]);
    }
} 

exports.searchUser = async (username) => {
    const { rows } = await pool.query(`SELECT * FROM only_members_users WHERE username = $1;`, [username]);
    // console.log(rows);
    return rows[0];
}

exports.searchUserID = async (id) => {
    const { rows } = await pool.query(`SELECT * FROM only_members_users WHERE id = $1;`, [id]);
    return rows[0];
}