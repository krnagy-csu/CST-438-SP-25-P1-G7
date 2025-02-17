import React from "react";
import { useState } from 'react';
import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doesUsernameExist } from "../database/db";
import appStyles from "./styles/appStyles.js";

export default function SignUpScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');     // username value
  const [password, setPassword] = useState('');     // password value
  
  // validate username then save username and password to database
  const checkUsernameAndContinue = async () => {
    if (!username || !password){
      Alert.alert("Error", "Please enter a username and password.");
      return;
    }
    try{
      const exists = await doesUsernameExist(username);
      if (exists){
        Alert.alert("Error", "Username is already taken. Please choose another.");
        return;
      }
      await AsyncStorage.setItem("signupData", JSON.stringify({ username, password }));
      router.push("/signUpContinued"); 

    } catch (error){
      console.error("Error checking username:", error);
      Alert.alert("Error", "Could not verify username availability.");
    }
  };

  return (
    <View style={appStyles.container}>
      <Text style={appStyles.title}>Create Your Account!</Text>
      
      {/* prompt user for a username */}
      <TextInput 
        style={appStyles.input}
        placeholder="Enter a username"
        value={username}
        onChangeText={setUsername}
      />
      
      {/* prompt user for a password */}
      <TextInput 
        style={appStyles.input}
        placeholder="Enter a password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      {/* send user entered credentials */}
      <TouchableOpacity style={appStyles.signUpButton} onPress={checkUsernameAndContinue}>
        <Text style={appStyles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* send user to login page if user already has an account */}
      <Text style={appStyles.smallText}>Already a user?</Text>
      <TouchableOpacity style={[appStyles.button, appStyles.secondaryButton]} onPress={() => router.push("/login")}>
        <Text style={appStyles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}
