'use client';

import { useDialog } from '@/components/global/dialog/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { Trash } from 'lucide-react';
import moment from 'moment';

// import { useState } from 'react';

const UsersRow = ({ user, index, setSelectedUser, triggerRef, deleteUser }: any) => {
  const { addDialog } = useDialog();
  // const [userImage, setUserImage] = useState(null);

  // useEffect(() => {
  //   // console.log(`users/${user.id}`)
  //   // const storageRef = ref(storage, `users/${user.id}`);
  //   // const userImage = getDownloadURL(storageRef).then((url) => {
  //   //     console.log("🚀 ~ file: row.tsx:19 ~ userImage ~ url:", url)

  //   // }).catch((err) => {});
  // }, [user]);

  return (
    <TableRow
      key={index}
      onClick={e => {
        if (e?.target instanceof SVGElement) return;
        e.stopPropagation();

        setSelectedUser(user);
        triggerRef.current.click();
      }}
    >
      <TableCell className='font-medium'>{user.id}</TableCell>
      {/* <TableCell>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>None</AvatarFallback>
        </Avatar>
      </TableCell> */}
      <TableCell>{user.full_name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phone || 'N/A'}</TableCell>
      <TableCell>{moment(user.created_at).format('DD/MM/YYYY HH:mm')}</TableCell>
      <TableCell className='flex justify-end'>
        <Trash
          onClick={() => {
            addDialog({
              title: 'Delete User?',
              description: 'Are you sure you want to delete this user? This action cannot be undone.',
              onContinue: () => deleteUser(user.id)
            });
          }}
          className='w-5 h-5 cursor-pointer'
          stroke='red'
        />
      </TableCell>
    </TableRow>
  );
};

export default UsersRow;
