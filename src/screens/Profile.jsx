import React from "react";
import { useSelector } from "react-redux";
import { Text } from '@ui-kitten/components';
import { getUser } from "../utils";

const Profile = ( { navigation } ) => {
  const user = getUser(useSelector((state) => state.auth));

  if (!user) {
    navigation.navigate('Login');
  }

  return (
    <>
      <Text>Email: {user.email}</Text>
      <Text>ID: {user.id}</Text>
      <Text>Token: {user.token?.substring(0, 20)} ...{" "}
        {user.token?.substr(user.token.length - 20)} </Text>
    </>
  );
};
export default Profile;