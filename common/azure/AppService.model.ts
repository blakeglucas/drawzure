import { AzureGlobalParameters } from './GlobalParameters.model';
import { pickFrom } from './blocks/pickFrom';
import { createAzureEntity } from './createAzureEntity';
import { PickFrom } from './decorators/PickFrom';
import { Pickable } from './decorators/Pickable';

export type AppServiceCreate = AzureGlobalParameters & {
  name: string;
  plan: string;
  resourceGroup: string;
  acrUseIdentity?: boolean;
  assignIdentity?: string;
  basicAuth?: 'Disabled' | 'Enabled';
  containerImageName?: string;
  containerRegistryPassword?: string;
  containerRegistryUrl?: string;
  containerRegistryUser?: string;
  deploymentLocalGit?: string;
  deploymentSourceBranch?: string;
  deploymentSourceUrl?: string;
  httpsOnly?: boolean;
  multicontainerConfigFile?: string;
  multicontainerConfigType?: 'COMPOSE' | 'KUBE';
  publicNetworkAccess?: 'Disabled' | 'Enabled';
  role?: string;
  runtime?: string;
  scope?: string;
  startupFile?: string;
  subnet?: string;
  tags?: string;
  vnet?: string;
};

@Pickable('Microsoft.Network/virtualNetworks')
export class VirtualNetwork {}

export class AppService {
  @PickFrom
  publicNetworkAccess?: 'Disabled' | 'Enabled';
  @PickFrom
  vnet?: VirtualNetwork;
}

export const appService = createAzureEntity('Microsoft.Web/sites', {
  vnet: pickFrom('Microsoft.Network/virtualNetworks', true),
});

export const virtualNetwork = createAzureEntity(
  'Microsoft.Network/virtualNetworks',
  {},
);

export type AppServiceUpdate = AzureGlobalParameters & {
  add?: string;
  basicAuth?: 'Disabled' | 'Enabled';
  clientAffinityEnabled?: boolean;
  forceString?: boolean;
  httpsOnly?: boolean;
  ids: string;
  name?: string;
  remove?: string;
  set?: string;
  slot?: string;
};

export type AppServiceDelete = AzureGlobalParameters & {
  ids: string;
  keepDnsRegistration?: boolean;
  keepEmptyPlan?: boolean;
  keepMetrics?: boolean;
  name: string;
  resourceGroup: string;
  slot?: string;
};
