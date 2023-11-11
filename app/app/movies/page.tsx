'use client';

import { Movie } from '@/components/common/movie';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export default function Movies() {
  const movieTrigger = useRef() as any;

  const [search, setSearch] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movies, setMovies] = useState<any>({
    Terror: [
      {
        title: 'MALOU RATAO 1',
        description: 'Ele está de volta, a ratazana mais querida ....'
      },
      {
        title: 'MALOU RATAO 2',
        description: 'Ele está de volta, a ratazana mais querida ....'
      },
      {
        title: 'MALOU RATAO 3',
        description: 'Ele está de volta, a ratazana mais querida ....'
      }
    ],
    Comédia: [
      {
        title: 'pesquisa',
        description: 'Ele está de volta, a ratazana mais querida ....'
      },
      {
        title: 'MALOU RATAO 2',
        description: 'Ele está de volta, a ratazana mais querida ....'
      },
      {
        title: 'MALOU RATAO 3',
        description: 'Ele está de volta, a ratazana mais querida ....'
      }
    ],
    Ação: [
      {
        title: 'MALOU RATAO 1',
        description: 'Ele está de volta, a ratazana mais querida ....'
      },
      {
        title: 'MALOU RATAO 2',
        description: 'Ele está de volta, a ratazana mais querida ....'
      },
      {
        title: 'MALOU RATAO 3',
        description: 'Ele está de volta, a ratazana mais querida ....'
      }
    ]
  });

  useEffect(() => {
    if (search) {
      const filtered = [] as any;

      Object.keys(movies).map(key => {
        const filteredMovies = movies[key].map((movie: any) => {
          if (movie.title.toLowerCase().includes(search.toLowerCase())) filtered.push(movie);
        });

        return filteredMovies.length > 0;
      });

      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [search]);

  const onSubmit = () => {};

  return (
    <Dialog>
      <main className='flex min-h-screen flex-col p-5 gap-6'>
        <Movie triggerRef={movieTrigger} />

        <div className='flex flex-col'>
          <h1 className='text-[44px] font-[900]'>Movies</h1>
          <h3 className='text-[16px] font-light italic'>
            Seus filmes favoritos, ou os que vocẽ mais odeia, estão aqui
          </h3>
        </div>

        <Separator />

        <form onSubmit={onSubmit} className='flex gap-2 max-w-[500px]'>
          <Input
            type='text'
            name='search'
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            placeholder='O que você procura?'
          />
          <Button type='submit' variant='outline'>
            Pesquisar
          </Button>
        </form>

        {filteredMovies.length > 0 ? (
          <div className='flex gap-2 overflow-x-auto'>
            {filteredMovies.map((movie: any) => (
              <div
                onClick={() => movieTrigger.current.click()}
                className='flex flex-col gap-3 p-4 min-w-[200px] rounded border-solid border-zinc-700 border-2 transition-all hover:bg-zinc-700 cursor-pointer'
              >
                <div className='flex flex-col gap-1'>
                  <span className='text-[16px] font-[700]'>{movie.title}</span>
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
                    onClick={() => movieTrigger.current.click()}
                    className='flex flex-col gap-3 p-4 min-w-[200px] rounded border-solid border-zinc-700 border-2 transition-all hover:bg-zinc-700 cursor-pointer'
                  >
                    <div className='flex flex-col gap-1'>
                      <span className='text-[16px] font-[700]'>{movie.title}</span>
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
