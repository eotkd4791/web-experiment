import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { yupSchema, type YupSchemaType } from './schema';

export function YupResolver() {
  const country = 'CA';

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
