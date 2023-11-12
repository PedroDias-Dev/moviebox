'use client';

import { Button } from '@/components/ui/button';
import { Menubar, MenubarMenu } from '@/components/ui/menubar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface UsersMenuProps {
  setPage: any;
  setRefresh: any;
  refresh: number;
  page: number;
}

const ShowsMenu = ({ setPage, setRefresh, refresh, page }: UsersMenuProps) => {
  return (
    <Menubar>
      <MenubarMenu>
        <div className='w-30'>
          <Button
            variant='link'
            onClick={() => {
              setRefresh(refresh + 1);
            }}
          >
            Refresh
          </Button>
        </div>
      </MenubarMenu>

      <MenubarMenu>
        <div className='w-[95%] flex justify-end'>
          <div className='w-40 flex justify-end gap-1'>
            <div
              className='w-7'
              onClick={() => {
                setPage(page - 1);
                setRefresh(refresh + 1);
              }}
            >
              <ChevronLeft className='cursor-pointer' />
            </div>
            <div
              className='w-6'
              onClick={() => {
                setPage(page + 1);
                setRefresh(refresh + 1);
              }}
            >
              <ChevronRight className='cursor-pointer' />
            </div>
          </div>
        </div>
      </MenubarMenu>
    </Menubar>
  );
};

export default ShowsMenu;
