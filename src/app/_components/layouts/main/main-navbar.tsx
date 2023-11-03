'use client';

import { SignOutButton } from '@/features/auth/shared/ui/components/buttons/sign-out-button';
import { makeAppConfig } from '@/lib/config/client';
import {
  Avatar,
  Button,
  CoffassIcon,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalProps,
  Navbar as NavbarBase,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from '@/lib/ui/components';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { ReactNode, SVGProps, useState } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { HiMenuAlt1 } from 'react-icons/hi';

export interface DefaultNavbarProps {
  sidebar?: ReactNode;
}

export function MainNavbar({ sidebar }: DefaultNavbarProps) {
  const appConfig = makeAppConfig();
  const { data: session } = useSession();
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      {sidebar && (
        <Sidebar show={openSidebar} onClose={() => setOpenSidebar(false)}>
          {sidebar}
        </Sidebar>
      )}

      <NavbarBase fluid rounded>
        <div className="flex gap-1">
          {sidebar && (
            <HiMenuAlt1
              className="h-8 w-8 shrink-0 text-gray-500 md:hidden"
              onClick={() => setOpenSidebar(true)}
            />
          )}
          <NavbarBrand href={appConfig.appUrl} className="pl-4 md:pl-0">
            <CoffassIcon className="hidden sm:block pr-1 text-xl" />
            <span className="self-center whitespace-nowrap text-xl font-semibold ">
              {appConfig.appName}
            </span>
          </NavbarBrand>
        </div>

        <div className="flex gap-1 md:order-2">
          <NavbarToggle
            barIcon={(props: SVGProps<SVGElement>) => (
              <FaEllipsisVertical {...props} />
            )}
          />
          {session === undefined ? null : session ? (
            <UserAvatar session={session} />
          ) : (
            <GetStartedButton />
          )}
        </div>
        <NavbarCollapse>
          {/* TODO: Update menu items */}
          <NavbarLink href="#" active>
            Home
          </NavbarLink>
          <NavbarLink href="#">About</NavbarLink>
          <NavbarLink href="#">Services</NavbarLink>
          <NavbarLink href="#">Pricing</NavbarLink>
          <NavbarLink href="#">Contact</NavbarLink>
        </NavbarCollapse>
      </NavbarBase>
    </>
  );
}

function Sidebar({
  show,
  onClose,
  children,
  ...props
}: { show: boolean; onClose: () => void; children: ReactNode } & ModalProps) {
  return (
    <div>
      <div
        className={`bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30 w-full h-full ${
          show ? '' : 'hidden'
        }`}
        onClick={onClose}
      />
      <div
        {...props}
        className={`fixed top-0 left-0 z-40 w-fit h-screen overflow-y-auto transition-transform bg-white ${
          show ? 'transform-none' : '-translate-x-full'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function GetStartedButton() {
  return (
    <>
      <Button gradientDuoTone="purpleToBlue" size="sm">
        無料で試してみる
      </Button>
      <NavbarToggle />
    </>
  );
}

function UserAvatar({ session }: { session: Session }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex">
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar
            alt="User avatar"
            img={session.user.avatarUrl}
            rounded
            size="sm"
          />
        }
      >
        <DropdownHeader>
          <span className="block truncate text-sm">{session.user.name}</span>
          <span className="block truncate text-sm ">
            @{session.user.username}
          </span>
        </DropdownHeader>
        <DropdownItem href="/settings">設定</DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={() => setOpenModal(true)}>
          ログアウト
        </DropdownItem>
      </Dropdown>
      <ConfirmLogoutModal
        show={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}

function ConfirmLogoutModal(props: ModalProps) {
  return (
    <Modal position="top-center" {...props}>
      <ModalBody>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            ログアウトしてもよろしいですか？
          </p>
        </div>
      </ModalBody>
      <ModalFooter className="justify-end">
        <Button color="gray" onClick={props.onClose}>
          キャンセル
        </Button>
        <SignOutButton />
      </ModalFooter>
    </Modal>
  );
}
