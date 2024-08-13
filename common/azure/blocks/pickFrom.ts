import { AzureProperty } from '../createAzureEntity';

export type PickFromProperty<T> = AzureProperty<T> & {
  pickListName: string;
};

export function pickFrom<T>(
  pickListName: string,
  optional?: boolean,
): PickFromProperty<T> {
  return {
    pickListName,
    optional,
  };
}
