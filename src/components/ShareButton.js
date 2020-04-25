import React from 'react';
import { Button, Icon } from 'native-base';
import { Linking } from "expo";
import { Share } from 'react-native';

const sharePost = async postId => {
  try {
    const message = Linking.makeUrl(`/posts/${postId}`);
    await Share.share({ message });
  } catch (error) {
    alert(error.message);
  }
}

const ShareButton = ({ postId }) => {
  return (
    <Button transparent onPress={() => sharePost(postId)}>
      <Icon name="share" size={30} color="#4F8EF7"/>
    </Button>
  );
}

export default ShareButton;
