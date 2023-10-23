import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const Privacy = ({ nextStep, previousStep }: any) => {
  const formSchema = z.object({
    password: z.string().min(5, {
      message: 'Password must have at least 8 characters.'
    }),
    confirm_password: z.string().min(5, {
      message: 'Password must have at least 8 characters.'
    }),
    terms: z
      .boolean()
      .default(false)
      .refine((val: any) => val !== false, {
        message: 'You must accept the terms and conditions.'
      })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const checkPassword = async (values: z.infer<typeof formSchema>) => {
    const { password, confirm_password, terms } = values;

    if (password !== confirm_password) {
      return form.setError('confirm_password', {
        type: 'manual',
        message: 'Make sure your passwords match.'
      });
    }

    nextStep({ password, terms });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(checkPassword)} className='w-full flex flex-col gap-5'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Insert a strong password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirm_password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm your Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Same password here' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='terms'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex gap-3 items-center'>
                    <Checkbox id='terms' checked={field.value} onCheckedChange={field.onChange} />
                    <span className='text-sm cursor-pointer text-white'>
                      Please accept our{' '}
                      <strong className='cursor-pointer text-primary-200'>Terms and Conditions</strong>
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-between items-center'>
            <Button type='button' variant='outline' size='lg' onClick={previousStep}>
              Back
            </Button>

            <Button type='submit' variant='default' size='lg'>
              Next
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Privacy;
