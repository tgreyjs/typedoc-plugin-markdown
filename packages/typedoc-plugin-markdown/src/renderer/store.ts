import { ProjectReflection } from 'typedoc';

import { PluginOptions, State } from './types';

const state: State = {
  project: new ProjectReflection(''),
  currentModel: null,
  hasReadme: null,
  currentUrl: '',
  projectName: '',
  globalsName: '',
  projectUrl: '',
  options: {},
};

export const useState = () => state;

export function setDefaultState(
  project: ProjectReflection,
  options: Partial<PluginOptions>,
) {
  setState({
    projectName: project.name,
    projectUrl: project.url,
    project: project,
    globalsName:
      options.entryPoints && options.entryPoints.length > 1
        ? 'Modules'
        : 'Exports',
    options: options,
    hasReadme: options.readme !== 'none',
  });
}

export function setState(nextState) {
  Object.assign(state, nextState);
}
