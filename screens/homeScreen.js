import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const { userID } = route.params;
  const handleCreateTeam = () => {
    const token = route.params.token;
    navigation.navigate('CreateTeam', { userID });
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
