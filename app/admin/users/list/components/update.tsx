'use client';

import { useLoading } from '@/components/global/loading/loading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { firestore } from '@/libs/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const UsersUpdate = ({ selectedUser, getData }: any) => {
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
    resolver: zodResolver(formSchema)
    // defaultValues: {
    //   full_name: selectedUser?.full_name,
    //   email: selectedUser?.email,
    //   phone: selectedUser?.phone
    // }
  });

  useEffect(() => {
    form.reset({
      full_name: selectedUser?.full_name,
      email: selectedUser?.email,
      phone: selectedUser?.phone
    });
  }, [selectedUser]);

  const { toast } = useToast();

  const { setLoading } = useLoading();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { full_name, email, phone } = values;

    setLoading(true);

    try {
      setDoc(doc(firestore, 'users', selectedUser.id), {
        full_name,
        email,
        phone
      });

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
        title: 'Error',
        description: 'Something went wrong, please try again.'
      });
    }
  };

  return (
    <SheetContent>
      <div className='w-full h-full flex flex-col gap-4'>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes to your profile here. Click save when youre done.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-2'>
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
                    <Input mask='(99) 99999-9999' placeholder='Insert a phone number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button type='submit'>Save changes</Button>
            </SheetFooter>
          </form>
        </Form>
      </div>
    </SheetContent>
  );
};

export default UsersUpdate;
