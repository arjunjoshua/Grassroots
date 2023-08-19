import React, { useState } from 'react';
import { Button, Text,   TextInput, View, Alert, ActivityIndicator } from 'react-native';
import { styles } from '../styles/styles';
import axios from 'axios';
import { IP_ADDRESS } from '../constants/constants';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Validation Error', 'Please enter username and password');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    setLoading(true);

    const user = {
      email: email,
      password: password,
    };

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    axios
    .post(`${IP_ADDRESS}/api/login`, user, { timeout: 15000 })
    .then((response) => {
      setLoading(false);
      // navigate to home with token and userID as params
      navigation.navigate('Home', { token: response.data.token, userID: response.data.userId });
    })
    .catch((error) => {
      setLoading(false);
      if (error.code === 'ECONNABORTED') {
        alert('Request timed out! Please try again.');
      } else if (error.response && error.response.data.message === 'Invalid email or password') {
        alert('Invalid email or password');
      } else {
        console.error('There was an error!', error);
        alert('Something went wrong! Please try again later.');
      }
    });
  };
  

  return (
    <View style={styles.containerCreateTeam}>
      <TextInput
        value={email}
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
      />
      <TextInput
        value={password}
        style={styles.inputEmail} //using inputEmail just to ensure the spacing witht the button is the same as the register screen
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
