import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { selectUser } from "../database/db";
import appStyles from "./styles/appStyles.js"; 

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log("Login Page Loaded!"); 
  }, []);

  // handle login authentication
  const handleLogin = async () => {
    if (!username || !password){
      Alert.alert("Error", "Please fill in both fields");
      return;
    }

    try{
      const users = await selectUser();
      const foundUser = users.find(
        (user) => user.username === username && user.password === password
      );

      if (foundUser){
        Alert.alert("Login Successful", `Welcome back, ${username}!`);
        await AsyncStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        router.push("/search"); // Send to job search page
      } else {
        Alert.alert("Error", "Invalid username or password.");
      }
    } catch (error){
      console.error("Login Error:", error);
      Alert.alert("Error", "Could not verify login credentials.");
    }
  };

  return (
    <View style={appStyles.container}>
      <Text style={appStyles.title}>Log In</Text>

      {/* Username Input */}
      <TextInput
        style={appStyles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Input with Show/Hide Button */}
      <Text style={appStyles.label}>Password</Text>
      <View style={appStyles.passwordContainer}>
        <TextInput
          style={[appStyles.input, { flex: 1, paddingRight: 40 }]}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={[appStyles.toggleButton, { position: 'absolute', right: 10, top: '50%', transform: [{ translateY: -25 }] }]}
        >
          <Text>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={appStyles.signUpButton} onPress={handleLogin}>
        <Text style={appStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Go to Sign Up Page */}
      <TouchableOpacity style={[appStyles.button, appStyles.secondaryButton]} onPress={() => router.push("/signup")}>
        <Text style={appStyles.buttonText}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;
