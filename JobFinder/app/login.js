import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "Login Page"; // Sets the title of the browser tab for now
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
          <Text>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 50, 
    width: '100%', 
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15, 
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff', // White background for the inputs
  },
  label: {
    marginBottom: 5,
    fontSize: 18, 
    fontWeight: 'bold',
    alignSelf: 'flex-start', 
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', 
  },
  toggleButton: {
    marginLeft: 10,
    padding: 10, 
  },
});

export default LoginPage;


