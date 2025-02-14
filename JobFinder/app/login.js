import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from "expo-router";
import appStyles from "./styles/appStyles.js";

const router = useRouter();

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "Login Page"; // Sets the title of the browser tab
  }, []);

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please fill in both fields');
    } else {
      if (username === 'admin' && password === 'password') {
        Alert.alert('Login Successful', `Welcome back, ${username}!`);
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    }
  };

  return (
    <View style={appStyles.container}>
      <Text style={appStyles.title}>Login</Text>

      <Text style={appStyles.label}>Username</Text>
      <TextInput
        style={appStyles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

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

      <TouchableOpacity style={appStyles.caButton} onPress={handleLogin}>
        <Text style={appStyles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;



