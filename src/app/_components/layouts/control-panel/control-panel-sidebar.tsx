'use client';

import {
  Sidebar as SidebarBase,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from '@/lib/ui/components';
import { usePathname } from 'next/navigation';
import { HiUser } from 'react-icons/hi';

export function ControlPanelSidebar() {
  const pathname = usePathname();
  return (
    <SidebarBase
      theme={{
        root: {
          inner: 'h-full overflow-y-auto overflow-x-hidden rounded py-4 px-3',
        },
      }}
    >
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem
            icon={HiUser}
            {...generateProps({ href: '/auth/settings/profile', pathname })}
          >
            プロフィール
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </SidebarBase>
  );
}

function generateProps({ href, pathname }: { href: string; pathname: string }) {
  if (href === pathname) {
    return {
      href,
      active: true,
      as: 'span',
    };
  }

  return { href };
}
