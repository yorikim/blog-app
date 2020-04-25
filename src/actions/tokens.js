import { fetchToken } from "../constants/actions";
import { AsyncStorage } from "react-native";

export const getToken = () => async dispatch => {
  const token = await AsyncStorage.getItem('token');
  const email = await AsyncStorage.getItem('email');
  dispatch(fetchToken.success({ token, email }));
};

export const saveToken = (token, email) => async dispatch => {
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('email', email);
  dispatch(fetchToken.success({ token, email }));
};

export const removeToken = () => async dispatch => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('email');
  dispatch(fetchToken.success({ token: null, email: null }));
};
