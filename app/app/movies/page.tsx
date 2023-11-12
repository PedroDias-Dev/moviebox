'use client';

import { Media } from '@/components/common/media';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useApi } from '@/hooks/useApi';
import { useEffect, useRef, useState } from 'react';

export default function Movies() {
  const { api } = useApi();
  const { toast } = useToast();

  const movieTrigger = useRef() as any;

  const [search, setSearch] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movies, setMovies] = useState<any>({});

  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  useEffect(() => {
    onSearch();
  }, [search]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const { data } = await api.get('/api/v1/movies');

      if (data) {
        // filter movies by genre
        const filtered = [] as any;

        data.map((movie: any) => {
          if (!filtered[movie.genre]) filtered[movie.genre] = [];

          filtered[movie.genre].push(movie);
        });

        setMovies(filtered);
      }
    } catch {
      toast({
        variant: 'destructive',
        title: 'Atenção!',
        description: 'Houve um erro ao processar suas informações. Por favor, tente novamente mais tarde.'
      });
    }
  };

  const onSearch = () => {
    if (search) {
      const filtered = [] as any;

      Object.keys(movies).map(key => {
        const filteredMovies = movies[key].map((movie: any) => {
          if (movie.name.toLowerCase().includes(search.toLowerCase())) filtered.push(movie);
        });

        return filteredMovies.length > 0;
      });

      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  };

  return (
    <Dialog>
      <main className='flex min-h-screen flex-col p-5 gap-6'>
        <Media media={selectedMovie} triggerRef={movieTrigger} mediaType='movies' />

        <div className='flex flex-col'>
          <h1 className='text-[44px] font-[900]'>Filmes</h1>
          <h3 className='text-[16px] font-light italic'>
            Seus filmes favoritos, ou os que vocẽ mais odeia, estão aqui
          </h3>
        </div>

        <Separator />

        <div className='flex gap-2 max-w-[500px]'>
          <Input
            type='text'
            name='search'
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            placeholder='O que você procura hoje?'
          />
        </div>

        {filteredMovies.length > 0 ? (
          <div className='flex gap-2 flex-wrap'>
            {filteredMovies.map((movie: any) => (
              <div
                onClick={() => {
                  setSelectedMovie(movie);
                  movieTrigger.current.click();
                }}
                className='flex flex-col gap-3 p-4 min-w-[200px] rounded border-solid border-zinc-700 border-2 transition-all hover:bg-zinc-700 cursor-pointer'
              >
                <div className='flex flex-col gap-1'>
                  <span className='text-[16px] font-[700]'>{movie.name}</span>
                  <p className='text-[12px] font-light'>{movie.description}</p>
                </div>

                <div className='flex gap-1'></div>
              </div>
            ))}
          </div>
        ) : (
          Object.keys(movies).map(key => (
            <div className='flex flex-col gap-3'>
              <span className='text-[18px]'>{key}</span>

              <div className='flex gap-2 overflow-x-auto'>
                {movies[key].map((movie: any) => (
                  <div
                    onClick={() => {
                      setSelectedMovie(movie);
                      movieTrigger.current.click();
                    }}
                    className='flex flex-col gap-3 p-4 min-w-[200px] rounded border-solid border-zinc-700 border-2 transition-all hover:bg-zinc-700 cursor-pointer'
                  >
                    <div className='flex flex-col gap-1'>
                      <span className='text-[16px] font-[700]'>{movie.name}</span>
                      <p className='text-[12px] font-light'>{movie.description}</p>
                    </div>

                    <div className='flex gap-1'></div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </main>
    </Dialog>
  );
}
