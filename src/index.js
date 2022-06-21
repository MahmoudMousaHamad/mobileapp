import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
    Login,
    Register,
    Profile,
    Question
} from "./screens/index";
import { logout } from "./actions/auth";
import { getUser } from './utils';
  
const Tab = createBottomTabNavigator();

const App = () => {
  const user = getUser(useSelector((state) => state.auth));
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
              {user ? (
                <>
                  <Tab.Screen name="Question" component={Question} />
                  <Tab.Screen name="Profile" component={Profile} />
                </>
              ) : (
                <>
                  <Tab.Screen name="Login" component={Login} />
                  <Tab.Screen name="Register" component={Register} />
                </>
              )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;