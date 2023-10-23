import { Skeleton } from '@/components/ui/skeleton';

function Dashboard() {
  return (
    <div className='col-span-1 p-5 flex flex-col gap-6'>
      <h1 className='text-4xl font-extrabold'>Dashboard</h1>

      <div className='grid grid-cols-[2fr_1fr_1fr] gap-3'>
        <Skeleton className='w-[100%] h-[253px] rounded-md' />
        <Skeleton className='w-[100%] h-[253px] rounded-md' />
        <Skeleton className='w-[100%] h-[253px] rounded-md' />
      </div>

      <div className='grid grid-cols-[1fr_3fr_2fr] gap-3'>
        <Skeleton className='w-[100%] h-[253px] rounded-md' />
        <Skeleton className='w-[100%] h-[253px] rounded-md' />
        <Skeleton className='w-[100%] h-[253px] rounded-md' />
      </div>
    </div>
  );
}

export default Dashboard;
