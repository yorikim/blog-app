import { fetchToken } from "../constants/actions";

const initialState = {
  email: null,
  token: null,
  isLoadingToken: false,
};

export default function tokensReducer(state = initialState, action) {
  switch (action.type) {
    case fetchToken.TYPE:
      return { ...state, isLoadingToken: true };
    case fetchToken.success.TYPE:
      return { ...state, token: action.payload.token, email: action.payload.email, isLoadingToken: false };
    default:
      return state;
  }
}
