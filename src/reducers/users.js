import { createSession, createUser, fetchCurrentUser } from "../constants/actions";

const initialState = {
  token: null,
  isLoading: false,
  email: null,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case createUser.TYPE:
      return { ...state, isLoading: true };
    case createUser.success.TYPE:
      return { ...state, email: action.payload.email, isLoading: false };
    case fetchCurrentUser.TYPE:
    case createSession.TYPE:
      return { ...state, email: null, isLoading: true };
    case fetchCurrentUser.success.TYPE:
    case createSession.success.TYPE:
      return { ...state, email: action.payload.email, isLoading: false };
    default:
      return state;
  }
}
