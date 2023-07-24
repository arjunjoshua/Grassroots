import React, { useState } from 'react';
import { Button, TextInput, View, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { IP_ADDRESS } from '../constants/constants';

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
    setLoading(true);

    const user = {
      username: username,
      password: password,
    };

    axios
      .post(`${IP_ADDRESS}:5000/api/auth/login`, user)
      .then((response) => {
        setLoading(false);
        if (response.data.status === 'success') {
          // save token, navigate to home or do something
          alert('Logged in successfully');
          navigation.navigate('Home', { token: response.data.token, userId: response.data.userId });
        } else {
          alert('Invalid username or password');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('There was an error!', error);
        alert('Something went wrong! Please try again later.');
      });
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
      <Button
        title="Don't have an account? Sign up"
        onPress={() => navigation.navigate('Register')} 
      />
    </View>
  );
};

export default LoginScreen;
