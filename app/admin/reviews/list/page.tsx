'use client';

import { Sheet } from '@/components/ui/sheet';

import { Suspense, useEffect, useState } from 'react';
import ShowsMenu from './components/menu';
import ReviewsTable from './components/table';
import ShowsLoading from './components/loading';
import { Popcorn, StarHalf } from 'lucide-react';
import { useApi } from '@/hooks/useApi';

function Reviews() {
  const { api } = useApi();
  const [refresh, setRefresh] = useState(0);
  const [page, setPage] = useState(1);

  const [reviews, setReviews] = useState<any>([]);

  useEffect(() => {
    getReviews();
  }, [refresh]);

  const getReviews = async () => {
    const { data } = await api.get('/api/v1/all/ratings');

    if (data) {
      setReviews(data);
    }
  };

  return (
    <Sheet>
      <div className='col-span-1 flex flex-col'>
        <div className='p-5'>
          <h1 className='text-4xl font-extrabold flex gap-2 items-center'>
            <StarHalf size={32} />
            Todas Reviews
          </h1>
        </div>

        <div className='w-full h-[calc(100vh-80px)] rounded-t-lg bg-neutral-750 p-5'>
          <ShowsMenu page={page} setPage={setPage} refresh={refresh} setRefresh={setRefresh} />

          <Suspense fallback={<ShowsLoading />}>
            <ReviewsTable data={reviews} getData={getReviews} />
          </Suspense>
        </div>
      </div>
    </Sheet>
  );
}

export default Reviews;
