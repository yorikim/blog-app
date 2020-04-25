import React from 'react'
import { Content } from "native-base";
import { RefreshControl } from 'react-native';
import Post from "./Post";
import withTestID from "./tests/withTestID";

const PostList = ({ currentEmail, posts, isLoading, loadPosts, removePost }) => {
  return (
    <Content refreshControl={
      <RefreshControl
        refreshing={isLoading}
        onRefresh={loadPosts}
      />
    }>
      {posts.map((post, index) =>
        <Post
          testID={post.title}
          key={index}
          currentEmail={currentEmail}
          removePost={removePost}
          {...post}
        />
      )}
    </Content>
  )
};

export default withTestID(PostList);
