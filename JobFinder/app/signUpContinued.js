
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Modal, CheckBox, Alert } from "react-native";
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import { insertUser } from "../database/db.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
//install npm install react-native-modern-datepicker --save
//npm install @react-native-async-storage/async-storage

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
        <View style={styles.container}>
            <Text style={styles.title}>Create Your Account!</Text>
            
            {/* prompt user for first name */}
            <TextInput 
                style = {styles.input}
                placeholder = "First name"
                value = {firstName}
                onChangeText = {setFirstName}
            />
            
            {/* prompt user for last name */}
            <TextInput 
                style = {styles.input}
                placeholder = "Last Name"
                value = {lastName}
                onChangeText = {setLastName}
            />

            {/* prompt user for email */}
            <TextInput 
                style = {styles.input}
                placeholder = "Enter email address"
                value = {email}
                onChangeText = {setEmail}
            />
        
            {/* send user entered credentialed / compare to database */}
            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* send user to login page if user already has an account */}
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => router.push("/signup")}>
                <Text style={styles.buttonText}>Back</Text>
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22.
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        lignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: 'center',
    },
});
