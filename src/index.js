import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from "react";

import {
    Login,
    Register,
    Profile,
    Question
} from "./screens/index";
import secureStore from "./secureStore";
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const App = () => {
  const [user, setUser] = useState();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    async function getUser() {
      const user = await secureStore.get('user');
      console.log(user);
      setUser(user);
    }
    getUser();
  }, []);

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