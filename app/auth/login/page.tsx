'use client';

import { useLoading } from '@/components/global/loading/loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
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

  const { signIn } = useAuth();

  const onSubmit = async ({ email, password }: any) => {
    if (errors) console.log(errors);

    await signIn(email, password);
  };

  return (
    <div className='h-full flex flex-col gap-4'>
      <div className='h-full flex flex-col gap-8'>
        <div className='flex flex-col gap-1'>
          <h3 className='text-[38px] font-black flex gap-2 items-center'>Moviebox</h3>
          <span className='text-sm text-secondary-200'>Entre em sua conta</span>
        </div>
        <div className='h-full'>
          <form onSubmit={handleSubmit(onSubmit)} className='h-full flex flex-col justify-between'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-1'>
                <label className='block' htmlFor='email'>
                  E-mail
                </label>
                <Input type='text' {...register('email')} placeholder='E-mail' />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='block'>Senha</label>
                <Input type='password' {...register('password')} placeholder='Senha' />
              </div>
            </div>
            <div className='flex items-baseline justify-between mt-8 gap-2'>
              <Button variant='link' asChild>
                <Link href='/auth/register' className='text-sm hover:underline'>
                  Não possui uma conta?
                </Link>
              </Button>

              <Button disabled={formState.isSubmitting} variant='default' size='lg'>
                {formState.isSubmitting && <span className='spinner-border spinner-border-sm me-1'></span>}
                Entrar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
