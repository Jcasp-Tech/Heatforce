/* eslint-disable no-useless-escape */
import * as Yup from 'yup';

import { REGEX, REGEX_VALIDATION_MESSAGE } from '@/utils/constants';

export interface SaveQuoteFormInputs {
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notes_comments: string;
}
export const SaveQuoteFormValidateSchema = Yup.object({
  title: Yup.string().required('Please enter your title.'),
  firstName: Yup.string()
    .required('Please enter your first name.   ')
    .max(60, 'First name must be at most 60 characters')
    .matches(/^\s*\S[\s\S]*$/, 'First Name cannot contain only blankspaces'),
  lastName: Yup.string().required('Please enter your last name.   '),
  email: Yup.string()
    .required('Please enter your email address.   ')
    .email('Email must be a valid ')
    .matches(REGEX.email, REGEX_VALIDATION_MESSAGE.email),
  phone: Yup.string()
    .required('Please enter your contact number. ')
    .matches(
      /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+?)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/,
      'Please provide a valid UK contact number. '
    ),
  notes_comments: Yup.string().nullable(),
}).required();
