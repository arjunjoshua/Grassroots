import React, { useState } from 'react';
import { Button, TextInput, Text, View, Alert, ActivityIndicator } from 'react-native';
import { styles } from '../styles/styles';
import axios from 'axios';
import { IP_ADDRESS } from '../constants/constants';
import { validateForm } from '../utils/validateRegister';


const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!validateForm(username, password, email, phoneNumber)) {
      return;
    }

    setLoading(true);

    const user = {
      username,
      password,
      email,
      phoneNumber,
    };

    //API call to register user
    axios
      .post(`${IP_ADDRESS}/api/register`, user)
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
        placeholder="Full Name"
      />
      <TextInput
        value={password}
        style={styles.inputPassword}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry
      />
      <Text style={styles.passwordInstruction}>'Minimum: 8 characters with 1 special character'</Text>
      <TextInput
        value={email}
        style={styles.inputEmail}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
      />
      <TextInput
        value={phoneNumber}
        style={styles.input}
        onChangeText={(text) => setPhoneNumber(text)}
        placeholder="Phone Number (Your phone number will only be shared with an opposing coach once a game is confirmed.)"
      />
      <Button title="Register" onPress={handleRegister} disabled={loading} style={styles.button} />
      {loading && <ActivityIndicator />}
    </View>
  );
};

export default RegisterScreen;
