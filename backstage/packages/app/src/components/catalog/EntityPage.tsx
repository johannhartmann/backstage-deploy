import React from 'react';
import { Grid } from '@material-ui/core';
import {
  EntityAboutCard,
  EntityLinksCard,
  EntitySwitch,
  EntityOrphanWarning,
  EntityProcessingErrorsPanel,
  isOrphan,
  hasRelationWarnings,
  EntityRelationWarning,
  hasCatalogProcessingErrors,
  isComponentType,
  isKind,
} from '@backstage/plugin-catalog';
import {
  EntityApiDefinitionCard,
  EntityConsumedApisCard,
  EntityProvidedApisCard,
} from '@backstage/plugin-api-docs';
import { EntityTechdocsContent } from '@backstage/plugin-techdocs';
import { EntityKubernetesContent } from '@backstage/plugin-kubernetes';
import { EntityGithubActionsContent } from '@backstage-community/plugin-github-actions';
import { EntityLighthouseContent } from '@backstage-community/plugin-lighthouse';
import { EntityAdrContent } from '@backstage-community/plugin-adr';
import {
  EntityPrometheusContent,
  EntityPrometheusAlertCard,
} from '@roadiehq/backstage-plugin-prometheus';
import { EntityArgoCDOverviewCard, isArgocdAvailable } from '@roadiehq/backstage-plugin-argo-cd';
import { TopologyPage } from '@backstage-community/plugin-topology';
import {
  EntityLayout,
  EntityLayoutWrapper,
} from '@backstage/plugin-catalog';

const entityWarningContent = (
  <>
    <EntitySwitch>
      <EntitySwitch.Case if={isOrphan}>
        <Grid item xs={12}>
          <EntityOrphanWarning />
        </Grid>
      </EntitySwitch.Case>
    </EntitySwitch>

    <EntitySwitch>
      <EntitySwitch.Case if={hasRelationWarnings}>
        <Grid item xs={12}>
          <EntityRelationWarning />
        </Grid>
      </EntitySwitch.Case>
    </EntitySwitch>

    <EntitySwitch>
      <EntitySwitch.Case if={hasCatalogProcessingErrors}>
        <Grid item xs={12}>
          <EntityProcessingErrorsPanel />
        </Grid>
      </EntitySwitch.Case>
    </EntitySwitch>
  </>
);

const overviewContent = (
  <Grid container spacing={3} alignItems="stretch">
    {entityWarningContent}
    <Grid item md={6}>
      <EntityAboutCard variant="gridItem" />
    </Grid>
    <Grid item md={6}>
      <EntityLinksCard />
    </Grid>
    <EntitySwitch>
      <EntitySwitch.Case if={isArgocdAvailable}>
        <Grid item md={6}>
          <EntityArgoCDOverviewCard />
        </Grid>
      </EntitySwitch.Case>
    </EntitySwitch>
    <Grid item md={6}>
      <EntityPrometheusAlertCard />
    </Grid>
  </Grid>
);

const cicdContent = (
  <EntitySwitch>
    <EntitySwitch.Case>
      <EntityGithubActionsContent />
    </EntitySwitch.Case>
  </EntitySwitch>
);

const serviceEntityPage = (
  <EntityLayoutWrapper>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>
    <EntityLayout.Route path="/ci-cd" title="CI/CD">
      {cicdContent}
    </EntityLayout.Route>
    <EntityLayout.Route path="/kubernetes" title="Kubernetes">
      <EntityKubernetesContent />
    </EntityLayout.Route>
    <EntityLayout.Route path="/topology" title="Topology">
      <TopologyPage />
    </EntityLayout.Route>
    <EntityLayout.Route path="/api" title="API">
      <Grid container spacing={3} alignItems="stretch">
        <Grid item md={6}>
          <EntityProvidedApisCard />
        </Grid>
        <Grid item md={6}>
          <EntityConsumedApisCard />
        </Grid>
      </Grid>
    </EntityLayout.Route>
    <EntityLayout.Route path="/docs" title="Docs">
      <EntityTechdocsContent />
    </EntityLayout.Route>
    <EntityLayout.Route path="/monitoring" title="Monitoring">
      <EntityPrometheusContent />
    </EntityLayout.Route>
    <EntityLayout.Route path="/lighthouse" title="Lighthouse">
      <EntityLighthouseContent />
    </EntityLayout.Route>
    <EntityLayout.Route path="/adr" title="ADRs">
      <EntityAdrContent />
    </EntityLayout.Route>
  </EntityLayoutWrapper>
);

const websiteEntityPage = (
  <EntityLayoutWrapper>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>
    <EntityLayout.Route path="/ci-cd" title="CI/CD">
      {cicdContent}
    </EntityLayout.Route>
    <EntityLayout.Route path="/kubernetes" title="Kubernetes">
      <EntityKubernetesContent />
    </EntityLayout.Route>
    <EntityLayout.Route path="/topology" title="Topology">
      <TopologyPage />
    </EntityLayout.Route>
    <EntityLayout.Route path="/docs" title="Docs">
      <EntityTechdocsContent />
    </EntityLayout.Route>
    <EntityLayout.Route path="/lighthouse" title="Lighthouse">
      <EntityLighthouseContent />
    </EntityLayout.Route>
  </EntityLayoutWrapper>
);

const defaultEntityPage = (
  <EntityLayoutWrapper>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>
    <EntityLayout.Route path="/docs" title="Docs">
      <EntityTechdocsContent />
    </EntityLayout.Route>
  </EntityLayoutWrapper>
);

const componentPage = (
  <EntitySwitch>
    <EntitySwitch.Case if={isComponentType('service')}>
      {serviceEntityPage}
    </EntitySwitch.Case>
    <EntitySwitch.Case if={isComponentType('website')}>
      {websiteEntityPage}
    </EntitySwitch.Case>
    <EntitySwitch.Case>{defaultEntityPage}</EntitySwitch.Case>
  </EntitySwitch>
);

const apiPage = (
  <EntityLayoutWrapper>
    <EntityLayout.Route path="/" title="Overview">
      <Grid container spacing={3}>
        {entityWarningContent}
        <Grid item md={6}>
          <EntityAboutCard />
        </Grid>
        <Grid item md={6}>
          <EntityLinksCard />
        </Grid>
      </Grid>
    </EntityLayout.Route>
    <EntityLayout.Route path="/definition" title="Definition">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EntityApiDefinitionCard />
        </Grid>
      </Grid>
    </EntityLayout.Route>
  </EntityLayoutWrapper>
);

export const entityPage = (
  <EntitySwitch>
    <EntitySwitch.Case if={isKind('component')} children={componentPage} />
    <EntitySwitch.Case if={isKind('api')} children={apiPage} />
    <EntitySwitch.Case>{defaultEntityPage}</EntitySwitch.Case>
  </EntitySwitch>
);
