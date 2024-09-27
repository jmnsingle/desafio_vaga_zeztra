/* eslint-disable @typescript-eslint/no-explicit-any */
import { Registry } from './registry';

export function inject(name: string) {
  return (targetArg: any, propertyKeyParam: string) => {
    const target = targetArg;
    target[propertyKeyParam] = new Proxy(
      {},
      {
        get(_: any, propertyKey: string) {
          const dependency = Registry.getInstance().get(name);
          return dependency[propertyKey];
        },
      }
    );
  };
}
