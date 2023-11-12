'use client';

import { useDialog } from '@/components/global/dialog/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { Trash } from 'lucide-react';
import moment from 'moment';

const MoviesRow = ({ movie, index, setSelectedMovie, triggerRef, deleteMovie }: any) => {
  const { addDialog } = useDialog();

  return (
    <TableRow
      key={index}
      onClick={e => {
        if (e?.target instanceof SVGElement) return;
        e.stopPropagation();

        setSelectedMovie(movie);
        triggerRef.current.click();
      }}
    >
      <TableCell className='font-medium'>{movie.id}</TableCell>
      {/* <TableCell>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>None</AvatarFallback>
        </Avatar>
      </TableCell> */}
      <TableCell>{movie.name}</TableCell>
      <TableCell>{movie.genre}</TableCell>
      <TableCell>{moment(movie.createdAt).format('DD/MM/YYYY HH:mm')}</TableCell>
      <TableCell className='flex justify-end'>
        <Trash
          onClick={() => {
            addDialog({
              title: 'Deletar filme?',
              description: 'Tem certeza que deseja deletar este filme? Essa ação não pode ser desfeita.',
              onContinue: () => deleteMovie(movie.id)
            });
          }}
          className='w-5 h-5 cursor-pointer'
          stroke='red'
        />
      </TableCell>
    </TableRow>
  );
};

export default MoviesRow;
