// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PickFrom(target: any, key: string) {
  const classType = Reflect.getMetadata('design:type', target, key);
  console.log(classType);
}
