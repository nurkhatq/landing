// components/layout/Layout.tsx
'use client';

import { ReactNode } from 'react';
import { Header } from './Header';
import { BackToTop } from './BackToTop';
import { FloatingContacts } from './FloatingContacts';
import { NotificationContainer } from '@/components/ui/Notification';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main className="pt-16 lg:pt-20">
        {children}
      </main>
      <BackToTop />
      <FloatingContacts />
      <NotificationContainer />
    </div>
  );
};