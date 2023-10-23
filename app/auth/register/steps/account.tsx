import { useLoading } from '@/components/global/loading/loading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { firestore } from '@/libs/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const Account = ({ nextStep }: any) => {
  const { setLoading } = useLoading();

  const formSchema = z.object({
    full_name: z.string().min(5, {
      message: 'Name must be at least 5 characters.'
    }),
    email: z.string().email(),
    phone: z.string().min(10, {
      message: 'Phone must be at least 10 characters.'
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: ''
    }
  });

  const checkEmail = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const { full_name, email, phone } = values;

    const q = query(collection(firestore, 'users'), where('email', '==', email), limit(1));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      const user = querySnapshot.docs[0].data() as any;

      if (user.email === email) {
        setLoading(false);
        return form.setError('email', {
          type: 'manual',
          message: 'This e-mail is already registered in the platform.'
        });
      }
    }

    setLoading(false);
    nextStep({ full_name, email, phone });
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
                <FormLabel>What's your name?</FormLabel>
                <FormControl>
                  <Input placeholder='Insert your full name' {...field} />
                </FormControl>
                <FormDescription>This will be your public display name inside the platform</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>What's your best e-mail?</FormLabel>
                <FormControl>
                  <Input placeholder='Insert a e-mail' {...field} />
                </FormControl>
                <FormDescription>Please insert a valid e-mail</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>And your phone number?</FormLabel>
                <FormControl>
                  <Input placeholder='Insert a phone number' mask={'(99) 99999-9999'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-between items-center'>
            <Link className='text-sm text-primary-100 hover:text-primary-200' href='/auth/login'>
              Already have an account?
            </Link>

            <Button type='submit' variant='default' size='lg'>
              Next
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Account;
