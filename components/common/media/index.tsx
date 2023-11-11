import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const Media = ({ media = {}, triggerRef, mediaType }: { media: any; triggerRef: any; mediaType: string }) => {
  const { api } = useApi();
  const { toast } = useToast();

  const formSchema = z.object({
    comment: z.string().min(5, {
      message: 'Sua avaliação precisa ter pelo menos 5 caracteres.'
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: ''
    }
  });

  const [ratings, setRatings] = useState<any>([]);
  const [stars, setStars] = useState(0);
  const [starError, setStarError] = useState('');

  useEffect(() => {
    if (media?.id) getRatings();
  }, [media]);

  const getRatings = async () => {
    const { data } = await api.get(`/api/v1/${mediaType}/${media?.id}/ratings`);

    if (data) {
      setRatings(data);
    }
  };

  const submit = async (values: z.infer<typeof formSchema>) => {
    if (stars === 0) {
      setStarError('Você precisa selecionar uma nota.');
      return;
    }

    const { comment } = values;

    await api.post(`/api/v1/${mediaType}/${media?.id}/ratings`, {
      comment,
      stars
    });

    form.reset();
    setStars(0);
    setStarError('');

    getRatings();

    toast({
      variant: 'success',
      title: 'Sucesso!',
      description: 'Sua avaliação foi enviada com sucesso.'
    });
  };

  return (
    <>
      <DialogTrigger ref={triggerRef} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{media?.name}</DialogTitle>
          <DialogDescription>
            <p className='text-[16px] text-neutral-400'>Dirigido por {media?.director}</p>
            {media?.year} -{' '}
            {mediaType === 'movies'
              ? `${media?.duration} de duração`
              : `${media?.seasons} temporada${media?.seasons > 1 ? 's' : ''} - ${media?.episodes} episódios`}
          </DialogDescription>
        </DialogHeader>

        <div className='w-full flex gap-5'>
          <Image objectFit='contain' alt={media?.name} width={300} height={300} src={media?.cover} />
          <div className='w-full max-h-[400px] flex flex-col gap-3 overflow-auto'>
            <div className='rounded-lg bg-neutral-200 p-3 flex items-center justify-center max-w-[100px]'>
              <span className='text-black'>
                Nota: <strong>10</strong>
              </span>
            </div>

            <p className='flex flex-col gap-2'>
              <span className='text-neutral-400 text-sm'>Descrição</span>
              {media?.description}
            </p>

            <div className='flex flex-col gap-2'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className='w-full flex flex-col gap-5'>
                  <FormField
                    control={form.control}
                    name='comment'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Digite sua avaliação</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='O que você achou desse filme/série?'
                            className='resize-none'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Cuidado com o que você escreve, pois todos os usuários poderão ver, nem todo mundo respeita a
                          opinião dos outros...
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='flex gap-2'>
                    {Array.from(Array(5)).map((_, i) => (
                      <div
                        onClick={() => {
                          setStars(i + 1);
                          setStarError('');
                        }}
                        className='cursor-pointer'
                      >
                        {i + 1 <= stars ? (
                          <Star stroke='#dfdfdf' fill='#dfdfdf' />
                        ) : (
                          <Star stroke='#6d6d6d' fill='#6d6d6d' />
                        )}
                      </div>
                    ))}
                  </div>
                  {starError && <p className='text-sm font-medium text-red-500 dark:text-red-900'>{starError}</p>}
                  <Button type='submit'>Enviar</Button>
                </form>
              </Form>

              <span className='text-neutral-400 text-sm pt-3'>Avaliações</span>

              {ratings.length === 0 && (
                <p className='text-neutral-500 text-sm'>Ninguém avaliou esse filme ainda... quer ser o primeiro?</p>
              )}

              {ratings.map((rating: any) => (
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-3 p-3 bg-neutral-700 rounded-sm'>
                    <div className='flex flex-col'>
                      <h3>Mauricio</h3>
                      <span className='text-[13px]'>18 de fevrero</span>
                    </div>

                    <div className='flex gap-2'>
                      <div className='flex gap-2'>
                        {Array.from(Array(5)).map((_, i) => (
                          <div>
                            {i + 1 <= rating?.stars ? (
                              <Star stroke='#dfdfdf' fill='#dfdfdf' />
                            ) : (
                              <Star stroke='#6d6d6d' fill='#6d6d6d' />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <p>{rating?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </>
  );
};
