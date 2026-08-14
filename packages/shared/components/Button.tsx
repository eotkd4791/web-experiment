import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export function Button({ children, type, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button data-variant={variant} type={type ?? 'button'} {...props}>
      {children}
    </button>
  );
}
