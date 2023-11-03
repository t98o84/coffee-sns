import { MainFooter } from '@/app/_components/layouts/main/main-footer';
import { MainNavbar } from '@/app/_components/layouts/main/main-navbar';
import { ReactNode } from 'react';

export interface DefaultLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto max-w-screen-xl">
        <MainNavbar />
      </div>
      <main className="flex flex-1">{children}</main>
      <MainFooter />
    </div>
  );
}
