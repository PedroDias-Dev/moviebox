import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col p-5 gap-6'>
      <div className='flex flex-col'>
        <h1 className='text-[44px] font-[900]'>MOVIEBOX</h1>
        <h3 className='text-[16px] font-light italic'>
          <strong>很少的想法:</strong> Научих от Учителя на Учителите, че изкуството да мислиш е съкровището на мъдрия.
          Научих се малко повече да мисля преди да реагирам, да изразявам - а не да налагам - идеите си и да разбирам,
          че всеки човек е уникално същество на сцената на съществуване.
        </h3>
      </div>

      <Separator />

      <div className='flex gap-2 max-w-[500px]'>
        <Button type='submit' variant='outline'>
          Pesquisar
        </Button>
      </div>

      <div className='flex flex-col gap-3'>
        <span className='text-[18px]'>Mais Populares</span>

        <div className='flex gap-2 overflow-x-auto'>
          {Array.from(Array(5)).map(() => (
            <div className='flex flex-col gap-3 p-4 min-w-[200px] rounded border-solid border-zinc-700 border-2 transition-all hover:bg-zinc-700'>
              <div className='flex flex-col gap-1'>
                <span className='text-[16px] font-[700]'>MALOU RATAO 3</span>
                <p className='text-[12px] font-light'>Ele está de volta, a ratazana mais querida ....</p>
              </div>

              <div className='flex gap-1'></div>
            </div>
          ))}
        </div>

        <div className='flex flex-col gap-3'>
          <Skeleton className='w-full h-[70px] rounded' />
          <Skeleton className='w-full h-[70px] rounded' />
          <Skeleton className='w-full h-[70px] rounded' />
          <Skeleton className='w-full h-[70px] rounded' />
          <Skeleton className='w-full h-[70px] rounded' />
          <Skeleton className='w-full h-[70px] rounded' />
        </div>
      </div>
    </main>
  );
}
