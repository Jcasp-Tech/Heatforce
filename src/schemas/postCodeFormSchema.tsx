import * as Yup from 'yup';

export interface PostFormInputs {
  postCode: string;
}
export const PostCodeFormValidateSchema = Yup.object({
  postCode: Yup.string()
    .required('Please enter postcode.')
    .matches(
      // /^(GIR 0AA)|((([A-PR-UWYZ][A-HK-Y]?[0-9][0-9A-HJKSTUW]?)\s*[0-9][ABD-HJLN-UW-Z]{2}))$/,
      /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/,
      'Invalid UK postcode'
    ),
}).required();
