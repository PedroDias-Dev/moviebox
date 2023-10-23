'use client';

import Transition from '@/components/motion/Transition';
import { Button } from '@/components/ui/button';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from '@/components/ui/menubar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UsersMenuProps {
  setPage: any;
  setRefresh: any;
  refresh: number;
  page: number;
}

const UsersMenu = ({ setPage, setRefresh, refresh, page }: UsersMenuProps) => {
  const router = useRouter();

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Options</MenubarTrigger>

        <Transition duration={0.1}>
          <MenubarContent>
            <MenubarItem
              onClick={() => {
                router.push('/admin/users/create');
              }}
            >
              New User
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Export</MenubarItem>
          </MenubarContent>
        </Transition>
      </MenubarMenu>

      <MenubarMenu>
        <div className='w-30 ml-5'>
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
        <div className='w-[90%] flex justify-end'>
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

export default UsersMenu;
