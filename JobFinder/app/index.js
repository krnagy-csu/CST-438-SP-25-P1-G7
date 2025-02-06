import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
// import appStyles from "C:/Users/jc/Documents/Project1_JC/JobFinder/app/styles/appStyles.js";
import appStyles from "/Users/mora_a/Documents/GitHub/CST-438-SP-25-P1-G7/JobFinder/app/styles/appStyles.js";

export default function LandingScreen() {
  const router = useRouter();

  return (
    <View style={appStyles.container}>
      <Image 
        source={{ uri: "" }} 
        style={appStyles.logo} 
        resizeMode="contain" 
      />
      <Text style={appStyles.title}>Welcome to Job Search</Text>
      
      {/* Navigate to Signup */}
      <TouchableOpacity style={appStyles.caButton} onPress={() => router.push("/signup")}>
        <Text style={appStyles.buttonText}>Create an Account</Text>
      </TouchableOpacity>

      {/* Navigate to Login */}
      <TouchableOpacity style={[appStyles.caButton, appStyles.liButton]} onPress={() => router.push("/login")}>
        <Text style={appStyles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}