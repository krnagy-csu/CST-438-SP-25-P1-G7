import React from "react";
import { useState } from 'react';
import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";

export default function SignUpScreen() {
  const router = useRouter();
  // username value
  const [username, setUsername] = useState('');
  // password value
  const [password, setPassword] = useState('');
  return (

    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account!</Text>
      
      {/* prompt user for a username */}
      {/* <Text style={styles.prompt}>Username</Text> */}
      <TextInput 
        style = {styles.input}
        placeholder = "Enter a username"
        value = {username}
        onChangeText = {setUsername}
      />
      
      {/* prompt user for a password */}
      {/* <Text style={styles.prompt}>Password</Text> */}
      <TextInput 
        style = {styles.input}
        placeholder = "Enter a password"
        value = {password}
        onChangeText = {setPassword}
      />

      {/* send user entered credentialed / compare to database */}
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.buttonText}>Sign Up</Text>
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