'use client';

import { useLoading } from '@/components/global/loading/loading';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import Account from './steps/account';
import { KeyRound, PartyPopper } from 'lucide-react';
import Privacy from './steps/privacy';
import { useAuth } from '@/hooks/useAuth';

// import { useRouter } from "next/router";
export default Register;

const steps = [
  {
    title: 'Personal Information',
    icon: <PartyPopper size={32} />,
    titleText: 'We are happy to have you here',
    description: 'Fill the form bellow to get started.',
    component: (props: any) => <Account {...props} />
  },
  {
    title: 'Password and Terms',
    icon: <KeyRound size={32} />,
    titleText: 'Finally, your password',
    description: 'Use a strong password and accept our terms and conditions',
    component: (props: any) => <Privacy {...props} />
  }
];

function Register() {
  const { toast } = useToast();
  const { setLoading } = useLoading();
  const { refresh } = useAuth();

  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});

  const onSubmit = async (data: any) => {
    setLoading(true);

    const { full_name, email, phone, password, group_name, users, championships } = data;

    try {
      // const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // setTimeout(() => {
      //   refresh(userCredential);
      // }, 2000);
    } catch (e) {
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Invalid email or password, please try again.'
      });
    }
  };

  const nextStep = async (newData: any) => {
    const data = { ...userData, ...newData };
    setUserData(data);

    if (step === steps.length) {
      return onSubmit(data);
    }

    setStep(step + 1);
  };

  const currentStep = steps[step - 1];
  const CurrentStepComponent = currentStep.component;

  return (
    <div className='h-full flex flex-col justify-between gap-7 transition-all'>
      <div className='flex flex-col gap-1'>
        <span className='text-sm'>
          <strong className='text-neutral-200'>{step}</strong> / {steps.length}
        </span>
        <h3 className='text-[38px] font-black flex gap-2 items-center'>
          {currentStep.titleText} {currentStep.icon}
        </h3>
        <span className='text-sm text-secondary-200'>{currentStep.description}</span>
      </div>

      <div className='h-full flex-col justify-between'>
        <CurrentStepComponent
          nextStep={nextStep}
          previousStep={step > 1 ? () => setStep(step - 1) : undefined}
          userData={userData}
        />
      </div>
    </div>
  );
}
