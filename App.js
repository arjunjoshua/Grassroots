import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screens/loginScreen';
import HomeScreen from './screens/homeScreen';
import RegisterScreen from './screens/registerScreen';
import CreateTeam from './screens/createTeam';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer() {
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
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="CreateTeam" component={CreateTeam} />
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Log In' }} />
        <Stack.Screen name="Home" component={HomeDrawer} options={{ title: 'Home' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

