import { MainNavbar } from '@/app/_components/layouts/main/main-navbar';
import { SettingsFooter } from '@/app/_components/layouts/settings/settings-footer';
import { SettingsSidebar } from '@/app/_components/layouts/settings/settings-sidebar';
import { Container } from '@/lib/ui/components';
import { ReactNode } from 'react';

export function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <Container className="max-w-screen-xl">
      <div className="flex flex-col h-screen">
        <MainNavbar sidebar={<SettingsSidebar />} />
        <div className="flex flex-1 pt-4">
          <div className="hidden md:block">
            <SettingsSidebar />
          </div>
          <Container className="overflow-scroll px-4">
            <main className="flex flex-1">{children}</main>
          </Container>
        </div>
        <SettingsFooter />
      </div>
    </Container>
  );
}
