'use client';

import { Media } from '@/components/common/media';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useApi } from '@/hooks/useApi';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Shows() {
  const { api } = useApi();
  const showTrigger = useRef() as any;

  const [search, setSearch] = useState('');
  const [filteredShows, setFilteredShows] = useState([]);
  const [shows, setShows] = useState<any>({});

  const [selectedShow, setSelectedShow] = useState<any>(null);

  useEffect(() => {
    onSearch();
  }, [search]);

  useEffect(() => {
    getShows();
  }, []);

  const getShows = async () => {
    const { data } = await api.get('/api/v1/series');

    if (data) {
      // filter series by genre
      const filtered = [] as any;

      data.map((show: any) => {
        if (!filtered[show.genre]) filtered[show.genre] = [];

        filtered[show.genre].push(show);
      });

      setShows(filtered);
    }
  };

  const onSearch = () => {
    if (search) {
      const filtered = [] as any;

      Object.keys(shows).map(key => {
        const filteredShows = shows[key].map((show: any) => {
          if (show.name.toLowerCase().includes(search.toLowerCase())) filtered.push(show);
        });

        return filteredShows.length > 0;
      });

      setFilteredShows(filtered);
    } else {
      setFilteredShows(shows);
    }
  };

  return (
    <Dialog>
      <main className='flex min-h-screen flex-col p-5 gap-6'>
        <Media media={selectedShow} triggerRef={showTrigger} mediaType='series' />

        <div className='flex flex-col'>
          <h1 className='text-[44px] font-[900]'>Séries</h1>
          <h3 className='text-[16px] font-light italic'>
            Suas séries prediletas, ou as que vocẽ mais odeia, estão aqui
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

        {filteredShows.length > 0 ? (
          <div className='flex gap-2 flex-wrap'>
            {filteredShows.map((show: any) => (
              <div
                onClick={() => {
                  setSelectedShow(show);
                  showTrigger.current.click();
                }}
                className='flex gap-3 p-4 min-w-[200px] rounded border-solid border-zinc-700 border-2 transition-all hover:bg-zinc-700 cursor-pointer'
              >
                <Image
                  className='object-contain'
                  objectFit='contain'
                  alt={show?.name}
                  width={100}
                  height={100}
                  src={show?.cover}
                />
                <div className='flex flex-col h-full justify-between'>
                  <div className='flex flex-col gap-1'>
                    <span className='text-[16px] font-[700] max-w-[180px]'>{show.name}</span>
                    <p className='text-[12px] font-light'>{show.description}</p>
                  </div>

                  <span className='text-[12px] font-[700]'>
                    {show.year} - {show.director}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          Object.keys(shows).map(key => (
            <div className='flex flex-col gap-3'>
              <span className='text-[18px]'>
                <strong>{key}</strong>{' '}
                <span className='text-[13px] text-neutral-400'>{shows[key].length} série(s)</span>
              </span>

              <div className='flex gap-2 overflow-x-auto'>
                {shows[key].map((show: any) => (
                  <div
                    onClick={() => {
                      setSelectedShow(show);
                      showTrigger.current.click();
                    }}
                    className='flex gap-3 p-4 min-w-[200px] rounded border-solid border-zinc-700 border-2 transition-all hover:bg-zinc-700 cursor-pointer'
                  >
                    <Image
                      className='object-contain'
                      objectFit='contain'
                      alt={show?.name}
                      width={100}
                      height={100}
                      src={show?.cover}
                    />
                    <div className='flex flex-col h-full justify-between'>
                      <div className='flex flex-col gap-1'>
                        <span className='text-[16px] font-[700] max-w-[180px]'>{show.name}</span>
                        <p className='text-[12px] font-light'>{show.description}</p>
                      </div>

                      <span className='text-[12px] font-[700]'>
                        {show.year} - {show.director}
                      </span>
                    </div>
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
