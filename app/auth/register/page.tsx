'use client';

import { useLoading } from '@/components/global/loading/loading';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import Account from './steps/account';
import Group from './steps/group';
import Championships from './steps/championships';
import { KeyRound, PartyPopper, Trophy, Users } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '@/libs/firebase';
import Privacy from './steps/privacy';
import { addDoc, collection } from 'firebase/firestore';
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
    title: 'Group Information',
    icon: <Users size={32} />,
    titleText: 'Who do you wanna play with?',
    description: 'Create a group for you and your friends',
    component: (props: any) => <Group {...props} />
  },
  {
    title: 'Championships and Leagues',
    icon: <Trophy size={32} />,
    titleText: 'What are you betting on?',
    description: 'Choose your favorite championships and leagues',
    component: (props: any) => <Championships {...props} />
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
      const user = await createUserWithEmailAndPassword(auth, email, password);

      const userRef = collection(firestore, 'users');
      const groupRef = collection(firestore, 'groups');
      const inviteRef = collection(firestore, 'invites');

      const group = await addDoc(groupRef, {
        name: group_name,
        championships
      });

      for (let user of users) {
        const new_user = await addDoc(userRef, {
          email: user.email,
          pre_register: false,
          profile_type: 'user'
        });

        // await addDoc(inviteRef, {
        //   owner_name: full_name,
        //   user_email: user.email,
        //   group_id: group.id,
        //   user_id: new_user.id
        // });
      }

      await addDoc(userRef, {
        uid: user.user.uid,
        full_name,
        email,
        phone,
        group_id: group.id,
        profile_type: 'group_owner'
      });

      setLoading(false);

      setTimeout(() => {
        refresh();
      }, 2000);
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
          <strong className='text-primary-200'>{step}</strong> / {steps.length}
        </span>
        <h3 className='text-3xl font-bold flex gap-2'>
          {currentStep.titleText} {currentStep.icon}
        </h3>
        <h3 className='text-sm text-secondary-200'>{currentStep.description}</h3>
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
