import '@/styles/globals.css';

import PageTransition from '@/components/motion/PageTransition';
import AuthRoute from '@/components/routes/AuthRoute';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthRoute type='no-auth'>
      <PageTransition>
        <div className='flex items-center justify-center min-h-screen relative bg-primary-800'>
          <div className='w-fit px-8 py-6 text-left bg-primary-700 shadow-lg rounded-md'>{children}</div>
        </div>
      </PageTransition>
    </AuthRoute>
  );
}
