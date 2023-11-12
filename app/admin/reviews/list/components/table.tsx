'use client';

import { SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { useRef } from 'react';

import ShowsRow from './row';
import { useApi } from '@/hooks/useApi';

const ReviewsTable = ({ data, setSelectedShow, getData }: any) => {
  const { api } = useApi();
  const { toast } = useToast();
  const triggerRef = useRef(null) as any;

  const deleteShow = async (movieId: any) => {
    try {
      await api.delete(`/api/v1/series/${movieId}`);

      toast({
        variant: 'success',
        title: 'Sucesso!',
        description: 'Reviews deletada com sucesso.'
      });

      getData();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Atenção!',
        description: 'Houve um erro ao deletar a reviews. Por favor, tente novamente.'
      });
    }
  };

  return (
    <>
      <Table>
        <TableCaption>Todos as reviews - {data.length} reviews totais.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>ID</TableHead>
            {/* <TableHead>Image</TableHead> */}
            <TableHead>Usuário</TableHead>
            <TableHead>Media</TableHead>
            <TableHead>Comentário</TableHead>
            <TableHead>Estrelas</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead className='text-right'>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(async (show: any, index: number) => (
            <ShowsRow
              key={index}
              show={show}
              index={index}
              setSelectedShow={setSelectedShow}
              triggerRef={triggerRef}
              deleteShow={deleteShow}
            />
          ))}
        </TableBody>
      </Table>

      <SheetTrigger ref={triggerRef} />
    </>
  );
};

export default ReviewsTable;
