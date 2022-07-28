import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Layout, Button, Text } from '@ui-kitten/components';
import { useForm, Controller } from "react-hook-form";

import { register } from "../actions/auth";

const Register = () => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const handleRegister = (data) => {
    const {email, password} = data;

    dispatch(register(email, password))
      .then(() => {
        console.log("Registration successful!");
      })
      .catch(() => {
        console.log(message);
      });
  };

  if (isLoggedIn) {
    navigation.navigate('Profile');
    return;
  }
  
  return (
    <Layout style={{ 
      display: "flex",
      alignItems: "center",
      justifyContent: "center", 
      padding: 50, 
      height: "100%" 
    }}>
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
          name="repeat_password"
        />

        {errors.password && <Text>Please check your password</Text>}
        {errors.repeat_password && <Text>{errors.repeat_password.message}</Text>}


      <Button type="submit" onPress={handleSubmit(handleRegister)}>Register</Button>
    </Layout>
  );
};

export default Register;