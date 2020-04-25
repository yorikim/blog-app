import React from 'react';
import { Button, Icon } from 'native-base';
import { Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const RemoveButton = ({ postId, removePost, testID }) => {
  const navigation = useNavigation();

  return (
    <Button
      transparent
      testID={testID}
      onPress={() => {
        Alert.alert(
          'Are you sure?',
          null,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => removePost(navigation, postId) },
          ]
        );
      }}
    >
      <Icon name="trash" size={30} color="#4F8EF7"/>
    </Button>
  );
}

export default RemoveButton;
