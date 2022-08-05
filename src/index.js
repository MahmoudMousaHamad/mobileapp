import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as Updates from 'expo-updates';
import 'expo-asset';

import {
    Login,
    Register,
    Profile,
    Question,
    Dashboard
} from "./screens/index";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

// Updates.fetchUpdateAsync().then((result) => {
//   console.log("Update fetch result", result);
//   Updates.reloadAsync().then(console.log).catch(console.log);

// }).catch(console.log);

const App = () => {
  const auth = useSelector((state) => state.auth);
  const { question } = useSelector((state) => state.data);

  return (
    <NavigationContainer>
      <Tab.Navigator>
              {auth?.isLoggedIn ? (
                <>
                  <Tab.Screen name="Question" component={Question} options={{
                    tabBarLabel: 'Question',
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name="questioncircle" color={color} size={size} />
                    ),
                    [question && "tabBarBadge"]: "1",
                  }} />
                  <Tab.Screen name="Dashboard" component={Dashboard} options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
                    ),
                  }} />
                  <Tab.Screen name="Profile" component={Profile} options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                  }} />
                </>
              ) : (
                <>
                  <Tab.Screen name="Login" component={Login} options={{
                    tabBarLabel: 'Login',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="login" color={color} size={size} />
                    ),
                  }} />
                  <Tab.Screen name="Register" component={Register} options={{
                    tabBarLabel: 'Register',
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name="adduser" color={color} size={size} />
                    ),
                  }} />
                </>
              )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;