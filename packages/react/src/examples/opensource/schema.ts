import * as yup from 'yup';

const countries = ['AU', 'CA', 'CN', 'FR', 'ID', 'IN', 'KR', 'MY', 'NZ', 'SY', 'TH', 'UK', 'US'] as const;
type Country = (typeof countries)[number];

export const yupSchema = yup.object({
  name: yup.string().required(),
  key: yup
    .string()
    .required()
    .when('$country', {
      is: (country: Country) => {
        console.debug('when country', { country });
        return ['AU', 'CA', 'UK', 'US'].includes(country);
      },
      then: (schema) => schema.length(5, 'y: 5자'),
      otherwise: (schema) => schema.length(3, 'n: 3자'),
    }),
});

export type YupSchemaType = yup.InferType<typeof yupSchema>;
