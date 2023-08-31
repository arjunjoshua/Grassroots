import React from 'react';
import 'react-native-get-random-values';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import LoginScreen from './screens/loginScreen';
import HomeScreen from './screens/homeScreen';
import RegisterScreen from './screens/registerScreen';
import CreateTeam from './screens/createTeam';
import CreateMatchPost from './screens/createMatchPost';
import OpenMatchesScreen from './screens/openMatches';
import { CommonActions } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

//render the side drawer with navigation options
function HomeDrawer({route}) {
  const { token, userID } = route.params;
  return (
    <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={(props) => (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <Button 
            title="Logout" 
            onPress={() => {
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    })
                );
            }} 
        />
      </DrawerContentScrollView>
    )}
  >
      <Drawer.Screen 
      name="HomeDrawer" component={HomeScreen} 
      initialParams={{ token, userID}} options={{ title: 'Home'}} />
      <Drawer.Screen name="CreateTeam" component={CreateTeam} 
      initialParams={{ token, userID}} options={{ title: 'Create a new team' }}/>
      <Drawer.Screen name="CreateMatchPost" component={CreateMatchPost} 
      initialParams={{ token, userID}} options={{ title: 'Create post for a match' }}/>
      <Drawer.Screen name="AvailableMatches" component={OpenMatchesScreen} 
      initialParams={{userID}} options={{ title: 'Available Matches' }}/>
    </Drawer.Navigator>
  );
}

//main navigation container, which calls the homeDrawer once logged in
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Log In', headerLeft: null }} />
        <Stack.Screen name="Home" component={HomeDrawer} options={{ title: 'Home', headerShown: false }}  />
        <Stack.Screen name="Register" component={RegisterScreen} 
        options={{ title: 'Register', headerLeft: null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

