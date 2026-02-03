import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

const countries = ['AU', 'CA', 'CN', 'FR', 'ID', 'IN', 'KR', 'MY', 'NZ', 'SY', 'TH', 'UK', 'US'] as const;
type Country = (typeof countries)[number];

const getRandomCountry = () => {
  const index = Math.floor(Math.random() * countries.length);
  return countries[index];
};

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

export function YupResolver() {
  const [country, setCountry] = useState('KR');

  console.debug({ country });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<YupSchemaType>({
    resolver: yupResolver(yupSchema, { context: { country: 'CA' } }),
    mode: 'onChange',
    // context: { country },
  });

  const onSubmit = handleSubmit(
    (data) => console.log(data),
    (error) => console.error(error),
  );

  useEffect(() => {
    setCountry('CA');
  }, []);

  return (
    <div>
      {country}
      <form className="flex flex-col gap-y-4 p-4 w-[300px]" onSubmit={onSubmit}>
        <input className="border-1" {...register('name')} placeholder="Name" />
        <span style={{ color: 'red' }}>{errors.name?.message}</span>
        <input className="border-1" {...register('key')} placeholder="key" />
        <span style={{ color: 'red' }}>{errors.key?.message}</span>
        <input className="border-1 bg-secondary rounded" type="submit" />
      </form>
    </div>
  );
}
