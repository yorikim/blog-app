import React from 'react';
import { Button, Form, Input, Item, Label, Text } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';

const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 40
  }
});

const AuthForm = ({ signUp, signIn, isLoading }) => {
  const { control, handleSubmit, errors } = useForm();

  const onSignUp = ({ email, password }) => signUp(email, password);
  const onSignIn = ({ email, password }) => signIn(email, password);

  return (
    <Form disabled={isLoading}>
      <Item
        stackedLabel
        error={!!errors.email}
      >
        <Label>Email</Label>
        <Controller
          testID="email"
          name="email"
          autoCapitalize="none"
          keyboardType="email-address"
          as={Input}
          control={control}
          onChange={args => args[0].nativeEvent.text}
          rules={{
            required: true,
            pattern: EMAIL_PATTERN
          }}
          defaultValue=""
        />
      </Item>

      <Item
        stackedLabel
        error={!!errors.password}
      >
        <Label>Password</Label>
        <Controller
          secureTextEntry
          testID="password"
          name="password"
          as={Input}
          control={control}
          onChange={args => args[0].nativeEvent.text}
          rules={{ required: true }}
          defaultValue=""
        />
      </Item>

      <View style={styles.buttonContainer}>
        <Button
          full
          testID="signIn"
          style={{ marginTop: 40 }}
          onPress={handleSubmit(onSignIn)}
        >
          <Text>Login</Text>
        </Button>

        <Button
          full
          warning
          testID="signUp"
          onPress={handleSubmit(onSignUp)}
        >
          <Text>Sign Up</Text>
        </Button>
      </View>
    </Form>
  )
}

export default AuthForm;
