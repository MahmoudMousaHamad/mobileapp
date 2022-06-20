import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

import {
    Login,
    Register,
    Profile,
    Home
} from "./screens/index";
import { logout } from "./actions/auth";
  
const Stack = createNativeStackNavigator();

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  return (
      <NavigationContainer>
              {currentUser ? (
                <>
                    <Button
                        title="Profile"
                        onPress={() => navigation.navigate('Profile')}
                    />
                    <Button
                        title="Logout"
                        onPress={() => logOut() && navigation.navigate('Login')}
                    />
                </>
              ) : (
                <>
                    <Button
                        title="Login"
                        onPress={() => navigation.navigate('Login')}
                    />
                    <Button
                        title="Register"
                        onPress={() => navigation.navigate('Register')}
                    />
                </>
              )}
            <Stack.Navigator>
                <Stack.Screen name="Home" component={<Home/>} />
                <Stack.Screen name="Login" component={<Login/>} />
                <Stack.Screen name="Register" component={<Register/>} />
                <Stack.Screen name="Profile" component={<Profile/>} />
            </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;