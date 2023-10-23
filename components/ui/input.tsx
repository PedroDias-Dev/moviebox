import * as React from 'react';

import InputMask from 'react-input-mask';

import { cn } from '@/libs/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps | any>(({ mask, className, type, ...props }, ref) => {
  return mask ? (
    <InputMask
      mask={mask}
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-primary-200 bg-primary-700 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-800 dark:bg-primary-950 dark:ring-offset-primary-950 dark:placeholder:text-primary-400 dark:focus-visible:ring-primary-800'
      )}
      ref={ref}
      {...props}
    />
  ) : (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-primary-200 bg-primary-700 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-800 dark:bg-primary-950 dark:ring-offset-primary-950 dark:placeholder:text-primary-400 dark:focus-visible:ring-primary-800',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
