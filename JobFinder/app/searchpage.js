import React from "react";
import { useState } from 'react';
import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";

export default function SignUpScreen() {
  const router = useRouter();
  // username value
  const [skill, setSkill] = useState('');
  const [lastKey,keyUp] = useState('');
  // password value
  console.log("http://api.dataatwork.org/v1/skills/${skill}/related_jobs")
  let requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  try{
  let url = ("http://api.dataatwork.org/v1/skills/"+skill+"/related_jobs");
  let a = fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  } catch (exception){
    console.log(exception);
  }


  return (

    <View style={styles.container}>
      <Text style={styles.title}>Input a skill!</Text>
      
      {/* prompt user to input a skill */}
      <TextInput 
        style = {styles.input}
        placeholder = "Enter a skill"
        value = {skill}
        onChangeText={setSkill}
        key={lastKey}
      />

      {/* when they do, access the API to retrieve jobs that are related to that skill */}
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