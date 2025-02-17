
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import { insertUser } from "../database/db.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import appStyles from "./styles/appStyles.js";

export default function SignUpScreen() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');                 // first name value
    const [lastName, setLastName] = useState('');                   // last name value
    const [email, setEmail] = useState('');                         // email value

    // load stored signup data from AsyncStorage
    useEffect(() => {
        const loadSignupData = async () => {
            try {
                const data = await AsyncStorage.getItem("signupData");
                if (data) {
                    const { username, password } = JSON.parse(data);
                    setUsername(username);
                    setPassword(password);
                }
            } catch (error) {
                console.error("Error loading signup data:", error);
            }
        };
        loadSignupData();
    }, []);

    const handleSignUp = async () => {
        if (!firstName || !lastName || !email) {
          Alert.alert("Error", "Please fill in all fields.");
          return;
        }
      
        const result = await insertUser(username, password, firstName, lastName, email);
        if (result.success) {
          Alert.alert("Success", "Account created successfully!");
          router.push("/login");                                                // send to login screen
        } else {
          Alert.alert("Error", result.message);
        }
    };

    return (
        <View style={appStyles.container}>
            <Text style={appStyles.title}>Create Your Account!</Text>
            
            {/* prompt user for first name */}
            <TextInput 
                style = {appStyles.input}
                placeholder = "First name"
                value = {firstName}
                onChangeText = {setFirstName}
            />
            
            {/* prompt user for last name */}
            <TextInput 
                style = {appStyles.input}
                placeholder = "Last Name"
                value = {lastName}
                onChangeText = {setLastName}
            />

            {/* prompt user for email */}
            <TextInput 
                style = {appStyles.input}
                placeholder = "Enter email address"
                value = {email}
                onChangeText = {setEmail}
            />
        
            {/* send user entered credentials / compare to database */}
            <TouchableOpacity style={appStyles.signUpButton} onPress={handleSignUp}>
                <Text style={appStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* send user to login page if user already has an account */}
            <TouchableOpacity style={[appStyles.button, appStyles.secondaryButton]} onPress={() => router.push("/signup")}>
                <Text style={appStyles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}

