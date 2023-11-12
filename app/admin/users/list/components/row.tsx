'use client';

import { useDialog } from '@/components/global/dialog/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { Trash } from 'lucide-react';
import moment from 'moment';

// import { useState } from 'react';

const UsersRow = ({ user, index, deleteUser }: any) => {
  const { addDialog } = useDialog();

  return (
    <TableRow key={index}>
      <TableCell className='font-medium'>{user.id}</TableCell>
      <TableCell>{user.fullName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{moment(user.createdAt).format('DD/MM/YYYY HH:mm')}</TableCell>
      <TableCell className='flex justify-end'>
        <Trash
          onClick={() => {
            addDialog({
              title: 'Deletar Usuário?',
              description: 'Tem certeza que deseja deletar este usuário? Essa ação não pode ser desfeita.',
              onContinue: () => deleteUser(user.id)
            });
          }}
          className='w-5 h-5 cursor-pointer'
          stroke='red'
        />
      </TableCell>
    </TableRow>
  );
};

export default UsersRow;
