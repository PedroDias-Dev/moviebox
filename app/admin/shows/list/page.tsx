'use client';

import { Sheet } from '@/components/ui/sheet';

import { Suspense, useEffect, useState } from 'react';
import ShowsMenu from './components/menu';
import MoviesUpdate from './components/update';
import ShowsTable from './components/table';
import ShowsLoading from './components/loading';
import { Popcorn } from 'lucide-react';
import { useApi } from '@/hooks/useApi';

function Shows() {
  const { api } = useApi();
  const [refresh, setRefresh] = useState(0);
  const [page, setPage] = useState(1);

  const [shows, setShows] = useState<any>([]);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    getShows();
  }, [refresh]);

  const getShows = async () => {
    const { data } = await api.get('/api/v1/series');

    if (data) {
      setShows(data);
    }
  };

  return (
    <Sheet>
      <div className='col-span-1 flex flex-col'>
        <div className='p-5'>
          <h1 className='text-4xl font-extrabold flex gap-2 items-center'>
            <Popcorn size={32} />
            Todas Séries
          </h1>
        </div>

        <div className='w-full h-[calc(100vh-80px)] rounded-t-lg bg-neutral-750 p-5'>
          <ShowsMenu page={page} setPage={setPage} refresh={refresh} setRefresh={setRefresh} />

          <Suspense fallback={<ShowsLoading />}>
            <ShowsTable data={shows} setSelectedShow={setSelectedShow} getData={getShows} />
          </Suspense>
        </div>
      </div>

      {selectedShow && <MoviesUpdate getData={getShows} selectedShow={selectedShow} setRefresh={setRefresh} />}
    </Sheet>
  );
}

export default Shows;
