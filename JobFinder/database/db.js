import * as SQLite from 'expo-sqlite';

// // Polyfills for Async Methods

// // Polyfill for openDatabaseAsync
// if (!SQLite.openDatabaseAsync) {
//   SQLite.openDatabaseAsync = (name) => {
//     return new Promise((resolve, reject) => {
//       try {
//         const db = SQLite.openDatabase(name);
//         resolve(db);
//       } catch (e) {
//         reject(e);
//       }
//     });
//   };
// }

// // Polyfill for execAsync: executes a SQL statement and resolves with the result.
// if (!SQLite.Database.prototype.execAsync) {
//   SQLite.Database.prototype.execAsync = function (sql, params = []) {
//     return new Promise((resolve, reject) => {
//       this.transaction((tx) => {
//         tx.executeSql(
//           sql,
//           params,
//           (_, result) => resolve(result),
//           (_, error) => {
//             reject(error);
//             return false;
//           }
//         );
//       });
//     });
//   };
// }

// // Polyfill for runAsync: similar to execAsync but for running commands without needing a result.
// if (!SQLite.Database.prototype.runAsync) {
//   SQLite.Database.prototype.runAsync = function (sql, params = []) {
//     return new Promise((resolve, reject) => {
//       this.transaction((tx) => {
//         tx.executeSql(
//           sql,
//           params,
//           (_, result) => resolve(result),
//           (_, error) => {
//             reject(error);
//             return false;
//           }
//         );
//       });
//     });
//   };
// }

// // Polyfill for getAllAsync: executes a query and resolves with all rows as an array.
// if (!SQLite.Database.prototype.getAllAsync) {
//   SQLite.Database.prototype.getAllAsync = function (sql, params = []) {
//     return new Promise((resolve, reject) => {
//       this.transaction((tx) => {
//         tx.executeSql(
//           sql,
//           params,
//           (_, { rows }) => resolve(rows._array),
//           (_, error) => {
//             reject(error);
//             return false;
//           }
//         );
//       });
//     });
//   };
// }

// // Polyfill for getFirstAsync: executes a query and resolves with the first row.
// if (!SQLite.Database.prototype.getFirstAsync) {
//   SQLite.Database.prototype.getFirstAsync = function (sql, params = []) {
//     return new Promise((resolve, reject) => {
//       this.transaction((tx) => {
//         tx.executeSql(
//           sql,
//           params,
//           (_, { rows }) => resolve(rows.item(0)),
//           (_, error) => {
//             reject(error);
//             return false;
//           }
//         );
//       });
//     });
//   };
// }

// INIT DATABASE
export const initDB = async () => {
  console.log('initializing database');
  try {
    const uDB = await SQLite.openDatabaseAsync('userDatabase'); // User database
    const aDB = await SQLite.openDatabaseAsync('apiDatabase'); // API database

    // DROP TABLE CALL (for testing, commented out)
    // await uDB.execAsync(`DROP TABLE IF EXISTS user;`);
    // await aDB.execAsync(`DROP TABLE IF EXISTS saved_jobs;`);

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

    // CREATE API JOBS DATABASE
    await aDB.execAsync(`
      CREATE TABLE IF NOT EXISTS saved_jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        job_title TEXT NOT NULL,
        company TEXT NOT NULL,
        location TEXT NOT NULL,
        job_url TEXT NOT NULL
      );
    `);
  
    console.log('databases initialized successfully');
  } catch (e) {
    console.error("error initializing databases: ", e);
  }
};

// -----------------------  USER DATABASE FUNCTIONS -----------------------

export const selectUser = async () => {
  console.log("Fetching Users...");
  try {
    const uDB = await SQLite.openDatabaseAsync("userDatabase");
    const allRows = await uDB.getAllAsync("SELECT * FROM user"); 
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
  try {
    const uDB = await SQLite.openDatabaseAsync('userDatabase');
    await uDB.runAsync('UPDATE user SET password = ? WHERE username = ?', ['123', "JCSUSBILLA"]);
  } catch (e) {
    console.error("error: ", e);
  }
};

// DELETE USER
export const deleteUser = async () => {
  console.log('deleteUser');
  try {
    const uDB = await SQLite.openDatabaseAsync('userDatabase');
    await uDB.runAsync('DELETE FROM user WHERE username = $un', { $un: 'JCSUSBILLA' });
  } catch (e) {
    console.error("error: ", e);
  }
};

// INSERT USER
export const insertUser = async (username, password, firstName, lastName, email) => {
  console.log(`Inserting user: ${username}`);
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

// -----------------------  API DATABASE FUNCTIONS -----------------------

// INSERT JOB IF USER SELECTS IT
export const saveJob = async (username, jobTitle, company, location, jobUrl) => {
  console.log(`saving job for ${username}: ${jobTitle}`);
  try {
    const aDB = await SQLite.openDatabaseAsync("apiDatabase");

    // insert the saved job into the job database
    await aDB.runAsync(
      "INSERT INTO saved_jobs (username, job_title, company, location, job_url) VALUES (?, ?, ?, ?, ?)",
      [username, jobTitle, company, location, jobUrl]
    );

    console.log("job saved successfully");
    return { success: true };
  } catch (e) {
    console.error("error saving job: ", e);
    return { success: false, message: "error saving job" };
  }
};

// RETRIEVE SAVED JOBS FOR USER 
export const getSavedJobs = async (username) => {
  console.log(`fetching saved jobs for ${username}`);
  try {
    const aDB = await SQLite.openDatabaseAsync("apiDatabase");
    const allRows = await aDB.getAllAsync("SELECT * FROM saved_jobs WHERE username = ?", [username]);
    console.log("saved jobs:", allRows);
    return allRows;
  } catch (e) {
    console.error("error retrieving saved jobs: ", e);
    return [];
  }
};

// DELETE JOB IF USER UNSELECTS
export const deleteSavedJob = async (jobId) => {
  console.log(`Deleting saved job with ID: ${jobId}`);
  try {
    const aDB = await SQLite.openDatabaseAsync("apiDatabase");
    await aDB.runAsync("DELETE FROM saved_jobs WHERE id = ?", [jobId]);
    console.log("Job deleted successfully.");
    return { success: true };
  } catch (e) {
    console.error("Error deleting job: ", e);
    return { success: false, message: "Error deleting job." };
  }
};
