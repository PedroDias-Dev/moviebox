// eslint-disable-next-line prettier/prettier
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// eslint-disable-next-line prettier/prettier
import type { ClassValue } from 'clsx';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
