import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Layout, Button, Text } from '@ui-kitten/components';
import { useForm, Controller } from "react-hook-form";

import { login } from "../actions/auth";

const Login = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { isLoggedIn } = useSelector(state => state.auth);
  const { message} = useSelector(state => state.message);

  const dispatch = useDispatch();

  const handleLogin = (data) => {
    const {email, password} = data;
    dispatch(login(email, password))
      .then(() => {
        console.log("Login successful!");
      })
      .catch((e) => {
        console.log("Login failed.");
        console.log(message);
      });
  };

  return (
    <Layout>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              placeholder="Email"
              type="email" 
              onBlur={onBlur}
              onChangeText={onChange}
              value={value} />
          )}
          name="email"
        />
        
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              placeholder="Password"
              type="password" 
              onBlur={onBlur}
              onChangeText={onChange}
              value={value} />
          )}
          name="password"
        />

        <Button type="submit" onPress={handleSubmit(handleLogin)}>Login</Button>

        {errors.email && <Text>Please check your email</Text>}
        {errors.password && <Text>Please check your password</Text>}
    </Layout>
  );
};
export default Login;