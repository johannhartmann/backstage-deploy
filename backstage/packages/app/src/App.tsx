import React from 'react';
import { createApp } from '@backstage/app-defaults';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import {
  CatalogIndexPage,
  CatalogEntityPage,
  entityPage,
} from '@backstage/plugin-catalog';
import { CatalogImportPage } from '@backstage/plugin-catalog-import';
import { ScaffolderPage } from '@backstage/plugin-scaffolder';
import { TechDocsIndexPage, TechDocsReaderPage } from '@backstage/plugin-techdocs';
import { SearchPage } from '@backstage/plugin-search';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { ApiExplorerPage } from '@backstage/plugin-api-docs';
import { LighthousePage } from '@backstage-community/plugin-lighthouse';
import { AdrPage } from '@backstage-community/plugin-adr';
import { Route } from 'react-router-dom';
import { Root } from './components/Root';
import { entityPage as customEntityPage } from './components/catalog/EntityPage';

const app = createApp();

const routes = (
  <FlatRoutes>
    <Route path="/" element={<CatalogIndexPage />} />
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route path="/catalog/:namespace/:kind/:name" element={<CatalogEntityPage />}>
      {customEntityPage}
    </Route>
    <Route path="/catalog-import" element={<CatalogImportPage />} />
    <Route path="/create" element={<ScaffolderPage />} />
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route path="/docs/:namespace/:kind/:name/*" element={<TechDocsReaderPage />} />
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/lighthouse" element={<LighthousePage />} />
    <Route path="/adr" element={<AdrPage />} />
  </FlatRoutes>
);

export default app.createRoot(
  <AppRouter>
    <Root>{routes}</Root>
  </AppRouter>,
);
