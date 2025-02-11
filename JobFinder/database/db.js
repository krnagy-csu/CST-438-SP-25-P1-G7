import * as SQLite from 'expo-sqlite';

//INIT
//function to initialize database
export const initDB = async () => {
    console.log('initDB');
    try{
      const db = await SQLite.openDatabaseAsync('userDatabase');
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS user (username TEXT NOT NULL, password TEXT NOT NULL);
      `);
    } catch (e) {
      console.error("error: ", e)
    }
}

//INSERT
//insert user into user database
export const insertUser = async () => {
    console.log('insertUser');
    try{
      const db = await SQLite.openDatabaseAsync('database');
      const result = await db.runAsync('INSERT INTO user (username, password) VALUES (?, ?)',"JCSUSBILLA", "pword");
      console.log(result.lastInsertRowId, result.changes);
    } catch (e) {
      console.error("error: ", e)
    }
  }
  
  //SELECT
  export const selectUser = async () => {
    console.log('selectUser');
    try{
      const db = await SQLite.openDatabaseAsync('database');
      const allRows = await db.getAllAsync('SELECT * FROM user');
      console.log("allRows: ", allRows)                     // show contents of database table
      for (const row of allRows) {
        console.log(row.username, row.password);
      }
    } catch (e) {
      console.error("error: ", e)
    }
  }
  
  // UPDATE USERNAME
  export const updateUser = async () => {
    console.log('updateUser');
    try{
      const db = await SQLite.openDatabaseAsync('database');
      await db.runAsync('UPDATE user SET password = ? WHERE username = ?', ['123', "JCSUSBILLA"]);
  
    } catch (e) {
      console.error("error: ", e)
    }
  }

  // UPDATE PASSWORD?
  
  //DELETE USER
  export const deleteUser = async () => {
    console.log('deleteUser');
    try{
      const db = await SQLite.openDatabaseAsync('database');
      await db.runAsync('DELETE FROM user WHERE username = $un', { $un: 'JCSUSBILLA' });
  
    } catch (e) {
      console.error("error: ", e)
    }
  }