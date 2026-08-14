import { Button } from './Button';

export default {
  title: 'Shared/Button',
  component: Button,
};

export const Primary = {
  args: {
    children: 'Save changes',
  },
};

export const Secondary = {
  args: {
    children: 'Cancel',
    variant: 'secondary',
  },
};
