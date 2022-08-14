import React from "react";
import { Button, Layout, Text } from "@ui-kitten/components";
import { logout } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const logoutUser = async () => {
		dispatch(await logout());
	};

	return (
		<Layout style={{ 
			display: "flex",
			justifyContent: "center", 
			padding: 50, 
			height: "100%" 
		}}>
			<Text style={{ marginBottom: 10 }}><Text style={{ fontWeight: "bold" }}>Email:</Text> {user.email}</Text>
			<Button onPress={logoutUser}>Logout</Button>
		</Layout>
	);
};
export default Profile;