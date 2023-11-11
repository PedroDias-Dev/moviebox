'use client';

import { SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { useRef } from 'react';

import MoviesRow from './row';

const MoviesTable = ({ data, setSelectedMovie, getData }: any) => {
  const { toast } = useToast();
  const triggerRef = useRef(null) as any;

  const deleteMovie = async () => {
    try {
      // delete user

      toast({
        variant: 'success',
        title: 'Successo!',
        description: 'Filme deletado com sucesso.'
      });

      getData();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Atenção!',
        description: 'Houve um erro ao deletar o filme. Por favor, tente novamente.'
      });
    }
  };

  return (
    <>
      <Table>
        <TableCaption>Todos os filmes - {data.length} filmes totais.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>ID</TableHead>
            {/* <TableHead>Image</TableHead> */}
            <TableHead>Título</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead className='text-right'>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(async (user: any, index: number) => (
            <MoviesRow
              key={index}
              movie={user}
              index={index}
              setSelectedMovie={setSelectedMovie}
              triggerRef={triggerRef}
              deleteMovie={deleteMovie}
            />
          ))}
        </TableBody>
      </Table>

      <SheetTrigger ref={triggerRef} />
    </>
  );
};

export default MoviesTable;
