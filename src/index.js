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

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  
  return (
    <NavigationContainer>
      <Tab.Navigator>
              {isLoggedIn ? (
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