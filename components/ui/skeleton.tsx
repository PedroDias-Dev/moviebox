import { cn } from '@/libs/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-primary-700 dark:bg-primary-800', className)} {...props} />;
}

export { Skeleton };
