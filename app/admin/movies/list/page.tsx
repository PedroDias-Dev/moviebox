'use client';

import { Sheet } from '@/components/ui/sheet';

import { Suspense, useEffect, useState } from 'react';
import MoviesMenu from './components/menu';
import MoviesUpdate from './components/update';
import MoviesTable from './components/table';
import MoviesLoading from './components/loading';
import { Clapperboard, User } from 'lucide-react';
import { useApi } from '@/hooks/useApi';

function Movies() {
  const { api } = useApi();
  const [refresh, setRefresh] = useState(0);
  const [page, setPage] = useState(1);

  const [movies, setMovies] = useState<any>([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    getMovies();
  }, [refresh]);

  const getMovies = async () => {
    const { data } = await api.get('/api/v1/movies');

    if (data) {
      setMovies(data);
    }
  };

  return (
    <Sheet>
      <div className='col-span-1 flex flex-col'>
        <div className='p-5'>
          <h1 className='text-4xl font-extrabold flex gap-2 items-center'>
            <Clapperboard size={32} />
            Todos Filmes
          </h1>
        </div>

        <div className='w-full h-[calc(100vh-80px)] rounded-t-lg bg-neutral-750 p-5'>
          <MoviesMenu page={page} setPage={setPage} refresh={refresh} setRefresh={setRefresh} />

          <Suspense fallback={<MoviesLoading />}>
            <MoviesTable data={movies} setSelectedMovie={setSelectedMovie} getData={getMovies} />
          </Suspense>
        </div>
      </div>

      {selectedMovie && <MoviesUpdate getData={getMovies} selectedMovie={selectedMovie} setRefresh={setRefresh} />}
    </Sheet>
  );
}

export default Movies;
