'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import { useApi } from '@/hooks/useApi';
import { cn } from '@/libs/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar, CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const UserCreate = () => {
  const { api } = useApi();
  const { toast } = useToast();

  const formSchema = z.object({
    full_name: z.string().min(5, {
      message: 'O nome deve ter no mínimo 5 caracteres.'
    }),
    email: z.string().email({
      message: 'O e-mail deve ser válido.'
    }),
    password: z.string().min(8, {
      message: 'A senha deve ter no mínimo 8 caracteres.'
    }),
    birth_date: z.date().min(new Date('1900-01-01'), {
      message: 'A data de nascimento deve ser válida.'
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      birth_date: new Date('2000-01-01')
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { full_name, password, email, birth_date } = values;

    try {
      await api.post('/api/v1/auth/register', {
        fullName: full_name,
        email,
        password,
        birthDate: birth_date
      });

      form.reset();

      toast({
        variant: 'success',
        title: 'Sucesso!',
        description: 'Usuário criado com sucesso.'
      });
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
        <h1 className='text-4xl font-extrabold'>Crie um usuário</h1>
      </div>

      <div className='w-full h-screen rounded-t-lg bg-neutral-800 p-5'>
        <div className='w-full flex flex-col justify-center items-center'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-1/3'>
              <FormField
                control={form.control}
                name='full_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder='Insira um nome' {...field} />
                    </FormControl>
                    <FormDescription>Este nome será utilizado para identificar o usuário no sistema.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder='Insira um e-mail' {...field} />
                    </FormControl>
                    <FormDescription>Por favor, insira um e-mail válido.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input placeholder='Insira um senha' {...field} />
                    </FormControl>
                    <FormDescription>
                      Insira uma senha segura com no mínimo 8 caracteres, contendo letras e números.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='birth_date'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Data de Nascimento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Selecione sua data de nascimento</span>}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={date => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
