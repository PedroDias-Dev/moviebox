'use client';

import { useLoading } from '@/components/global/loading/loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { auth } from '@/libs/firebase';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// import { useRouter } from "next/router";
export default Login;

function Login() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const { toast } = useToast();
  const router = useRouter();
  const { setLoading } = useLoading();

  const onSubmit = async ({ email, password }: any) => {
    if (errors) console.log(errors);

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setLoading(false);

      router.push('/app/dashboard');
    } catch (e) {
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Invalid email or password, please try again.'
      });
    }
  };

  return (
    <div className='grid grid-cols-2 gap-6'>
      <Image src='/assets/background.png' alt='logo' width={400} height={400} style={{ objectFit: 'contain' }} />

      <div className='h-full flex flex-col gap-4'>
        <div className='h-full flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <h3 className='text-3xl font-bold flex gap-2 items-center'>TeamBet</h3>
            <h2 className='text-sm text-secondary-200'>Login to your account</h2>
          </div>
          <div className='h-full'>
            <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-1'>
                  <label className='block' htmlFor='email'>
                    Email
                  </label>
                  <Input type='text' {...register('email')} placeholder='Email' />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='block'>Password</label>
                  <Input type='password' {...register('password')} placeholder='Password' />
                </div>
              </div>
              <div className='flex items-baseline justify-between mt-8 gap-2'>
                <Button variant='link' asChild>
                  <Link href='/auth/register' className='text-sm hover:underline'>
                    Don't have an account?
                  </Link>
                </Button>

                <Button disabled={formState.isSubmitting} variant='default' size='lg'>
                  {formState.isSubmitting && <span className='spinner-border spinner-border-sm me-1'></span>}
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
