import React from 'react';
import { Button, Form, Input, Item, Label, Text } from 'native-base';

const Profile = ({ signOut, email }) => {
  return (
    <Form disabled>
      <Item stackedLabel>
        <Label>Email</Label>
        <Input
          disabled
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
        />
      </Item>

      <Button
        testID="signOut"
        danger
        full
        style={{ marginTop: 40 }}
        onPress={() => signOut()}
      >
        <Text>Logout</Text>
      </Button>
    </Form>
  )
}

export default Profile;
