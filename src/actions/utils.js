import { API_URL } from '../constants/settings';
import { AsyncStorage } from 'react-native';
import { removeToken } from "./tokens";

const getParams = async (method, body) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer Token ${token}`;
  }

  const params = {
    method,
    headers
  };

  if (['POST', 'PATCH'].includes(method)) {
    params.body = body.constructor.name === 'Object' ? JSON.stringify(body) : body;
  }

  return params;
}

const getJsonResponse = async response => {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

const request = (action, url, method, body) => async dispatch => {
  dispatch(action());

  try {
    const params = await getParams(method, body);
    const response = await fetch(`${API_URL}/${url}`, params);
    const json = await getJsonResponse(response);

    if (response.ok) {
      dispatch(action.success(json));
      return json;
    }

    if (response.status === 401) {
      await dispatch(removeToken());
      return;
    }

    const { error } = json;
    dispatch(action.failure(error));
    alert(error);
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
};

export const requestGet = (action, url) => dispatch => dispatch(request(action, url, 'GET', null));
export const requestPost = (action, url, body) => dispatch => dispatch(request(action, url, 'POST', body));
export const requestPatch = (action, url, body) => dispatch => dispatch(request(action, url, 'PATCH', body));
export const requestDelete = (action, url) => dispatch => dispatch(request(action, url, 'DELETE', null));
