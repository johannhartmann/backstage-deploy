import React, { PropsWithChildren } from 'react';
import { Sidebar, SidebarPage, SidebarItem, SidebarSpace, SidebarDivider, SidebarGroup } from '@backstage/core-components';
import HomeIcon from '@material-ui/icons/Home';
import CreateComponentIcon from '@material-ui/icons/AddCircleOutline';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import SearchIcon from '@material-ui/icons/Search';
import ExtensionIcon from '@material-ui/icons/Extension';
import HighlightIcon from '@material-ui/icons/Highlight';
import DescriptionIcon from '@material-ui/icons/Description';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export const Root = ({ children }: PropsWithChildren<{}>) => (
  <SidebarPage>
    <Sidebar>
      <SidebarGroup label="Menu">
        <SidebarItem icon={HomeIcon} to="catalog" text="Home" />
        <SidebarItem icon={ExtensionIcon} to="api-docs" text="APIs" />
        <SidebarItem icon={LibraryBooks} to="docs" text="Docs" />
        <SidebarItem icon={CreateComponentIcon} to="create" text="Create..." />
        <SidebarItem icon={CloudUploadIcon} to="catalog-import" text="Import" />
      </SidebarGroup>
      <SidebarDivider />
      <SidebarGroup label="Tools">
        <SidebarItem icon={HighlightIcon} to="lighthouse" text="Lighthouse" />
        <SidebarItem icon={DescriptionIcon} to="adr" text="ADRs" />
        <SidebarItem icon={SearchIcon} to="search" text="Search" />
      </SidebarGroup>
      <SidebarDivider />
      <SidebarSpace />
    </Sidebar>
    {children}
  </SidebarPage>
);
