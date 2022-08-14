import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Layout, Button, Text } from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";

import { register } from "../actions/auth";
import { ScrollView } from "react-native";

const controls = [
	{ label: "Email", name: "email", placeholder: "your@email.com", },
	{ label: "First Name", name: "firstName", placeholder: "Your first name", },
	{ label: "Last Name", name: "lastName", placeholder: "Your last name", },
	{ label: "Password", name: "password", placeholder: "Password", password: true },
];

const Register = ({ navigation }) => {
	const { control, handleSubmit, formState: { errors }, watch } = useForm();
	const password = useRef({});
	password.current = watch("password", "");

	const { isLoggedIn } = useSelector(state => state.auth);
	const { message } = useSelector(state => state.message);
	const dispatch = useDispatch();

	const handleRegister = (data) => {
		const {email, password, firstName, lastName} = data;

		dispatch(register(email, firstName, lastName, password))
			.then(() => {
				console.log("Registration successful!");
			})
			.catch(() => {
				console.log(message);
			});
	};

	if (isLoggedIn) {
		navigation.navigate("Profile");
		return;
	}
  
	return (
		<ScrollView contentContainerStyle={{ 
			display: "flex",
			alignItems: "center",
			justifyContent: "center", 
			padding: 50,
			backgroundColor: "white" 
		}}>
			{controls.map((c) => {
				return (
					<Layout style={{ width: "100%", marginBottom: 10 }} key={c.name}>
						<Controller
							control={control}
							rules={{ required: true, ...c?.rules }}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input 
									style={{ marginBottom: 10 }}
									label={c.label}
									placeholder={c.placeholder}
									onBlur={onBlur}
									onChangeText={onChange}
									secureTextEntry={c.password}
									value={value} />
							)}
							name={c.name}
						/>
						{errors[c.name] && <Text>Please check your {c.label}</Text>}
					</Layout>
				);
			})}


			<Controller
				control={control}
				rules={{ 
					validate: value =>
						value === password.current || "The passwords do not match"
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<Input 
						style={{ marginBottom: 10 }}
						label="Repeat Password"
						secureTextEntry={true}
						placeholder="Repeat password"
						type="password"
						onBlur={onBlur}
						onChangeText={onChange}
						value={value} />
				)}
				name="repeatPassword"
			/>
			{errors.password && <Text>Please check your password</Text>}
			{errors.repeatPassword && <Text>{errors.repeatPassword.message}</Text>}

			{ /*
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              style={{ marginBottom: 10 }}
              label="Email"
              placeholder="your@email.com"
              type="email" 
              onBlur={onBlur}
              onChangeText={onChange}
              value={value} />
          )}
          name="email"
        />
        {errors.email && <Text>Please check your email</Text>}
        
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              style={{ marginBottom: 10 }}
              label="First Name"
              placeholder="Your first name..."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value} />
          )}
          name="firstName"
        />
        {errors.firstName && <Text>Please check your first name</Text>}
        
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              style={{ marginBottom: 10 }}
              label="First Name"
              placeholder="Your first name..."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value} />
          )}
          name="firstName"
        />
        {errors.firstName && <Text>Please check your first name</Text>}
        
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              style={{ marginBottom: 10 }}
              label="Password"
              placeholder="Password"
              type="password" 
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry={true}
              value={value} />
          )}
          name="password"
        />
        */
			}

			<Button type="submit" onPress={handleSubmit(handleRegister)}>Register</Button>
		</ScrollView>
	);
};

export default Register;