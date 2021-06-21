import {
  DeclarationReflection,
  ProjectReflection,
  TypeDocOptionMap,
} from 'typedoc/dist';

export interface State {
  project: ProjectReflection;
  projectName: string;
  projectUrl: string;
  currentUrl: string;
  currentModel: DeclarationReflection | null;
  options: Partial<PluginOptions>;
  hasReadme: boolean | null;
  globalsName: string;
}

export interface PluginOptions extends TypeDocOptionMap {
  entryDocument: string;
  hideBreadcrumbs: boolean;
  publicPath: string;
  hideInPageTOC: boolean;
  indexTitle: string;
  namedAnchors: boolean;
}
