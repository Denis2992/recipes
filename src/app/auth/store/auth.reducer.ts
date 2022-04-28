import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string,
  loading: boolean
}

const initialState: State = {
  user: null,
  authError: null
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  console.log(state);
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user: user
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}
