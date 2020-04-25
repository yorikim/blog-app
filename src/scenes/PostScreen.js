import React, { useCallback } from 'react'
import PostList from "../components/PostList";
import { bindActionCreators } from "redux";
import * as PostActions from "../actions/posts";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const PostScreen = ({ route, email, loadPost, isLoadingPosts, openedPost, removePost }) => {
  const { postId } = route.params;

  useFocusEffect(
    useCallback(() => {
      loadPost(postId);
    }, [postId])
  );

  const posts = openedPost ? [openedPost] : []
  return (
    <PostList
      currentEmail={email}
      posts={posts}
      isLoading={isLoadingPosts}
      removePost={removePost}
    />
  )
}

const mapStateToProps = state => ({
  ...state.posts,
  ...state.tokens,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...PostActions
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostScreen);
