import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
// eslint-disable-next-line prettier/prettier
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/libs/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-primary-950 dark:focus-visible:ring-primary-800',
  {
    variants: {
      variant: {
        default:
          'bg-primary-200 text-black hover:bg-primary-300/90 dark:bg-primary-50 dark:text-primary-900 dark:hover:bg-primary-50/90',
        destructive:
          'bg-red-500 text-primary-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/90',
        outline:
          'border border-primary-200 bg-primary-800 white hover:bg-primary-100 hover:text-primary-900 dark:border-primary-800 dark:bg-primary-950 dark:hover:bg-primary-800 dark:hover:text-primary-50',
        secondary:
          'bg-primary-100 text-primary-900 hover:bg-primary-100/80 dark:bg-primary-800 dark:text-primary-50 dark:hover:bg-primary-800/80',
        ghost: 'hover:bg-primary-100 hover:text-primary-900 dark:hover:bg-primary-800 dark:hover:text-primary-50',
        link: 'text-white underline-offset-4 hover:underline dark:text-primary-50'
      },
      size: {
        default: 'w-fit h-10 px-4 py-2',
        sm: 'w-9 h-10 rounded-md px-3',
        lg: 'w-40 h-10 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
