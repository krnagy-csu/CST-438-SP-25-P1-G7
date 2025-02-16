import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity, TextInput, Modal } from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import appStyles from "./styles/appStyles.js";

export default function SignUpScreen() {
    const router = useRouter();

    // User Input States
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');

    // Date of Birth
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('');
    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD');

    function handleOnPress() {
        setOpen(!open);
    }

    function handleChange(propDate) {
        setDate(propDate);
        setOpen(false);
    }

    // Terms and Conditions Acceptance
    const [isChecked, setIsChecked] = useState(false);

    return (
        <View style={appStyles.container}>
            <Text style={appStyles.title}>Create Your Account!</Text>

            {/* First Name */}
            <TextInput 
                style={appStyles.input}
                placeholder="First name"
                value={firstName}
                onChangeText={setFirstName}
            />

            {/* Last Name */}
            <TextInput 
                style={appStyles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />

            {/* Email */}
            <TextInput 
                style={appStyles.input}
                placeholder="Enter email address"
                value={email}
                onChangeText={setEmail}
            />

            {/* Gender */}
            <TextInput 
                style={appStyles.input}
                placeholder="Enter gender"
                value={gender}
                onChangeText={setGender}
            />

            {/* Date of Birth */}
            <TouchableOpacity style={appStyles.signUpButton} onPress={handleOnPress}> 
                <Text style={appStyles.buttonText}>Date of Birth</Text>
            </TouchableOpacity>

            <Modal animationType="slide" transparent={true} visible={open}>
                <View style={appStyles.centeredView}>
                    <View style={appStyles.modalView}>
                    <DatePicker
                        mode="calendar"
                        maximumDate={startDate}
                        current={date}
                        onDateChange={handleChange}
                    />
                    </View>
                </View>
            </Modal>

            {/* Terms & Conditions - Checkbox Under Text */}
            <View style={appStyles.checkboxRow}>
                <Text style={appStyles.checkboxLabel}>Accept terms and conditions?</Text>
                <TouchableOpacity 
                    onPress={() => setIsChecked(!isChecked)} 
                    style={appStyles.checkboxContainer}
                >
                    <Text style={appStyles.checkboxText}>
                        {isChecked ? "✅ Accepted" : "⬜ Not Accepted"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity style={appStyles.signUpButton}>
                <Text style={appStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Back Button */}
            <TouchableOpacity style={[appStyles.button, appStyles.secondaryButton]} onPress={() => router.push("/signup")}>
                <Text style={appStyles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}


