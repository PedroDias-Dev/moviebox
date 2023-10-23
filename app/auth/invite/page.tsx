'use client';

import { useToast } from '@/components/ui/use-toast';
import { auth, firestore } from '@/libs/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Privacy from './steps/privacy';
import { PartyPopper } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useLoading } from '@/components/global/loading/loading';
import { useAuth } from '@/hooks/useAuth';

const Invite = ({ searchParams }: any) => {
  const router = useRouter();
  const { toast } = useToast();
  const { setLoading } = useLoading();
  const { refresh } = useAuth();
  const { group_id, invite_id, user_id } = searchParams as any;

  const [user, setUser] = useState<any>(null);
  const [invite, setInvite] = useState<any>(null);
  const [validInvite, setValidInvite] = useState(false);

  const userRef = doc(firestore, 'users', user_id);
  const inviteRef = doc(firestore, 'invites', invite_id);

  const invalidInvite = () => {
    toast({
      variant: 'destructive',
      title: 'Invalid invite',
      description: 'The invite you are trying to access is invalid.'
    });

    router.push('/');
  };

  const validateInvite = () => {
    getDoc(inviteRef).then(doc => {
      const data = doc.data() as any;

      if (data?.group_id !== group_id || data?.user_id !== user_id || data?.accepted) {
        invalidInvite();
        return;
      }
      setInvite(data);

      getDoc(userRef).then(doc => {
        const data = doc.data() as any;

        if (!data) {
          invalidInvite();
          return;
        }

        setUser({
          id: doc.id,
          ...data
        });
      });
    });

    setValidInvite(true);
  };

  useEffect(() => {
    if (!group_id || !invite_id || !user_id) {
      invalidInvite();
      return;
    }

    validateInvite();
  }, []);

  const onSubmit = async (data: any) => {
    const { full_name, password } = data;
    const email = user?.email;

    setLoading(true);

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      await updateDoc(userRef, {
        full_name,
        uid: user.user.uid,
        pre_register: true
      });

      await updateDoc(inviteRef, {
        accepted: true
      });

      setLoading(false);

      refresh();
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
    validInvite && (
      <div className='h-full flex flex-col justify-between gap-7 transition-all'>
        <div className='flex flex-col gap-1'>
          <h3 className='text-3xl font-bold flex gap-2'>
            <strong className='text-primary-100'>{invite?.owner_name}</strong> invited you to join his group!{' '}
            <PartyPopper size={32} />
          </h3>
          <h3 className='text-sm text-secondary-200'>Fill the form below to start playing.</h3>
        </div>

        <div className='h-full flex-col justify-between'>
          <Privacy submit={onSubmit} user={user} />
        </div>
      </div>
    )
  );
};

export default Invite;
