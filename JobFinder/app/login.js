import React, { useState, useEffect } from "react";
import {View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { selectUser } from "../database/db";

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
        Alert.alert("login successful", `welcome back, ${username}!`);
        await AsyncStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        //change this later
        router.push("/signup");                                               //send to job search page
      } else {
        Alert.alert("error", "invalid username or password");
      }
    } catch (error){
      console.error("login Error:", error);
      Alert.alert("error", "could not verify login credentials.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.toggleButton}
        >
          <Text>{showPassword ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

      <Button title="Login" onPress={handleLogin}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  toggleButton: {
    marginLeft: 10,
    padding: 10,
  },
});

export default LoginPage;