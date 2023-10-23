import { Button } from '@/components/ui/button';
import { firestore } from '@/libs/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { Suspense, useEffect, useState } from 'react';

const Championships = ({ nextStep, previousStep }: any) => {
  const [championships, setChampionships] = useState<any>([]);
  const [selectedChampionships, setSelectedChampionships] = useState<any>([]);

  useEffect(() => {
    getChampionships();
  }, []);

  const getChampionships = async () => {
    let q = query(collection(firestore, 'championships'));

    getDocs(q).then((querySnapshot): any => {
      setChampionships(
        querySnapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    });
  };

  return (
    <div className='w-full flex flex-col gap-5'>
      <div className='flex-col flex gap-1'>
        <span className='text-base text-secondary-100 max-w-xl'>
          Choose the championships that you want to bet on. On the free plan, you can add up to{' '}
          <strong className='text-primary-300'>2 leagues</strong>.
        </span>

        <span className='text-sm text-secondary-200 max-w-xl'>You can also add your own league and matches later!</span>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <div className='flex gap-4 flex-wrap min-h-30 max-w-xl'>
          {championships.map((championship: any, index: any) => (
            <div
              key={index}
              className={`w-fit min-w-[125px] h-30 p-4 border ${
                selectedChampionships.find((c: any) => c.id === championship.id) ? 'bg-primary-500' : 'bg-transparent'
              } border-primary-300 rounded-md flex flex-col gap-2 cursor-pointer transition-all shadow-xl 
            hover:bg-primary-300 hover:border-primary-500 hover:shadow-none hover:text-secondary-100
            `}
              onClick={() => {
                if (selectedChampionships.find((c: any) => c.id === championship.id)) {
                  setSelectedChampionships(selectedChampionships.filter((c: any) => c.id !== championship.id));
                  return;
                }

                if (selectedChampionships.length === 2) return;

                setSelectedChampionships([...selectedChampionships, championship]);
              }}
            >
              <span className='text-xl text-secondary-100'>{championship.name}</span>
              <span className='text-sm text-secondary-200'>{championship.region}</span>
            </div>
          ))}
        </div>
      </Suspense>

      <div className='flex justify-between items-center'>
        <Button type='button' variant='outline' size='lg' onClick={previousStep}>
          Back
        </Button>

        <Button
          type='button'
          variant='default'
          size='lg'
          onClick={() => {
            nextStep({ championships: selectedChampionships });
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Championships;
