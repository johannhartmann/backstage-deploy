import React, { PropsWithChildren } from 'react';
import { Sidebar, SidebarPage, SidebarItem, SidebarSpace, SidebarDivider } from '@backstage/core-components';
import HomeIcon from '@material-ui/icons/Home';
import CreateComponentIcon from '@material-ui/icons/AddCircleOutline';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import SearchIcon from '@material-ui/icons/Search';

export const Root = ({ children }: PropsWithChildren<{}>) => (
  <SidebarPage>
    <Sidebar>
      <SidebarItem icon={HomeIcon} to="catalog" text="Home" />
      <SidebarItem icon={CreateComponentIcon} to="create" text="Create..." />
      <SidebarItem icon={LibraryBooks} to="docs" text="Docs" />
      <SidebarItem icon={SearchIcon} to="search" text="Search" />
      <SidebarDivider />
      <SidebarSpace />
    </Sidebar>
    {children}
  </SidebarPage>
);
