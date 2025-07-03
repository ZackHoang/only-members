const { Client } = require("pg"); 
const { argv } = require('node:process');

const SQL = `
    CREATE TABLE IF NOT EXISTS only_members_users(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        username VARCHAR(255),
        password VARCHAR(255),
        is_admin BOOLEAN
    );

    CREATE TABLE IF NOT EXISTS only_members_posts(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(255),
        body TEXT,
        date DATE
    );
`;

async function main() {
    console.log("Seeding...");
    const client = new Client({
        connectionString: argv[2]
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();