import { createSlice } from '@reduxjs/toolkit';

import { getLoginUser, loginAPI, logoutAPI } from '@/redux/services/auth.api';
import { deepClone } from '@/utils/helpers';

export interface RoleObject {
  id: number;
  name: 'Admin' | 'Host' | 'Player';
}

export interface StatusObject {
  id: number;
  name: 'Active' | 'Inactive';
}

export interface UserObject {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: StatusObject;
  createdAt: Date;
  updatedAt: Date;
  role?: RoleObject;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginUserPayload {
  Authorization: string;
}

export interface LoginDataResponse {
  token?: string;
  user?: UserObject;
}

export interface LoginSuccessResponse {
  data: LoginDataResponse;
}

export interface LoginState {
  data?: LoginDataResponse | any;
  isLoading?: boolean;
  error?: string | null;
}

const loginInitialState: LoginState = {
  data: {},
  error: null,
  isLoading: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: deepClone(loginInitialState),
  reducers: {
    loginStarted: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    loginSuccess: (state, action) => {
      return {
        ...state,
        ...{
          data: action.payload,
          error: null,
          isLoading: false,
        },
      };
    },
    loginFail: (state, action) => {
      return {
        ...state,
        ...{ error: action.payload, isLoading: false },
      };
    },
    loginReset: () => {
      return deepClone(loginInitialState);
    },
  },
});

export const { loginSuccess, loginStarted, loginFail, loginReset } =
  loginSlice.actions;

export interface LoginUserState {
  data?: LoginDataResponse | any;
  isLogin?: boolean;
  error?: string | null;
  isLoading?: boolean;
}

const loginUserInitialState: LoginUserState = {
  data: {},
  error: null,
  isLogin: false,
  isLoading: false,
};
export const loginUserSlice = createSlice({
  name: 'loginUser',
  initialState: deepClone(loginUserInitialState),
  reducers: {
    loginUserStarted: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    loginUserSuccess: (state, action) => {
      return {
        ...state,
        ...{
          data: action.payload,
          error: null,
          isLoading: false,
          isLogin: true,
        },
      };
    },
    loginUserUpdate: (state, action) => {
      return {
        ...state,
        ...{
          data: {
            ...state.data,
            ...action.payload,
          },
          error: null,
          isLoading: false,
          isLogin: true,
        },
      };
    },
    loginUserFail: (state, action) => {
      return {
        ...state,
        ...{ error: action.payload, isLoading: false },
      };
    },
    loginUserReset: () => {
      return deepClone(loginUserInitialState);
    },
  },
});

export const {
  loginUserSuccess,
  loginUserStarted,
  loginUserUpdate,
  loginUserFail,
  loginUserReset,
} = loginUserSlice.actions;

export interface LogoutUserPayload {
  noApiCall?: boolean;
}

export const doLogin = (data: LoginPayload) => async (dispatch: any) => {
  dispatch(loginStarted());
  try {
    const auth: LoginSuccessResponse = await loginAPI(data);

    if (auth) {
      dispatch(loginSuccess(auth));
    }
  } catch (e: any) {
    dispatch(loginFail(e.message));
  }
};

export const fetchLoginUser =
  (data: LoginUserPayload) => async (dispatch: any) => {
    dispatch(loginUserStarted());
    try {
      const auth: LoginDataResponse = await getLoginUser(data);
      if (auth) {
        dispatch(loginUserSuccess(auth));
      }
    } catch (e: any) {
      dispatch(loginReset());
      dispatch(loginUserReset());
      dispatch(loginUserFail(e.message));
    }
  };

export const logoutUser =
  (data: LogoutUserPayload) => async (dispatch: any) => {
    try {
      dispatch(loginReset());
      dispatch(loginUserReset());
      if (!data.noApiCall) {
        await logoutAPI();
      }
    } catch (e: any) {
      throw new Error(e);
    }
  };
