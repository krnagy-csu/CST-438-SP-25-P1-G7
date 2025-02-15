import React from "react";
import { useState } from 'react';
import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doesUsernameExist } from "../database/db";

export default function SignUpScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');     // username value
  const [password, setPassword] = useState('');     // password value
  
  // validate username then save username and password to database
  const checkUsernameAndContinue = async () => {
    if (!username || !password){
      Alert.alert("error", "please enter a username and password.");
      return;
    }
    try{
      const exists = await doesUsernameExist(username);
      if (exists){
        Alert.alert("error", "username is already taken. Please choose another.");
        return;
      }
      await AsyncStorage.setItem("signupData", JSON.stringify({ username, password }));
      router.push("/signUpContinued"); 

    } catch (error){
      console.error("error checking username:", error);
      Alert.alert("error", "could not verify username availability.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account!</Text>
      
      {/* prompt user for a username */}
      <TextInput 
        style = {styles.input}
        placeholder = "Enter a username"
        value = {username}
        onChangeText = {setUsername}
      />
      
      {/* prompt user for a password */}
      <TextInput 
        style = {styles.input}
        placeholder = "Enter a password"
        value = {password}
        onChangeText = {setPassword}
        secureTextEntry={true}
      />

      {/* send user entered credentials */}
      <TouchableOpacity style={styles.signUpButton} onPress={checkUsernameAndContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* send user to login page if user already has an account */}
      <Text style={styles.smallText}>already a user?</Text>
      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => router.push("/login")}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
    padding: 20,
  },
  input: {
    borderBottomColor: "white",
    borderBottomWidth: 2,
    alignSelf: 'stretch',
    color: "#ffffff",
    margin: 16,
    padding: 8,
    fontSize: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 50,
  },
  prompt: {
    fontSize: 25,
    color: "#ffffff",
    marginBottom: 5,
  },
  smallText: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 15,
    marginTop: 50
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#444",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});