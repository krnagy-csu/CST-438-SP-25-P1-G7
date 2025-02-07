const db = require('better-sqlite3')('database.db');

const createTable = () => {
    const sql = `
        CREATE TABLE users (
            name TEXT NOT NULL,
            name TEXT NOT NULL
        )
    `
    db.prepare(sql).run();
}

const insertTable = (username, password) => {
    const sql = `
        INSERT INTO users (username, password)
        VALUES (?, ?)
    `
    db.prepare(sql).run(username, password)
}

const getUsers = () => {
    const sql = `
        SELECT * FROM users
        WHERE username = "JCSUSBILLA"
    `
    return db.prepare(sql).all()
    console.log(rows);
}

getUsers()