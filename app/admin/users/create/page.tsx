'use client';

import Select from '@/components/global/form/select/select';
import PreLoad from '@/components/global/loading/preload';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { firestore } from '@/libs/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDoc, collection } from 'firebase/firestore';
import { Terminal } from 'lucide-react';
import Link from 'next/link';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const UserCreate = () => {
  const { toast } = useToast();

  const groupsRef = collection(firestore, 'groups');

  const [value] = useCollection(groupsRef);

  const groups = value?.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as any;

  const formSchema = z.object({
    full_name: z.string().min(5, {
      message: 'Name must be at least 5 characters.'
    }),
    email: z.string().email(),
    phone: z.string().min(10, {
      message: 'Phone must be at least 10 characters.'
    }),
    group: z.string()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      group: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { full_name, email, phone, group } = values;

    let group_id = groups.find((item: any) => item.id.toLowerCase() === group.toLowerCase())?.id;

    try {
      const userRef = collection(firestore, 'users');

      await addDoc(userRef, {
        full_name,
        email,
        phone,
        group_id
      });

      toast({
        variant: 'success',
        title: 'Success!',
        description: 'User created successfully.'
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong.'
      });
    }
  };

  return (
    <div className='col-span-1 flex flex-col'>
      <div className='p-5'>
        <h1 className='text-4xl font-extrabold'>Create a User</h1>
      </div>

      <div className='w-full h-screen rounded-t-lg bg-primary-800 p-5'>
        <div className='w-full flex flex-col justify-center items-center'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-1/3'>
              <FormField
                control={form.control}
                name='full_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Insert a name' {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
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
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder='Insert a phone number' mask={'(99) 99999-9999'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <PreLoad wait={groups}>
                <FormField
                  control={form.control}
                  name='group'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Group</FormLabel>
                      <FormControl>
                        <Select
                          form={form}
                          field={field}
                          name='group'
                          placeholder='Select a group'
                          options={[
                            ...groups.map((group: any) => ({
                              value: group.id,
                              label: group.name
                            }))
                          ]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </PreLoad>

              <Alert>
                <Terminal className='h-4 w-4' />
                <AlertTitle>About Groups</AlertTitle>
                <AlertDescription>
                  All users must be associated with a group. If you don't have any group, you can create one{' '}
                  <Link href='/admin/groups/create'>
                    <span className='text-primary-200'>here</span>
                  </Link>
                </AlertDescription>
              </Alert>

              <Button type='submit'>Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserCreate;
