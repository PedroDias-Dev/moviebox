'use client';

import { useLoading } from '@/components/global/loading/loading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const MoviesUpdate = ({ selectedUser, getData }: any) => {
  const formSchema = z.object({
    name: z.string().min(5, {
      message: 'O título deve ter no mínimo 5 caracteres.'
    }),
    description: z.string().min(10, {
      message: 'A descrição deve ter no mínimo 10 caracteres.'
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
    duration: z.string().min(2, {
      message: 'A duração deve ter no mínimo 2 caracteres.'
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
    // defaultValues: {
    //   full_name: selectedUser?.full_name,
    //   email: selectedUser?.email,
    //   phone: selectedUser?.phone
    // }
  });

  useEffect(() => {
    form.reset({
      name: selectedUser?.name,
      description: selectedUser?.description,
      cover: selectedUser?.cover,
      director: selectedUser?.director,
      year: selectedUser?.year,
      duration: selectedUser?.duration
    });
  }, [selectedUser]);

  const { toast } = useToast();

  const { setLoading } = useLoading();

  const onSubmit = async () => {
    // const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // const { full_name, email, phone } = values;

    setLoading(true);

    try {
      // update user

      setLoading(false);

      toast({
        variant: 'success',
        title: 'Success',
        description: 'User updated successfully.'
      });

      getData();
    } catch (error) {
      setLoading(false);

      toast({
        variant: 'destructive',
        title: 'Atenção',
        description: 'Something went wrong, please try again.'
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
