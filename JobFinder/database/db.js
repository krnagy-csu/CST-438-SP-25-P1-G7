import * as SQLite from 'expo-sqlite';

// INIT DATABASE
export const initDB = async () => {
  console.log('initDB');
  try {
    const uDB = await SQLite.openDatabaseAsync('userDatabase'); // User database
    const aDB = await SQLite.openDatabaseAsync('apiDatabase'); // API database

    // CREATE USER DATABASE
    await uDB.execAsync(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY NOT NULL, 
        username TEXT NOT NULL, 
        password TEXT NOT NULL
      );
    `);

    // CREATE API DATABASSE
    await aDB.execAsync(`
      CREATE TABLE IF NOT EXISTS api (
        jobName TEXT NOT NULL,
        jobID INTEGER NOT NULL,
        skillName TEXT NOT NULL,
        skillID INTEGER NOT NULL
      );
    `);
    
    console.log('databases initialized successfully');
  } catch (e) {
    console.error("error initializing databases: ", e);
  }
};

//do we want drop database functions?

// --------------------------------------  USER DATABASE FUNCTIONS --------------------------------------
// INSERT USER
export const insertUser = async () => {
  console.log('insertUser');
  try {
    const uDB = await SQLite.openDatabaseAsync('userDatabase');
    const result = await uDB.runAsync(
      'INSERT INTO user (username, password) VALUES (?, ?)', 
      ["JCSUSBILLA", "pword"] // Provide values for username and password only
    );
    console.log(`Inserted user with ID: ${result.lastInsertRowId}`);
  } catch (e) {
    console.error("error: ", e);
  }
};

// SELECT USER
export const selectUser = async () => {
  console.log('selectUser');
  try {
    const uDB = await SQLite.openDatabaseAsync('userDatabase');
    const allRows = await uDB.getAllAsync('SELECT * FROM user');
    console.log("allRows: ", allRows); // Show contents of the user table
    for (const row of allRows) {
      console.log(row.lastInsertRowId, row.username, row.password);
    }
  } catch (e) {
    console.error("error: ", e);
  }
};

// UPDATE USER
export const updateUser = async () => {
  console.log('updateUser');
  try{
    const uDB = await SQLite.openDatabaseAsync('userDatabase');
    await uDB.runAsync('UPDATE user SET password = ? WHERE username = ?', ['123', "JCSUSBILLA"]);

  } catch (e) {
    console.error("error: ", e)
  }
}

// DELETE USER
export const deleteUser = async () => {
  console.log('deleteUser');
  try{
    const uDB = await SQLite.openDatabaseAsync('userDatabase');
    await uDB.runAsync('DELETE FROM user WHERE username = $un', { $un: 'JCSUSBILLA' });

  } catch (e) {
    console.error("error: ", e)
  }
}

// -------------------------------------- API DATABASE FUNCTIONS --------------------------------------
// will implement after someone completes the api stuff

// INSERT API
export const insertAPI = async () => {
  console.log('insertAPI');
  try{
    const aDB = await SQLite.openDatabaseAsync('apiDatabase');
    const result = await aDB.runAsync('INSERT INTO api (jobName, jobID, skillName, skillID) VALUES (?, ?, ?, ?)',"engineer", 1, "computers", 2);
    console.log(result.lastInsertRowId, result.changes);
  } catch (e) {
    console.error("error: ", e)
  }
}
// API SELECT
export const selectAPI = async () => {
  console.log('selectAPI');
  try{
    const aDB = await SQLite.openDatabaseAsync('apiDatabase');
    const allRows = await aDB.getAllAsync('SELECT * FROM api');
    console.log("allRows: ", allRows)                     // show contents of database table
    for (const row of allRows) {
      console.log(row.jobName, row.skillName);
    }
  } catch (e) {
    console.error("error: ", e)
  }
}

// DELETE API
export const deleteAPI = async () => {
  console.log('deleteAPI');
  try{
    const aDB = await SQLite.openDatabaseAsync('apiDatabase');
    await aDB.runAsync('DELETE FROM api WHERE jobName = $an', { $an: 'engineer'});

  } catch (e) {
    console.error("error: ", e)
  }
}
  