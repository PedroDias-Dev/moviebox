import '@/styles/globals.css';

import PageTransition from '@/components/motion/PageTransition';
import AuthRoute from '@/components/routes/AuthRoute';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthRoute type='no-auth'>
      <PageTransition>
        <div className='flex items-center justify-center min-h-screen relative bg-neutral-900'>
          <div className='w-fit px-8 py-6 text-left bg-neutral-800 rounded-sm'>{children}</div>
        </div>
      </PageTransition>
    </AuthRoute>
  );
}
