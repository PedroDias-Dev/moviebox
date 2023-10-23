'use client';

import { SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { firestore } from '@/libs/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRef } from 'react';

import UsersRow from './row';

const UsersTable = ({ data, setSelectedUser, getData }: any) => {
  const { toast } = useToast();
  const triggerRef = useRef(null) as any;

  const deleteUser = async (id: any) => {
    try {
      const docRef = doc(firestore, 'users', id);
      await deleteDoc(docRef);

      toast({
        variant: 'success',
        title: 'Success',
        description: 'User deleted successfully.'
      });

      getData();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong, please try again.'
      });
    }
  };

  return (
    <>
      <Table>
        <TableCaption>A list of all users - {data.length} total users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>ID</TableHead>
            {/* <TableHead>Image</TableHead> */}
            <TableHead>Name</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(async (user: any, index: number) => (
            <UsersRow
              key={index}
              user={user}
              index={index}
              setSelectedUser={setSelectedUser}
              triggerRef={triggerRef}
              deleteUser={deleteUser}
            />
          ))}
        </TableBody>
      </Table>

      <SheetTrigger ref={triggerRef} />
    </>
  );
};

export default UsersTable;
