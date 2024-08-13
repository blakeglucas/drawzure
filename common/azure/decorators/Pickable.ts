import 'reflect-metadata';

const pickableMappings: Record<string, string> = {};

export function Pickable(symbolicName: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any) => {
    pickableMappings[target.name] = symbolicName;
    console.log(pickableMappings);
  };
}
