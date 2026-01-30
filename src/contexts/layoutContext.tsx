import { loginReset, loginUserUpdate } from '@redux/actions';
import type { RootState } from '@redux/reducers';
import type { LoginUserState } from '@redux/slices/auth';
import { logoutUser } from '@redux/slices/auth';
import { message } from 'antd';
import type { AxiosInstance } from 'axios';
import router from 'next/router';
import React, { createContext, useEffect, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

import { TOAST_MESSAGE_DELAY } from '@/utils/constants';
import { API, deepClone } from '@/utils/helpers';

export interface LayoutContextModel {
  doLogout?: () => void;
}

const initialState: LayoutContextModel = {};

export const LayoutContext = createContext(initialState);

export const LayoutContextProvider = ({ children }: any) => {
  const [{ authApp }, , removeCookie]: any = useCookies(['authApp']);
  const dispatch = useDispatch();
  const axiosInstance: AxiosInstance = API();
  const { data: loginUser }: LoginUserState = useSelector(
    (state: RootState) => state.loginUser
  );

  const doLogout = async (noApiCall = false) => {
    try {
      logoutUser({ noApiCall });
    } catch (e: any) {
      throw new Error(e);
    }

    if (noApiCall) {
      dispatch(loginReset());
      const tmpD = deepClone(loginUser);
      delete tmpD.token;
      dispatch(loginUserUpdate(tmpD));
    }
    // router.replace(`/sign-in`);
    removeCookie('authApp', { path: '/' });
    router.reload();
  };

  const doLogoutMemo = useMemo(() => {
    return { doLogout };
  }, []);

  useEffect(() => {
    if (
      authApp &&
      authApp.token &&
      !(loginUser && loginUser?.user && loginUser?.user?.id)
    ) {
      doLogout();
    }
  }, []);

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (c: any) => {
      if (authApp && authApp.token) {
        if (!(c.headers && c.headers.authorization)) {
          c.headers.authorization = `Bearer ${authApp?.token}`;
        }
      }
      return c;
    },
    (error: any) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: any) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      if (response?.data?.responseData) {
        return {
          data: response?.data?.responseData,
        };
      }

      return response;
    },
    (error: any) => {
      if (
        (error && error.response && error.response.status === 401) ||
        error.response.status === 406
      ) {
        doLogout(true);
      }
      if (error?.response?.status >= 400 && error?.response?.status <= 499) {
        let messageString = error.response.data.message;

        if (
          typeof error.response.data.message === 'object' &&
          error.response.data.message !== null
        ) {
          const errorMessages = Object.values(error.response.data.message);
          messageString = errorMessages.join(', ');
        }
        message.destroy();
        message.error(messageString, TOAST_MESSAGE_DELAY);
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject((error.response && error.response.data) || error);
    }
  );

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (c: any) => {
      return c;
    },
    (error: any) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: any) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error: any) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(
        (error && error.response && error.response.data) || error
      );
    }
  );

  return (
    <LayoutContext.Provider value={doLogoutMemo}>
      {children}
    </LayoutContext.Provider>
  );
};
