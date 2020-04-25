import { createSession, createUser, fetchCurrentUser, removeSession } from "../constants/actions";
import { requestDelete, requestGet, requestPost } from "./utils";
import { removeToken, saveToken } from "./tokens";

export const signUp = (email, password) => async dispatch => {
  const body = { user: { email, password } };
  const response = await dispatch(requestPost(createUser, 'users', body));

  if (response) {
    await dispatch(saveToken(response.token, response.email));
  }
};

export const signIn = (email, password) => async dispatch => {
  const body = { user: { email, password } };
  const response = await dispatch(requestPost(createSession, 'users/sign_in', body));

  if (response) {
    await dispatch(saveToken(response.token, response.email));
  }
};

export const signOut = () => async dispatch => {
  await dispatch(requestDelete(removeSession, 'users/sign_out'));
  await dispatch(removeToken());
};

export const getCurrentUser = () => async dispatch => {
  await dispatch(requestGet(fetchCurrentUser, 'users/me'));
};
