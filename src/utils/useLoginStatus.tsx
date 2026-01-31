import type { RootState } from '@redux/reducers';
import type { LoginState } from '@redux/slices/auth';
import { fetchLoginUser } from '@redux/slices/auth';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

import { deepClone } from './helpers';

const useLoginStatus = (loginState: LoginState) => {
  const [isLogin, setIsLogin] = useState(false);
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const [, setCookie]: any = useCookies(['authApp']);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (
      loginUser?.isLogin === true &&
      loginUser?.data?.user &&
      loginUser?.data?.user?.id
    ) {
      const userData = deepClone(loginUser);

      const payload: any = {
        user: userData?.data?.user,
        token: loginUser?.data?.token,
      };
      setCookie('authApp', JSON.stringify(payload), { path: '/' });
      setIsLogin(true);
    }
  }, [loginUser, setCookie]);

  useEffect(() => {
    if (loginState?.data?.token) {
      dispatch(
        fetchLoginUser({
          Authorization: `Bearer ${loginState?.data?.token}`,
        })
      );
    }
    // return () => {};
  }, [loginState, dispatch]);

  return isLogin;
};

export default useLoginStatus;
