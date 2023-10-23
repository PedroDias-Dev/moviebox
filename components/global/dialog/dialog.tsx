'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { createContext, useContext, useRef, useState } from 'react';

interface DialogContextProps {
  addDialog: ({
    title,
    description,
    onContinue
  }: {
    title: string;
    description: string;
    onContinue: () => void;
  }) => void;
}

const DialogContext = createContext<DialogContextProps>({
  addDialog: () => {}
});

export const useDialog = () => useContext(DialogContext);

export const DialogProvider = ({ children }: any) => {
  const triggerRef = useRef(null) as any;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [onContinue, setOnContinue] = useState(() => () => {});

  const contextValue = {
    addDialog: ({ title, description, onContinue }: { title: string; description: string; onContinue: () => void }) => {
      setTitle(title);
      setDescription(description);
      setOnContinue(() => onContinue);

      triggerRef.current.click();
    }
  };

  return (
    <DialogContext.Provider value={contextValue}>
      <div className='absolute'>
        <AlertDialog>
          <AlertDialogTrigger ref={triggerRef} />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onContinue()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {children}
    </DialogContext.Provider>
  );
};
