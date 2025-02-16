import * as SQLite from 'expo-sqlite';

// INIT DATABASE
export const initDB = async () => {
  console.log('initializing database');
  try {
    const uDB = await SQLite.openDatabaseAsync('userDatabase'); // User database
    const aDB = await SQLite.openDatabaseAsync('apiDatabase'); // API database

    // DROP TABLE CALL
    //await uDB.execAsync(`DROP TABLE IF EXISTS user;`); // just for testing

    // CREATE USER DATABASE
    await uDB.execAsync(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY NOT NULL, 
        username TEXT NOT NULL UNIQUE, 
        password TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      );
    `);

    // CREATE API DATABASSE
    //edit these
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

export const selectUser = async () => {
  console.log("Fetching Users...");
  try {
    const uDB = await SQLite.openDatabaseAsync("userDatabase");
    const allRows = await uDB.getAllAsync("SELECT * FROM user"); 

    //testing
      console.log("User Table Data:", allRows);
      return allRows;
  } catch (e) {
    console.error("Error selecting users:", e);
    return [];
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

// INSERT USER
export const insertUser = async (username, password, firstName, lastName, email) => {
  console.log(`Inserting user: ${username}`);//testing
  try {
    const uDB = await SQLite.openDatabaseAsync('userDatabase');

    // check if username exists in database already
    const result = await uDB.getFirstAsync(
      'SELECT COUNT(*) AS count FROM user WHERE username = ?',
      [username]
    );

    if (result.count > 0) {
      console.log("Username already exists.");
      return { success: false, message: "Username already exists. Please choose another." };
    }

    // insert all user details into user database table entry
    await uDB.runAsync(
      'INSERT INTO user (username, password, first_name, last_name, email) VALUES (?, ?, ?, ?, ?)',
      [username, password, firstName, lastName, email]
    );

    console.log("User successfully registered!");
    return { success: true };
  } catch (e) {
    console.error("Error inserting user: ", e);
    return { success: false, message: "Error inserting user." };
  }
};

export const doesUsernameExist = async (username) => {
  console.log(`Checking if username exists: ${username}`);
  try {
    const uDB = await SQLite.openDatabaseAsync('userDatabase');
    const result = await uDB.getFirstAsync(
      'SELECT COUNT(*) AS count FROM user WHERE username = ?',
      [username]
    );
    return result.count > 0;  // Returns true if username exists
  } catch (e) {
    console.error("Error checking username existence: ", e);
    return false;
  }
};

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
  