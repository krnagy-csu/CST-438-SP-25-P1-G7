import React from "react";
import { useState } from 'react';
import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Modal, CheckBox } from "react-native";
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
//install npm install react-native-modern-datepicker --save

export default function SignUpScreen() {
    const router = useRouter();

    // first name value
    const [firstName, setFirstName] = useState('');

    // last name value
    const [lastName, setLastName] = useState('');

    // email value
    const [email, setEmail] = useState('');

    // gender
    const [gender, setGender] = useState('');

    // DOB
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(false);
    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD')
    function handleOnPress(){
        setOpen(!open);
    }
    function handleChange(propDate){
        setDate(propDate)
        setOpen(false);
    }

    // terms and conditions
    const [isChecked, setIsChecked] = useState(false);

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

        {/* prompt user for gender */}
        <TextInput 
            style = {styles.input}
            placeholder = "Enter gender"
            value = {gender}
            onChangeText = {setGender}
        />

        {/* prompt user for date of birth */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleOnPress}> 
            <Text style={styles.buttonText}> Date of Birth </Text>
        </TouchableOpacity>
        <Modal 
            animationType = 'slide'
            transparent  ={true}
            visible = {open}
        >
            <View style = {styles.centeredView}>
                <View style = {styles.modalView}>
                    <DatePicker
                        mode = 'calendar'
                        maximumDate = {startDate}
                        selected = {date}
                        onDateChange={handleChange}
                    />
                </View>
            </View>
        </Modal>

        {/* fake terms and conditions  */}
        
        <View style = {styles.checkboxContainer}>
            <Text style={styles.prompt }>Accept terms and conditions?   </Text>
            <CheckBox
                value = {isChecked}
                onValueChange = {setIsChecked}
                style = {styles.checkbox}
            >
            </CheckBox>
        </View>
    
        
        {/* send user entered credentialed / compare to database */}
        <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* send user to login page if user already has an account */}
        {/* <Text style={styles.smallText}>already a user?</Text> */}
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