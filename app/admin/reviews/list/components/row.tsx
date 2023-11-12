'use client';

import { useDialog } from '@/components/global/dialog/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { Trash } from 'lucide-react';
import moment from 'moment';

const ShowsRow = ({ show: review, index, deleteShow }: any) => {
  const { addDialog } = useDialog();

  return (
    <TableRow key={index}>
      <TableCell className='font-medium'>{review.id}</TableCell>
      <TableCell>{review.user}</TableCell>
      <TableCell>{review.media}</TableCell>
      <TableCell>
        <p className='text-sm text-neutral-400 max-w-[300px] truncate'>{review.comment}</p>
      </TableCell>
      <TableCell>{review.stars}</TableCell>
      <TableCell>{moment(review.createdAt).format('DD/MM/YYYY HH:mm')}</TableCell>
      <TableCell className='flex justify-end h-full items-center'>
        <Trash
          onClick={() => {
            addDialog({
              title: 'Deletar review?',
              description: 'Tem certeza que deseja deletar esta review? Essa ação não pode ser desfeita.',
              onContinue: () => deleteShow(review.id)
            });
          }}
          className='w-5 h-5 cursor-pointer'
          stroke='red'
        />
      </TableCell>
    </TableRow>
  );
};

export default ShowsRow;
