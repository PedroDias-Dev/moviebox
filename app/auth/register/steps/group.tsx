import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { firestore } from '@/libs/firebase';

const Group = ({ nextStep, previousStep, userData }: any) => {
  const [users, setUsers] = useState<any>([]);

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const formSchema = z.object({
    group_name: z.string().min(5, {
      message: 'The group name must be at least 5 characters.'
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      group_name: ''
    }
  });

  const addUser = async () => {
    if (!email) return;
    if (users.find((user: any) => user.email === email)) return setError('This e-mail is already added to the group.');
    if (email === userData.email) return setError('You cannot add yourself to the group.');

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) return setError('Invalid email address.');

    const q = query(collection(firestore, 'users'), where('email', '==', email), limit(1));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      const user = querySnapshot.docs[0].data() as any;

      if (user.email === email) {
        setError('This e-mail is already registered in the platform.');
        return;
      }
    }

    setUsers([...users, { email }]);

    setEmail('');
    setError('');
  };

  const submit = async (values: z.infer<typeof formSchema>) => {
    const { group_name } = values;
    if (users.length < 2) return setError('You need to add at least 2 people to your group.');

    nextStep({ group_name, users });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='w-full flex flex-col gap-5'>
        <div className='w-full h-full flex flex-col gap-7 justify-between'>
          <FormField
            control={form.control}
            name='group_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>What's your group name?</FormLabel>
                <FormControl>
                  <Input placeholder='Insert a name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex-col flex gap-5'>
            <div className='flex-col flex gap-1'>
              <span className='text-base text-secondary-100 max-w-xl'>
                Add you friends here, and they will receive a invite to join your group. On the free plan, you can add
                up to <strong className='text-primary-300'>10 people</strong>.
              </span>

              <span className='text-sm text-secondary-200 max-w-xl'>Don't worry, you can add more people later.</span>
            </div>

            <div className='flex-col flex gap-3'>
              {users.map((user: any, index: number) => (
                <div key={index} className='h-3 w-full bg-primary-500 p-4 rounded-sm flex items-center justify-between'>
                  <span className='text-sm text-secondary-100 max-w-xl flex gap-1 items-center'>
                    <strong className='text-sm text-primary-200 max-w-xl'>{user.email}</strong>
                  </span>

                  <Trash
                    className='cursor-pointer'
                    size={16}
                    onClick={() => {
                      const newUsers = users.filter((u: any) => u.email !== user.email);
                      setUsers(newUsers);
                    }}
                  />
                </div>
              ))}
              <span className='text-end'>
                {users.length} / 10 <span className='text-primary-300'>people</span>{' '}
              </span>
              {users.length !== 10 && (
                <div className='flex w-full items-start gap-2 h-20'>
                  <div className='flex flex-col w-full gap-1'>
                    <Input
                      type='email'
                      placeholder='E-mail'
                      value={email}
                      onChange={(e: any) => setEmail(e.target.value)}
                    />
                    {error && <span className='text-sm text-red-500'>{error}</span>}
                  </div>
                  <Button type='button' onClick={addUser}>
                    <Plus size={16} />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className='flex justify-between items-center'>
            <Button type='button' variant='outline' size='lg' onClick={previousStep}>
              Back
            </Button>

            <Button type='submit' variant='default' size='lg'>
              Next
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Group;
