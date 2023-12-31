'use client';

import { Sheet } from '@/components/ui/sheet';

import { Suspense, useEffect, useState } from 'react';
import UsersMenu from './components/menu';
import UsersUpdate from './components/update';
import UsersTable from './components/table';
import UsersLoading from './components/loading';
import { User } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/hooks/useAuth';

function Users() {
  const { api } = useApi();
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(0);
  const [page, setPage] = useState(1);

  const [users, setUsers] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getUsers();
  }, [refresh]);

  const getUsers = async () => {
    const { data } = await api.get('/api/v1/all/users');

    if (data) {
      const users = data.filter((item: any) => item.id !== user?.id);
      setUsers(users);
    }
  };

  return (
    <Sheet>
      <div className='col-span-1 flex flex-col'>
        <div className='p-5'>
          <h1 className='text-4xl font-extrabold flex gap-2 items-center'>
            <User size={32} />
            Todos Usuários
          </h1>
        </div>

        <div className='w-full h-[calc(100vh-80px)] rounded-t-lg bg-neutral-750 p-5'>
          <UsersMenu page={page} setPage={setPage} refresh={refresh} setRefresh={setRefresh} />

          <Suspense fallback={<UsersLoading />}>
            <UsersTable data={users} setSelectedUser={setSelectedUser} getData={getUsers} />
          </Suspense>
        </div>
      </div>

      {selectedUser && <UsersUpdate getData={getUsers} selectedUser={selectedUser} setRefresh={setRefresh} />}
    </Sheet>
  );
}

export default Users;
