import { auth } from '@clerk/nextjs/server';
import { MenuItem } from './header';
import { MENU_ITEM_LIST } from '../data/header-data';
import { ThemeSwitcher } from './theme-switcher';
import UserProfileButton, { UserProfileInline } from './user-profile-button';
import { SlashIcon } from '@radix-ui/react-icons';
import ChipTabNavigation from './chip-tabs';
import { AuthorizedHeaderLogo } from './AuthorizedHeaderLogo';
import { memo } from 'react';
import { HeaderSheet } from './header-sheet';

export default async function AutorizedHeader() {
  const { userId } = await auth();
  return (
    <>
      <AuthorizedHeaderLogo />
      <header className="dark:border-dark-border z-[100] flex w-full flex-col bg-background/90 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/90">
        <div className="flex h-[--header-height] items-center justify-between">
          <div className="flex items-center gap-1 pl-12">
            <SlashIcon className="h-12 text-muted-foreground" />
            <UserProfileInline className="ml-1.5" />
          </div>
          <div className="flex items-center -space-x-1">
            <nav className="relative z-[1] hidden flex-col justify-center text-muted-foreground lg:flex">
              <ul className="flex flex-1 gap-0.5 px-4">
                <MenuItems />
              </ul>
            </nav>
            <div className="hidden items-center gap-4 justify-self-end lg:flex">
              <UserProfileButton />
              <ThemeSwitcher />
            </div>
          </div>
          <HeaderSheet
            menuItems={MENU_ITEM_LIST}
            userId={userId}
            isProtectedRoute={true}
          />
        </div>
      </header>
      <ChipTabNavigation />
    </>
  );
}
const MenuItems = memo(() => (
  <>
    {MENU_ITEM_LIST.map(({ content, href, openInNew }) => (
      <li key={href}>
        <MenuItem
          content={content}
          href={href}
          openInNew={openInNew}
          className="text-sm font-normal"
        />
      </li>
    ))}
  </>
));

MenuItems.displayName = 'MenuItems';
