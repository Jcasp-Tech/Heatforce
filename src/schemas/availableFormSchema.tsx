/* eslint-disable no-useless-escape */
import * as Yup from 'yup';

import { REGEX_VALIDATION_MESSAGE } from '@/utils/constants';

export interface AvailableRoofFormInputs {
  name: string;
  phone: string;
  email: string;
}
export interface SaveProgressModelInputs {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  title: string;
}
export const SaveProgressModelInputsSchema = Yup.object({
  title: Yup.string().required('Please enter your title.   '),
  firstName: Yup.string()
    .required('Please enter your first name.  ')
    .max(60, 'Name must be at most 60 characters')
    .matches(/^(?=.*[a-zA-Z])[a-zA-Z\s.'-]+$/, 'Please provide a valid name.'),
  lastName: Yup.string()
    .required('Please enter your last name.  ')
    .max(60, 'Name must be at most 60 characters')
    .matches(/^(?=.*[a-zA-Z])[a-zA-Z\s.'-]+$/, 'Please provide a valid name.'),
  email: Yup.string()
    .required('Please enter your email address.   ')
    .matches(
      /^([A-Za-z0-9_\-.])+@(?!(?:[A-Za-z0-9_\-.]+\.)?com\.com)([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
      REGEX_VALIDATION_MESSAGE.email
    ),
  phone: Yup.string()
    .required('Please enter your contact number. ')
    .matches(
      /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+?)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/,
      'Please provide a valid UK contact number. '
    ),
}).required();
export const AvailableRoofFormValidateSchema = Yup.object({
  name: Yup.string()
    .required('Please enter your name.  ')
    .max(60, 'Name must be at most 60 characters')
    .matches(/^(?=.*[a-zA-Z])[a-zA-Z\s.'-]+$/, 'Please provide a valid name.'),
  email: Yup.string()
    .required('Please enter your email address.   ')
    .matches(
      /^([A-Za-z0-9_\-.])+@(?!(?:[A-Za-z0-9_\-.]+\.)?com\.com)([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
      REGEX_VALIDATION_MESSAGE.email
    ),
  phone: Yup.string()
    .required('Please enter your contact number. ')
    .matches(
      /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+?)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/,
      'Please provide a valid UK contact number. '
    ),
  notes: Yup.string()
  .max(250, 'Notes field must have only 250 characters')
}).required();
