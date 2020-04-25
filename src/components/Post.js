import React from 'react';
import moment from 'moment';
import { Image, StyleSheet } from 'react-native';

import { Body, Card, CardItem, Left, Right, Text } from 'native-base';
import ShareButton from "./ShareButton";
import EditButton from "./EditButton";
import RemoveButton from "./RemoveButton";
import withTestID from "./tests/withTestID";

const styles = StyleSheet.create({
  cover: { height: 200, width: null, flex: 1 }
});

const Post = ({ id, title, body, cover, author, created_at, currentEmail, removePost }) => {
  return (
    <Card>
      <CardItem>
        <Left>
          <Body>
            <Text testID={`title-${title}`}>{title}</Text>
            <Text note>{author}</Text>
            <Text note>{moment(created_at).fromNow()}</Text>
          </Body>
        </Left>
        <Right>
          <ShareButton postId={id}/>
          {currentEmail === author && (
            <>
              <EditButton testID={`edit-${title}`} postId={id}/>
              <RemoveButton testID={`remove-${title}`} postId={id} removePost={removePost}/>
            </>
          )}
        </Right>
      </CardItem>

      {cover && (
        <CardItem cardBody>
          <Image source={{ uri: cover }} style={styles.cover}/>
        </CardItem>
      )}

      <CardItem bordered>
        <Body>
          <Text testID={`body-${title}`}>
            {body}
          </Text>
        </Body>
      </CardItem>
    </Card>
  );
};

export default withTestID(Post);
