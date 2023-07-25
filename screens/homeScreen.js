import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const { token, userID } = route.params;
  const handleCreateTeam = () => {
    const token = route.params.token;
    navigation.navigate('CreateTeam', { token,  userID });
  };

  const handleLogout = () => {
    navigation.navigate('Login');
    Alert.alert('Logged out successfully');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome home!</Text>
      <Text style={styles.tokenText}>Your token is {route.params.token}</Text>
      {/* <Button title="Create Team" onPress={handleCreateTeam} style={styles.button} />
      <Button title="Logout" onPress={() => navigation.navigate('Login')} style={styles.button} /> */}
    </View>
  );
};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: 16,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    tokenText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
    },
    button: {
      marginTop: 10,
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#2196f3',
      borderRadius: 5,
    },
  });

export default HomeScreen;
