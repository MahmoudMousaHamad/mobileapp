import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Layout, Button } from '@ui-kitten/components';
import { useForm } from "react-hook-form";

import { login } from "../actions/auth";

const Login = ({ navigation }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogin = (data) => {
    const {email, password} = data;

    dispatch(login(email, password))
      .then(() => {
        console.log("Login successful!");
      })
      .catch(() => {
        console.log("Login failed.")
      });
  };

  if (isLoggedIn) {
    navigation.navigate('Profile');
    return;
  }

  return (
    <Layout>
      <Input placeholder="Email" type="email"
        {...register("email", {
          required: true,
          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
        })} />
      <Input placeholder="Password" type="password"
        {...register("password", {required: true})} />

      <Button type="submit" onPress={() => handleSubmit(handleLogin)}>Login</Button>

      {errors.email && <p>Please check the email</p>}
      {errors.password && <p>Please check the password</p>}
    </Layout>
  );
};
export default Login;