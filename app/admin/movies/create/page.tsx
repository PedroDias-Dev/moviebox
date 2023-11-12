'use client';

import Select from '@/components/global/form/select/select';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useApi } from '@/hooks/useApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const UserCreate = () => {
  const { toast } = useToast();
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
    year: z
      .string()
      .min(4, {
        message: 'O ano deve ter no mínimo 4 caracteres.'
      })
      .regex(/^[0-9]+$/, {
        message: 'O ano deve ser um número.'
      }),
    duration: z
      .string()
      .min(2, {
        message: 'A duração deve ter no mínimo 2 caracteres.'
      })
      .regex(/^[0-9]+:[0-9]+$/, {
        message: 'A duração deve estar no formato 00:00'
      })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      genre: '',
      cover: '',
      director: '',
      year: '',
      duration: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { name, description, genre, cover, director, duration, year } = values;

    try {
      await api.post('/api/v1/movies', {
        name,
        description,
        genre,
        cover,
        director,
        duration,
        year
      });

      toast({
        variant: 'success',
        title: 'Sucesso!',
        description: 'Filme criado com sucesso.'
      });

      form.reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Atenção',
        description: 'Houve um erro ao processar seu pedido. Tente novamente.'
      });
    }
  };

  return (
    <div className='col-span-1 flex flex-col'>
      <div className='p-5'>
        <h1 className='text-4xl font-extrabold'>Criar um Filme</h1>
      </div>

      <div className='w-full h-full rounded-t-lg bg-neutral-800 p-5'>
        <div className='w-full flex flex-col justify-center items-center'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-1/3'>
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

              {/* HORROR("HORROR"),
                ROMANCE("ROMANCE"),
                ACTION("ACTION"),
                ADVENTURE("ADVENTURE"),
                ANIMATION("ANIMATION"),
                DOCUMENTARY("DOCUMENTARY"),
                DRAMA("DRAMA"),
                FANTASY("FANTASY"),
                MUSIC("MUSIC"); */}

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
                      <Input type='number' placeholder='Insira um ano' {...field} />
                    </FormControl>
                    <FormDescription>Insira um ano válido para o filme</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='duration'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duração</FormLabel>
                    <FormControl>
                      <Input placeholder='Insira uma duração' {...field} />
                    </FormControl>
                    <FormDescription>Insira uma duração válida para o filme</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit'>Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserCreate;
