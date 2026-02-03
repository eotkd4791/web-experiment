import { expect, test } from 'vitest';
import { yupSchema } from '.';

test('yup schema', async () => {
  const userInput = { name: 'kk', key: 'CA' };

  await expect(
    yupSchema.validate(userInput, {
      abortEarly: false,
      context: { country: userInput.key },
    }),
  ).rejects.toThrowError();
});
