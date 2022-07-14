import React from "react";
import { Text } from '@ui-kitten/components';
import { Button } from "react-native";
import { logout } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";

const Profile = ( { navigation } ) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const logoutUser = async () => {
    dispatch(await logout());
  };

  return (
    <>
      <Text>Email: {user.email}</Text>
      <Text>ID: {user.id}</Text>
      <Text>
        Token: {user.token?.substring(0, 20)} ...{" "}
        {user.token?.substr(user.token.length - 20)} 
      </Text>
      <Button title="Logout" onPress={logoutUser}/>
    </>
  );
};
export default Profile;