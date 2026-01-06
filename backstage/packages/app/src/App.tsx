import React from 'react';
import { createApp } from '@backstage/app-defaults';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import { CatalogIndexPage, CatalogEntityPage } from '@backstage/plugin-catalog';
import { ScaffolderPage } from '@backstage/plugin-scaffolder';
import { TechDocsIndexPage, TechDocsReaderPage } from '@backstage/plugin-techdocs';
import { SearchPage } from '@backstage/plugin-search';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { Route } from 'react-router-dom';
import { Root } from './components/Root';

const app = createApp();

const routes = (
  <FlatRoutes>
    <Route path="/" element={<CatalogIndexPage />} />
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route path="/catalog/:namespace/:kind/:name" element={<CatalogEntityPage />} />
    <Route path="/create" element={<ScaffolderPage />} />
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route path="/docs/:namespace/:kind/:name/*" element={<TechDocsReaderPage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/settings" element={<UserSettingsPage />} />
  </FlatRoutes>
);

export default app.createRoot(
  <AppRouter>
    <Root>{routes}</Root>
  </AppRouter>,
);
