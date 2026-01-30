import type {
  LoginDataResponse,
  LoginPayload,
  LoginSuccessResponse,
} from '@redux/slices/auth';

import { fetch } from '@/utils/helpers';

export const loginAPI = async (
  payload: LoginPayload
): Promise<LoginSuccessResponse> => {
  return fetch({
    url: '/api/v1/auth/email/login',
    method: 'POST',
    data: payload,
  });
};

export const getLoginUser = async ({
  Authorization,
}: any): Promise<LoginDataResponse> => {
  return fetch({
    url: `/api/v1/auth/me`,
    headers: { Authorization },
  });
};

export const logoutAPI = async (): Promise<any> => {
  return fetch({
    url: `/auth/logout`,
    method: 'POST',
  });
};

export const otpVerificationAPI = async (payload: any): Promise<any> => {
  return fetch({
    url: '/auth/loginVerifyOtp',
    method: 'POST',
    data: payload,
  });
};

export const forgotOtpVerificationAPI = async (payload: any): Promise<any> => {
  return fetch({
    url: '/auth/forgotPasswordVerifyOtp',
    method: 'POST',
    data: payload,
  });
};

export const resendAuthOtpAPI = async (payload: any): Promise<any> => {
  return fetch({
    url: '/auth/loginResendOtp',
    method: 'POST',
    data: payload,
  });
};

export const resendOtpAPI = async (payload: any): Promise<any> => {
  return fetch({
    url: '/auth/forgotPasswordResendOtp',
    method: 'POST',
    data: payload,
  });
};

export const verifyOtpAPI = async (payload: any): Promise<any> => {
  return fetch({
    url: `user/verifyOtp`,
    method: 'POST',
    data: payload,
  });
};
export const resendUserOtpAPI = async (payload: any): Promise<any> => {
  return fetch({
    url: `/user/resendOtp`,
    method: 'POST',
    data: payload,
  });
};
export const signUpAPI = async (payload: any): Promise<any> => {
  return fetch({
    url: `/api/v1/auth/email/register`,
    method: 'POST',
    data: payload,
  });
};

export const updateProfileAPI = async (payload: any): Promise<any> => {
  return fetch({
    url: `/api/v1/auth/me`,
    method: 'PATCH',
    data: payload,
  });
};

export const loginAsAdminAPI = async (sessionId: any): Promise<any> => {
  return fetch({
    url: `/auth/loginFromAdmin/${sessionId}`,
    method: 'GET',
  });
};

export const popupShowedAPI = async (): Promise<any> => {
  return fetch({
    url: `/auth/popupShowed`,
    method: 'PATCH',
  });
};

export const forgotPasswordAPI = async (payload: any): Promise<any> => {
  return fetch({
    url: `/api/v1/auth/forgot/password`,
    method: 'POST',
    data: payload,
  });
};

export const changePasswordAPI = async (payload: any): Promise<any> => {
  return fetch({
    url: `/api/v1/auth/me/change/password`,
    method: 'PATCH',
    data: payload,
  });
};

export const resetPasswordAPI = async (payload: any): Promise<any> => {
  return fetch({
    url: `/api/v1/auth/reset/password`,
    method: 'POST',
    data: payload,
  });
};

export const getFileAPI = async (path: any): Promise<any> => {
  return fetch({
    url: `/api/v1/files/${path}`,
    method: 'GET',
  });
};
