import React, { useState } from 'react';
import { Button, TextInput, View, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Validation Error', 'Please enter username and password');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      setLoading(false);
      // Navigate to home screen after successful login.
      navigation.replace('Home', { token: response.data.token });
    } catch (error) {
      setLoading(false);
      Alert.alert('Login failed', error.message);
    }
  };

  return (
    <View>
      <TextInput
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Username"
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Log in" onPress={handleLogin} disabled={loading} />
      {loading && <ActivityIndicator />}
    </View>
  );
};

export default LoginScreen;
