import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import appStyles from "./styles/appStyles.js";

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

      {/* just for database testing */}
      {/*  
      <View>
        <TouchableOpacity style={[appStyles.caButton, appStyles.liButton]} onPress={() => router.push("/databaseTest")}>
          <Text style={appStyles.buttonText}>database test</Text>
        </TouchableOpacity>
      </View>
      */}
    </View>
  );
}