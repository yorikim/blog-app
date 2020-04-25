import React, { useCallback } from 'react'
import PostList from "../components/PostList";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as PostActions from "../actions/posts";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ email, isLoadingPosts, loadPosts, posts, removePost }) => {
  useFocusEffect(
    useCallback(() => {
      loadPosts();
    }, [])
  );

  return (
    <PostList
      testID="postList"
      currentEmail={email}
      posts={posts}
      isLoading={isLoadingPosts}
      loadPosts={loadPosts}
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
)(HomeScreen);
