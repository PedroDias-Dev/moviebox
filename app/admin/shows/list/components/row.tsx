'use client';

import { useDialog } from '@/components/global/dialog/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { Trash } from 'lucide-react';
import moment from 'moment';

const ShowsRow = ({ show, index, setSelectedShow, triggerRef, deleteShow }: any) => {
  const { addDialog } = useDialog();

  return (
    <TableRow
      key={index}
      onClick={e => {
        if (e?.target instanceof SVGElement) return;
        e.stopPropagation();

        setSelectedShow(show);
        triggerRef.current.click();
      }}
    >
      <TableCell className='font-medium'>{show.id}</TableCell>
      <TableCell>{show.name}</TableCell>
      <TableCell>{show.genre}</TableCell>
      <TableCell>{moment(show.created_at).format('DD/MM/YYYY HH:mm')}</TableCell>
      <TableCell className='flex justify-end'>
        <Trash
          onClick={() => {
            addDialog({
              title: 'Deletar série?',
              description: 'Tem certeza que deseja deletar esta série? Essa ação não pode ser desfeita.',
              onContinue: () => deleteShow(show.id)
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
