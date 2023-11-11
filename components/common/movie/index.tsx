import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { Separator } from '@radix-ui/react-separator';
import Image from 'next/image';

export const Movie = ({ triggerRef }: { triggerRef: any }) => {
  return (
    <>
      <DialogTrigger ref={triggerRef} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ai vc malou ratao 3</DialogTitle>
          <DialogDescription>2023 - DIRETOR MALOU RATAO</DialogDescription>
        </DialogHeader>

        <div className='w-full flex gap-5'>
          <Image objectFit='contain' alt="AI VC MALOU RATAO" width={300} height={300} src="data:image/jpeg;base64,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" />
          <div className='w-full max-h-[400px] flex flex-col gap-3 overflow-auto'>
            <div className='rounded-lg bg-neutral-200 p-3 flex items-center justify-center max-w-[100px]'>
              <span className='text-black'>Nota:{" "}<strong>10</strong></span>
            </div>

            <p className='flex flex-col gap-2'>
              <span className='text-neutral-400 text-sm'>Descrição</span>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus illum maiores natus illo molestias eius cum nisi deleniti, dolores dolorem, voluptas facilis assumenda molestiae excepturi minima ratione sint ea ex!
            </p>

            <div className='flex flex-col gap-2'>
              <span className='text-neutral-400 text-sm'>Avaliações</span>

              {Array.from(Array(5)).map(() => (
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-3 p-3 bg-neutral-700 rounded-sm'>
                    <div className='flex flex-col'>
                      <h3>Mauricio</h3>
                      <span className='text-[13px]'>18 de fevrero</span>
                    </div>

                    <div className='flex gap-2'>
                      <StarFilledIcon fill='#e89802' />
                      <StarFilledIcon fill='#e89802' />
                      <StarFilledIcon fill='#e89802' />
                      <StarFilledIcon fill='#e89802' />
                      <StarFilledIcon fill='#e89802' />
                    </div>

                    <p>
                      Achei bom! HAHAHAHAHAHAHAH HAHAHHAHHAHAHAHAHA MALOU Achei bom! HAHAHAHAHAHAHAH HAHAHHAHHAHAHAHAHA MALOU Achei bom! HAHAHAHAHAHAHAH HAHAHHAHHAHAHAHAHA MALOU Achei bom! HAHAHAHAHAHAHAH HAHAHHAHHAHAHAHAHA MALOU
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </DialogContent>
    </>
  )
}