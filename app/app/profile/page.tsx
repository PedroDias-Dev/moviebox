'use client';

import { useDialog } from '@/components/global/dialog/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/hooks/useAuth';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar, CalendarIcon } from 'lucide-react';
import { cn } from '@/libs/utils';
import { format } from 'date-fns';
import { useEffect } from 'react';

export default function Profile() {
  const { api } = useApi();
  const { toast } = useToast();
  const { user } = useAuth();

  const formSchema = z.object({
    full_name: z.string().min(5, {
      message: 'O nome precisa ter pelo menos 5 caracteres.'
    }),
    email: z.string().email({
      message: 'O e-mail precisa ser válido.'
    }),
    birth_date: z.date().min(new Date('1900-01-01'), {
      message: 'A data de nascimento precisa ser válida.'
    })
  });

  useEffect(() => {
    form.reset({
      full_name: user?.fullName,
      email: user?.email,
      birth_date: new Date(user?.birthDate)
    });
  }, [user]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const updateProfile = async () => {
    try {
      await api.get('/api/v1/user/ratings');
    } catch {
      toast({
        variant: 'destructive',
        title: 'Atenção!',
        description: 'Houve um erro ao processar suas informações. Por favor, tente novamente mais tarde.'
      });
    }
  };

  return (
    <main className='flex min-h-screen flex-col p-5 gap-6'>
      <div className='flex flex-col'>
        <h1 className='text-[44px] font-[900]'>Seu Perfil</h1>
        <h3 className='text-[16px] font-light italic'>Edite suas informações aqui</h3>
      </div>

      <Separator />

      <div className='flex flex-col gap-2 items-center'>
        <div className='flex w-full max-w-[600px] flex-col gap-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(updateProfile)} className='w-full flex flex-col gap-5'>
              <FormField
                control={form.control}
                name='full_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qual é seu nome?</FormLabel>
                    <FormControl>
                      <Input placeholder='Digite seu nome completo, ou um nickname' {...field} />
                    </FormControl>
                    <FormDescription>
                      Este será o nome que aparecerá para os outros usuários dentro da plataforma.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qual é seu melhor e-mail?</FormLabel>
                    <FormControl>
                      <Input placeholder='Digite um e-mail' {...field} />
                    </FormControl>
                    <FormDescription>
                      Por favor, insira um e-mail válido, pois ele será usado para entrar na plataforma.
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

              <div className='flex justify-between items-center'>
                <Button type='submit' variant='default' size='lg'>
                  Próximo
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
