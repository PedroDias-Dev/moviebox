import '@/styles/globals.css';

import { DialogProvider } from '@/components/global/dialog/dialog';
import { LoadingProvider } from '@/components/global/loading/loading';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';

// eslint-disable-next-line prettier/prettier
import type { Metadata } from 'next';
import { AuthProvider } from '@/hooks/useAuth';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Teambet',
  description: 'Login'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/assets/icon.svg' />
        <title key='title'>{metadata.title as any}</title>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Toaster />
          <LoadingProvider>
            <DialogProvider>{children}</DialogProvider>
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
