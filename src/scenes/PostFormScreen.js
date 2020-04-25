import React, { useEffect } from 'react'

import { Container, Content, Spinner } from 'native-base';
import PostForm from "../components/PostForm";
import { bindActionCreators } from "redux";
import * as PostActions from "../actions/posts";
import { connect } from "react-redux";

const PostFormScreen = ({ route, email, openedPost, isLoadingPosts, loadPost, savePost }) => {
  const { postId } = route.params;
  useEffect(() => {
    if (postId) {
      loadPost(postId);
    }
  }, [postId]);

  if (isLoadingPosts) {
    return (
      <Spinner/>
    );
  }

  if (openedPost && openedPost.author !== email) {
    alert("You don't have permissions to update this post")
    return null;
  }

  return (
    <Container>
      <Content>
        <PostForm testID="postForm" scrollable post={openedPost || {}} savePost={savePost}/>
      </Content>
    </Container>
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
)(PostFormScreen);
