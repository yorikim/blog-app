import React from 'react';
import { Button, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const EditButton = ({ postId, testID }) => {
  const navigation = useNavigation();

  return (
    <Button
      transparent
      testID={testID}
      onPress={() => navigation.navigate("PostForm", { postId })}
    >
      <Icon name="create" size={30} color="#4F8EF7"/>
    </Button>
  );
}

export default EditButton;
