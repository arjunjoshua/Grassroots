import React, { useState } from 'react';
import { Button, Text,   TextInput, View, Alert, ActivityIndicator } from 'react-native';
import { styles } from '../components/styles';
//import { CustomButton } from '../components/customButton';
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
    .post(`${IP_ADDRESS}:5000/api/auth/login`, user, { timeout: 15000 })
    .then((response) => {
      setLoading(false);
      // navigate to home with token and userID as params
      navigation.navigate('Home', { token: response.data.token, userID: response.data.userId });
    })
    .catch((error) => {
      setLoading(false);
      if (error.code === 'ECONNABORTED') {
        alert('Request timed out! Please try again.');
      } else if (error.response && error.response.data.message === 'Invalid username or password') {
        alert('Invalid username or password');
      } else {
        console.error('There was an error!', error);
        alert('Something went wrong! Please try again later.');
      }
    });
  };
  

  return (
    <View style={styles.containerCreateTeam}>
      <TextInput
        value={username}
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
        placeholder="Username"
      />
      <TextInput
        value={password}
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Log in" onPress={handleLogin} disabled={loading} style={styles.button} />
      {loading && <ActivityIndicator />}
      <Text style={{...styles.registerText, marginBottom: 10}}>{`Don't have an account? `}
        <Text 
          style={styles.hyperlink} 
          onPress={() => navigation.navigate('Register')}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
