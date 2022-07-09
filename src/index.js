import 'expo-asset';
import * as Updates from 'expo-updates';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
    Login,
    Register,
    Profile,
    Question
} from "./screens/index";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

// Updates.fetchUpdateAsync().then((result) => {
//   console.log("Update fetch result", result);
//   Updates.reloadAsync().then(console.log).catch(console.log);

// }).catch(console.log);

const App = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Tab.Navigator>
              {auth?.isLoggedIn ? (
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