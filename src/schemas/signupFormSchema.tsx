import * as Yup from 'yup';

import { REGEX, REGEX_VALIDATION_MESSAGE } from '@/utils/constants';

export interface SignUpFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export const SignUpFormValidateSchema = Yup.object({
  firstName: Yup.string()
    .required('Please enter your First Name.   ')
    .max(60, 'First Name must be at most 60 characters')
    .matches(/^\s*\S[\s\S]*$/, 'First Name cannot contain only blankspaces'),
  lastName: Yup.string()
    .required('Please enter your Last Name.   ')
    .max(60, 'Last Name must be at most 60 characters')
    .matches(/^\s*\S[\s\S]*$/, 'Last Name cannot contain only blankspaces'),
  email: Yup.string()
    .required('Please enter your Email ID.   ')
    .email('Email must be a valid email')
    .matches(REGEX.email, REGEX_VALIDATION_MESSAGE.email),
  password: Yup.string()
    .required('Please enter your Password.   ')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~#^()_<>])[A-Za-z\d@$!%*?&~#^()_<>]{8,}$/,
      'Password must contain at least 1 uppercase letter 1 lowercase letter 1 digit and 1 special character'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your Password.   ')
    .oneOf(
      [Yup.ref('password')],
      'Password and confirm password does not match'
    ),
}).required();
