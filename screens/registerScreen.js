import React, { useState } from 'react';
import { Button, TextInput, View, Alert, ActivityIndicator } from 'react-native';
import { styles } from '../components/styles';
import axios from 'axios';
import { IP_ADDRESS, emailRegex } from '../constants/constants';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (username.trim() === '' || password.trim() === '' || email.trim() === '') {
      Alert.alert('Validation Error', 'All fields are required');
      return false;
    }

    if (!emailRegex.test(email.trim())) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const user = {
      username,
      password,
      email,
    };

    axios
      .post(`${IP_ADDRESS}:5000/api/register`, user)
      .then((response) => {
        setLoading(false);
        if (response.data.status === 'success') {
          Alert.alert('Success', 'Registered successfully');
          navigation.navigate('Home', {
          screen: 'CreateTeam',
          params: {token: response.data.token, userID: response.data.userID }
        });
        } else {
          Alert.alert('Error', 'Something went wrong!');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('There was an error!', error);
        Alert.alert('Error', 'Something went wrong! Please try again later.');
      });
  };

  return (
    <View>
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
      <TextInput
        value={email}
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
      />
      <Button title="Register" onPress={handleRegister} disabled={loading} style={styles.button} />
      {loading && <ActivityIndicator />}
    </View>
  );
};

export default RegisterScreen;
