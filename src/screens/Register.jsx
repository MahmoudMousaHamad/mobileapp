import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Layout, Button } from '@ui-kitten/components';
import { useForm } from "react-hook-form";

import { register as registerUser } from "../actions/auth";

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const { isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleRegister = (data) => {
    const {email, password} = data;

    dispatch(registerUser(email, password))
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
        {...register("password", {required: true, minLength: 5})} />

      <Input placeholder="Password" type="password"
        {...register("password_repeat", {
          validate: value =>
            value === password.current || "The passwords do not match"
        })} />

      <Button type="submit" onPress={() => handleSubmit(handleLogin)}>Login</Button>

      {errors.email && <p>Please check your email</p>}
      {errors.password && <p>Please check your password</p>}
    </Layout>
  );
};

export default Register;