import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import appStyles from "./styles/appStyles.js";

export default function SignUpScreen() {
  const router = useRouter();
  // username value
  const [username, setUsername] = useState('');
  // password value
  const [password, setPassword] = useState('');
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
      />

      {/* send user entered credentialed / compare to database */}
      <TouchableOpacity style={styles.signUpButton} onPress={() => router.push("/signUpContinued")}>
        <Text style={styles.buttonText}> Continue</Text>
      </TouchableOpacity>

      {/* send user to login page if user already has an account */}
      <Text style={appStyles.smallText}>Existing User?</Text>
      <TouchableOpacity style={[appStyles.button, appStyles.secondaryButton]} onPress={() => router.push("/login")}>
        <Text style={appStyles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}