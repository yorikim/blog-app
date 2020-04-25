import { fetchPost, fetchPosts } from "../constants/actions";

const initialState = {
  isLoadingPosts: false,
  openedPost: null,
  posts: []
};

export default function CommercialsReducer(state = initialState, action) {
  switch (action.type) {
    case fetchPosts.TYPE:
    case fetchPost.TYPE:
      return { ...state, openedPost: null, isLoadingPosts: true }
    case fetchPosts.success.TYPE:
      return { ...state, posts: action.payload, isLoadingPosts: false };
    case fetchPost.success.TYPE:
      return { ...state, openedPost: action.payload, isLoadingPosts: false };
    case fetchPosts.failure.TYPE:
      return { ...state, isLoadingPosts: false };
    default:
      return state;
  }
}
