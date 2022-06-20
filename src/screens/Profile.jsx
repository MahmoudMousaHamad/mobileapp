import React from "react";
import { useSelector } from "react-redux";
import { Text } from '@ui-kitten/components';

const Profile = ( { navigation } ) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  
  if (!currentUser) {
    navigation.navigate('Login');
    return;
  }

  return (
    <>
      <Text>Email: {currentUser.email}</Text>
      <Text>ID: {currentUser.id}</Text>
      <Text>Token: {currentUser.token?.substring(0, 20)} ...{" "}
        {currentUser.token?.substr(currentUser.token.length - 20)} </Text>
    </>
  );
};
export default Profile;