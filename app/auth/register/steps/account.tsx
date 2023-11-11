import { useLoading } from '@/components/global/loading/loading';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/libs/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';

const Account = ({ nextStep }: any) => {
  const { setLoading } = useLoading();

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      email: '',
      birth_date: new Date('2000-01-01')
    }
  });

  const checkEmail = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const { full_name, email } = values;

    nextStep({ full_name, email });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(checkEmail)} className='w-full flex flex-col gap-5'>
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
            <Link className='text-sm text-neutral-100 hover:text-neutral-200' href='/auth/login'>
              Já tem uma conta?
            </Link>

            <Button type='submit' variant='default' size='lg'>
              Próximo
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Account;
