import { requestDelete, requestGet, requestPatch, requestPost } from './utils';
import { fetchPost, fetchPosts, savePosts, deletePost  } from "../constants/actions";

export const loadPosts = () => async dispatch => {
  await dispatch(requestGet(fetchPosts, 'posts'));
};

export const loadPost = id => async dispatch => {
  await dispatch(requestGet(fetchPost, `posts/${id}`));
};

export const savePost = (navigation, id, title, body, cover) => async dispatch => {
  const params = buildPostFormData(title, body, cover);

  if (id) {
    await dispatch(requestPatch(savePosts, `posts/${id}`, params));
  } else {
    await dispatch(requestPost(savePosts, `posts`, params));
  }

  navigation.navigate("Home")
};

export const removePost = (navigation, id) => async dispatch => {
  await dispatch(requestDelete(deletePost, `posts/${id}`));
  await dispatch(loadPosts());

  navigation.navigate("Home");
};

const buildPostFormData = (title, body, cover) => {
  const params = new FormData();

  params.append('post[title]', title);
  params.append('post[body]', body);

  if (cover) {
    params.append('post[cover]', {
      uri: cover.replace('file://', ''),
      type: 'image/jpeg',
      name: `cover.jpg`
    });
  }

  return params;
};
