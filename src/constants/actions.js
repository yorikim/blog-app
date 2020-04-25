import { makeAsyncActionCreator } from "redux-toolbelt";

export const fetchPosts = makeAsyncActionCreator('FETCH_POSTS');
export const fetchPost = makeAsyncActionCreator('FETCH_POST');
export const deletePost = makeAsyncActionCreator('DELETE_POST');
export const savePosts = makeAsyncActionCreator('SAVE_POST');
export const createUser = makeAsyncActionCreator('CREATE_USER');
export const createSession = makeAsyncActionCreator('CREATE_SESSION');
export const removeSession = makeAsyncActionCreator('REMOVE_SESSION');
export const fetchCurrentUser = makeAsyncActionCreator('FETCH_CURRENT_USER');
export const fetchToken = makeAsyncActionCreator('FETCH_TOKEN');
