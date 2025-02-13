import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { initDB, insertUser, selectUser, updateUser, deleteUser, selectAPI, insertAPI, deleteAPI } from '../database/db';


export default function App() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View>
          <Button style = {styles.btn}
              title="INITIALIZE DATABASE"
              onPress={() => initDB()}
          />
        </View>
  
        <View>
          <Button style = {styles.btn}
              title="INSERT USER"
              onPress={() => insertUser()}
          />
        </View>
  
        <View>
          <Button style = {styles.btn}
              title="SELECT USER"
              onPress={() => selectUser()}
          />
        </View>
  
        <View>
          <Button style = {styles.btn}
              title="UPDATE USER"
              onPress={() => updateUser()}
          />
        </View>
  
        <View>
          <Button style = {styles.btn}
              title="DELETE USER"
              onPress={() => deleteUser()}
          />
        </View>

        {/* API DATABASE BUTTONS */}
        <View>
          <Button style = {styles.btn}
              title="INSERT API"
              onPress={() => insertAPI()}
          />
        </View>

        <View>
          <Button style = {styles.btn}
              title="SELECT API"
              onPress={() => selectAPI()}
          />
        </View>

        <View>
          <Button style = {styles.btn}
              title="DELETE API"
              onPress={() => deleteAPI()}
          />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      width: '90%',
      height: 50,
    }
  });