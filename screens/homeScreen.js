import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const { token, userID } = route.params;
  const handleCreateTeam = () => {
    const token = route.params.token;
    navigation.navigate('CreateTeam', { token,  userID });
  };
  return (
    <View>
      <Text>Welcome home!</Text>
      <Text>Your token is {route.params.token}</Text>
      <Button title="Create Team" onPress={handleCreateTeam} />
    </View>
  );
};

export default HomeScreen;
