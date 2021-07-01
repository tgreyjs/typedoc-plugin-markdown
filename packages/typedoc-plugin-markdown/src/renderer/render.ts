import * as path from 'path';

import ProgressBar from 'progress';
import {
  DeclarationReflection,
  ProjectReflection,
  Reflection,
  ReflectionKind,
  UrlMapping,
} from 'typedoc';
import { RendererEvent } from 'typedoc/dist/lib/output/events';
import { TemplateMapping } from 'typedoc/dist/lib/output/themes/DefaultTheme';

import { setDefaultState, setState } from './store';
import { PluginOptions } from './types';

export async function render(
  project: ProjectReflection,
  outputDirectory: string,
) {
  if (
    !this.prepareTheme() ||
    !(await this.prepareOutputDirectory(outputDirectory))
  ) {
    return;
  }

  const output = new RendererEvent(
    RendererEvent.BEGIN,
    outputDirectory,
    project,
  );

  const options =
    this.application.options.getRawValues() as unknown as Partial<PluginOptions>;

  output.settings = options;
  output.urls = getUrls(project, options);
  if (output.urls) {
    setDefaultState(project, options);

    if (output.urls) {
      const bar = new ProgressBar('Rendering [:bar] :percent', {
        total: output.urls.length,
        width: 40,
      });
      this.trigger(output);
      if (!output.isDefaultPrevented) {
        output.urls?.forEach((mapping: UrlMapping, i) => {
          const page = output.createPageEvent(mapping);
          setState({ currentModel: page.model, currentUrl: page.url });
          this.renderDocument(page);
          bar.tick();
        });
        this.trigger(RendererEvent.END, output);
      }

      setState(null);
    }
  }
}

export function getUrls(
  project: ProjectReflection,
  options: any,
): UrlMapping[] {
  const urls: UrlMapping[] = [];
  const noReadmeFile = options.readme == path.join(process.cwd(), 'none');
  if (noReadmeFile) {
    project.url = options.entryDocument;
    urls.push(new UrlMapping(options.entryDocument, project, 'reflection.hbs'));
  } else {
    project.url = 'modules.md';
    urls.push(new UrlMapping('modules.md', project, 'reflection.hbs'));
    urls.push(new UrlMapping(options.entryDocument, project, 'readme.hbs'));
  }
  project.children?.forEach((child: Reflection) => {
    if (child instanceof DeclarationReflection) {
      buildUrls(child as DeclarationReflection, urls);
    }
  });
  return urls;
}

function buildUrls(
  reflection: DeclarationReflection,
  urls: UrlMapping[],
): UrlMapping[] {
  const URL_PREFIX = /^(http|ftp)s?:\/\//;
  const mapping = mappings.find((mapping) => reflection.kindOf(mapping.kind));

  if (mapping) {
    if (!reflection.url || !URL_PREFIX.test(reflection.url)) {
      const url = toUrl(mapping, reflection);
      urls.push(new UrlMapping(url, reflection, mapping.template));
      reflection.url = url;
      reflection.hasOwnDocument = true;
    }
    for (const child of reflection.children || []) {
      if (mapping.isLeaf) {
        applyAnchorUrl(child, reflection);
      } else {
        buildUrls(child, urls);
      }
    }
  } else if (reflection.parent) {
    applyAnchorUrl(reflection, reflection.parent);
  }
  return urls;
}

function toUrl(mapping: TemplateMapping, reflection: DeclarationReflection) {
  return mapping.directory + '/' + getUrl(reflection) + '.md';
}

function getUrl(reflection: Reflection, relative?: Reflection): string {
  let url = reflection.getAlias();

  if (
    reflection.parent &&
    reflection.parent !== relative &&
    !(reflection.parent instanceof ProjectReflection)
  ) {
    url = getUrl(reflection.parent, relative) + '.' + url;
  }

  return url;
}

function applyAnchorUrl(reflection: Reflection, container: Reflection) {
  const URL_PREFIX = /^(http|ftp)s?:\/\//;
  if (!reflection.url || !URL_PREFIX.test(reflection.url)) {
    const reflectionId = reflection.name.toLowerCase();
    const anchor = toAnchorRef(reflectionId);
    reflection.url = container.url + '#' + anchor;
    reflection.anchor = anchor;
    reflection.hasOwnDocument = false;
  }
  reflection.traverse((child) => {
    if (child instanceof DeclarationReflection) {
      applyAnchorUrl(child, container);
    }
  });
}

function toAnchorRef(reflectionId: string) {
  return reflectionId;
}

const mappings = [
  {
    kind: [ReflectionKind.Module],
    isLeaf: false,
    directory: 'modules',
    template: 'reflection.hbs',
  },
  {
    kind: [ReflectionKind.Namespace],
    isLeaf: false,
    directory: 'modules',
    template: 'reflection.hbs',
  },
  {
    kind: [ReflectionKind.Enum],
    isLeaf: false,
    directory: 'enums',
    template: 'reflection.hbs',
  },
  {
    kind: [ReflectionKind.Class],
    isLeaf: false,
    directory: 'classes',
    template: 'reflection.hbs',
  },
  {
    kind: [ReflectionKind.Interface],
    isLeaf: false,
    directory: 'interfaces',
    template: 'reflection.hbs',
  },
];
