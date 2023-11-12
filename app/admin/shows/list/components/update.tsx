'use client';

import Select from '@/components/global/form/select/select';
import { useLoading } from '@/components/global/loading/loading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { useApi } from '@/hooks/useApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const MoviesUpdate = ({ selectedShow, getData }: any) => {
  const { api } = useApi();

  const formSchema = z.object({
    name: z.string().min(5, {
      message: 'O título deve ter no mínimo 5 caracteres.'
    }),
    description: z.string().min(10, {
      message: 'A descrição deve ter no mínimo 10 caracteres.'
    }),
    genre: z.string().min(5, {
      message: 'O gênero deve ter no mínimo 5 caracteres.'
    }),
    cover: z.string().min(5, {
      message: 'A capa deve ter no mínimo 5 caracteres.'
    }),
    director: z.string().min(5, {
      message: 'O diretor deve ter no mínimo 5 caracteres.'
    }),
    year: z.string().min(4, {
      message: 'O ano deve ter no mínimo 4 caracteres.'
    }),
    episodes: z.string().min(2, {
      message: 'A duração deve ter no mínimo 2 caracteres.'
    }),
    seasons: z.string().min(2, {
      message: 'A duração deve ter no mínimo 2 caracteres.'
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      genre: selectedShow?.genre
    }
  });

  useEffect(() => {
    form.reset({
      name: selectedShow?.name,
      description: selectedShow?.description,
      genre: selectedShow?.genre,
      cover: selectedShow?.cover,
      director: selectedShow?.director,
      year: selectedShow?.year,
      episodes: selectedShow?.episodes,
      seasons: selectedShow?.seasons
    });
  }, [selectedShow]);

  const { toast } = useToast();

  const { setLoading } = useLoading();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const { name, description, genre, cover, director, seasons, episodes, year } = values;

    try {
      await api.put('/api/v1/series/' + selectedShow.id, {
        name,
        description,
        genre,
        cover,
        director,
        seasons,
        episodes,
        year
      });

      setLoading(false);

      toast({
        variant: 'success',
        title: 'Sucesso!',
        description: 'Filme atualizado com sucesso.'
      });

      getData();
    } catch (error) {
      setLoading(false);

      toast({
        variant: 'destructive',
        title: 'Atenção',
        description: 'Houve um erro ao processar seu pedido. Tente novamente.'
      });
    }
  };

  return (
    <SheetContent>
      <div className='w-full h-full flex flex-col gap-4'>
        <SheetHeader>
          <SheetTitle>Editar filme</SheetTitle>
          <SheetDescription>
            Faça mudanças no filme aqui. Quando terminar, clique em "Salvar mudanças" para salvar as mudanças.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder='Insira um nome' {...field} />
                  </FormControl>
                  <FormDescription>Insira um nome válido para o filme</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder='Insira uma descrição' {...field} />
                  </FormControl>
                  <FormDescription>Insira uma descrição válida para o filme</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedShow.genre && (
              <FormField
                control={form.control}
                name='genre'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Gênero</FormLabel>
                    <FormControl>
                      <Select
                        form={form}
                        field={field}
                        name='group'
                        placeholder='Selecione um gênero'
                        options={[
                          { value: 'HORROR', label: 'Horror' },
                          { value: 'ROMANCE', label: 'Romance' },
                          { value: 'ACTION', label: 'Action' },
                          { value: 'ADVENTURE', label: 'Adventure' },
                          { value: 'ANIMATION', label: 'Animation' },
                          { value: 'DOCUMENTARY', label: 'Documentary' },
                          { value: 'DRAMA', label: 'Drama' },
                          { value: 'FANTASY', label: 'Fantasy' },
                          { value: 'MUSIC', label: 'Music' }
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name='cover'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capa</FormLabel>
                  <FormControl>
                    <Input placeholder='Insira uma capa' {...field} />
                  </FormControl>
                  <FormDescription>Insira uma capa válida para o filme</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='director'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diretor</FormLabel>
                  <FormControl>
                    <Input placeholder='Insira um diretor' {...field} />
                  </FormControl>
                  <FormDescription>Insira um diretor válido para o filme</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='year'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <FormControl>
                    <Input placeholder='Insira um ano' {...field} />
                  </FormControl>
                  <FormDescription>Insira um ano válido para o filme</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='seasons'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temporadas</FormLabel>
                  <FormControl>
                    <Input placeholder='Insira um número de temporadas' {...field} />
                  </FormControl>
                  <FormDescription>Insira um número de temporadas válido para a série</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='episodes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Episódios</FormLabel>
                  <FormControl>
                    <Input placeholder='Insira um número de episódios' {...field} />
                  </FormControl>
                  <FormDescription>Insira um número de episódios válido para a série</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button type='submit'>Salvar mudanças</Button>
            </SheetFooter>
          </form>
        </Form>
      </div>
    </SheetContent>
  );
};

export default MoviesUpdate;
