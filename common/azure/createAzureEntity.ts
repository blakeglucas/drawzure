import { AzureGlobalParameters } from './GlobalParameters.model';

export type AzureProperty<T> = {
  optional?: boolean;
  value?: T;
};

export type AzureEntity = {
  id: string;
  global?: AzureGlobalParameters;
  properties: { [key: string]: AzureProperty<unknown> };
};

export function createAzureEntity(
  symbolicName: string,
  properties: { [key: string]: AzureProperty<unknown> },
): AzureEntity {
  return {
    id: symbolicName,
    properties,
  };
}
