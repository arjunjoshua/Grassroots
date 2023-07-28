import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import LoginScreen from './screens/loginScreen';
import HomeScreen from './screens/homeScreen';
import RegisterScreen from './screens/registerScreen';
import CreateTeam from './screens/createTeam';
import CreateMatchPost from './screens/createMatchPost';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer({route}) {
  const { token, userID } = route.params;
  return (
    <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={(props) => (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <Button title="Logout" onPress={() => props.navigation.replace('Login')} />
      </DrawerContentScrollView>
    )}
  >
      <Drawer.Screen name="HomeDrawer" component={HomeScreen} initialParams={{ token, userID}} options={{ title: 'Home'}} />
      <Drawer.Screen name="CreateTeam" component={CreateTeam} initialParams={{ token, userID}} options={{ title: 'Create a new team' }}/>
      <Drawer.Screen name="CreateMatchPost" component={CreateMatchPost} initialParams={{ token, userID}} options={{ title: 'Create post for a match' }}/>
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Log In', headerLeft: null }} />
        <Stack.Screen name="Home" component={HomeDrawer} options={{ title: 'Home', headerShown: false }}  />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

