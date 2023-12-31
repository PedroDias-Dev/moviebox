'use client';

import { SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { useRef } from 'react';

import UsersRow from './row';
import { useApi } from '@/hooks/useApi';

const UsersTable = ({ data, setSelectedUser, getData }: any) => {
  const { api } = useApi();
  const { toast } = useToast();
  const triggerRef = useRef(null) as any;

  const deleteUser = async (userId: any) => {
    try {
      await api.delete(`/api/v1/users/${userId}`);

      toast({
        variant: 'success',
        title: 'Sucesso!',
        description: 'Usuário deletada com sucesso.'
      });

      getData();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Atenção',
        description: 'Houve um erro ao deletar o usuário. Por favor, tente novamente.'
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
            <TableHead>Criado em</TableHead>
            <TableHead className='text-right'>Ações</TableHead>
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
