import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://10.0.1.169:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200 && data.message === "Login successful") {
        navigation.navigate('Timetable');
      } else {
        Alert.alert('Error', data.error || 'Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Connection Error', 
        'Could not reach the backend server. Verify that your Flask backend is active and running.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ShiftSync</Text>
      <Text style={styles.subTitle}>Find part-time jobs that fit your classes</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#A9A9A9"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#A9A9A9"
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#007AFF',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 40,
  },
  inputView: {
    width: '100%',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 15,
  },
  inputText: {
    height: 50,
    color: '#000',
    fontSize: 16,
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});