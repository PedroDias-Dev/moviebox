'use client';

import { Media } from '@/components/common/media';
import { useDialog } from '@/components/global/dialog/dialog';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/hooks/useAuth';
import { Star, Trash } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Reviews() {
  const { api } = useApi();
  const { toast } = useToast();
  const { user } = useAuth();
  const { addDialog } = useDialog();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      const { data } = await api.get('/api/v1/user/ratings');

      if (data) {
        setReviews(data);
      }
    } catch {
      toast({
        variant: 'destructive',
        title: 'Atenção!',
        description: 'Houve um erro ao processar suas informações. Por favor, tente novamente mais tarde.'
      });
    }
  };

  const deleteRating = async (ratingId: any) => {
    // await api.delete(`/api/v1/${mediaType}/${media?.id}/ratings/${ratingId}`);

    getReviews();

    toast({
      variant: 'success',
      title: 'Sucesso!',
      description: 'Sua avaliação foi deletada com sucesso.'
    });
  };

  return (
    <main className='flex min-h-screen flex-col p-5 gap-6'>
      <div className='flex flex-col'>
        <h1 className='text-[44px] font-[900]'>Suas Reviews</h1>
        <h3 className='text-[16px] font-light italic'>Todas suas opiniões ruins</h3>
      </div>

      <Separator />

      <div className='flex flex-col gap-2 items-center'>
        {reviews.map((review: any) => (
          <div className='flex w-full max-w-[600px] flex-col gap-4'>
            <div className='flex flex-col gap-3 p-3 bg-neutral-700 rounded-sm'>
              <div className='flex justify-between w-full'>
                <div className='flex flex-col'>
                  <h3>{review?.user}</h3>
                  <span className='text-[13px]'>
                    {Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' }).format(
                      new Date(review?.createdAt)
                    )}
                  </span>
                </div>

                {review.userId === user?.id && (
                  <Trash
                    stroke='red'
                    onClick={() => {
                      addDialog({
                        title: 'Deletar review?',
                        description: 'Tem certeza que deseja deletar esta review? Essa ação não pode ser desfeita.',
                        onContinue: () => deleteRating(review?.id)
                      });
                    }}
                    className='cursor-pointer'
                    size={20}
                  />
                )}
              </div>

              <div className='flex gap-2'>
                <div className='flex gap-2'>
                  {Array.from(Array(5)).map((_, i) => (
                    <div>
                      {i + 1 <= review?.stars ? (
                        <Star stroke='#dfdfdf' fill='#dfdfdf' />
                      ) : (
                        <Star stroke='#6d6d6d' fill='#6d6d6d' />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <p>{review?.comment}</p>

              <h1 className='text-[12px] font-bold text-neutral-100'>{review?.media}</h1>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
