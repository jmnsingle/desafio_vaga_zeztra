import { Repository } from '../repositories/repository';
import { Registry } from './registry';

export const DEPENDENCY_NAMES = {
  REPOSITORY: 'repository',
};

export function loadDependencies() {
  const registry = Registry.getInstance();
  registry.inject(DEPENDENCY_NAMES.REPOSITORY, new Repository());
}
