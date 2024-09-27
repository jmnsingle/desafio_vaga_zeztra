/* eslint-disable @typescript-eslint/no-explicit-any */
export class Registry {
  private dependencies: { [name: string]: any };

  static instance: Registry;

  private constructor() {
    this.dependencies = new Map<string, any>();
  }

  inject<T>(name: string, dependency: T) {
    this.dependencies[name] = dependency;
  }

  get<T = any>(name: string) {
    return this.dependencies[name] as T;
  }

  static getInstance() {
    if (!Registry.instance) {
      Registry.instance = new Registry();
    }
    return Registry.instance;
  }
}
