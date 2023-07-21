import React from 'react';
import { View, Text } from 'react-native';

const HomeScreen = ({ route }) => {
  return (
    <View>
      <Text>Welcome home!</Text>
      <Text>Your token is {route.params.token}</Text>
    </View>
  );
};

export default HomeScreen;
