import * as fs from 'fs';
import * as path from 'path';

import { Application, Converter, ParameterType, Renderer } from 'typedoc';

import { render } from './renderer/render';
import MarkdownTheme from './theme';

export async function load(app: Application) {
  app.options.addDeclaration({
    help: '[Markdown Plugin] Do not render page title.',
    name: 'hidePageTitle',
    type: ParameterType.Boolean,
    defaultValue: false,
  });

  app.options.addDeclaration({
    help: '[Markdown Plugin] Do not render breadcrumbs in template.',
    name: 'hideBreadcrumbs',
    type: ParameterType.Boolean,
    defaultValue: false,
  });

  app.options.addDeclaration({
    help: '[Markdown Plugin] Specifies the base path that all links to be served from. If omitted all urls will be relative.',
    name: 'publicPath',
    type: ParameterType.String,
  });

  app.options.addDeclaration({
    help: '[Markdown Plugin] Use HTML named anchors as fragment identifiers for engines that do not automatically assign header ids. Should be set for Bitbucket Server docs.',
    name: 'namedAnchors',
    type: ParameterType.Boolean,
    defaultValue: false,
  });

  app.options.addDeclaration({
    help: '[Markdown Plugin] Output all reflections into seperate output files.',
    name: 'allReflectionsHaveOwnDocument',
    type: ParameterType.Boolean,
    defaultValue: false,
  });

  app.options.addDeclaration({
    help: '[Markdown Plugin] Separator used to format filenames.',
    name: 'filenameSeparator',
    type: ParameterType.String,
    defaultValue: '.',
  });

  app.options.addDeclaration({
    help: '[Markdown Plugin] The file name of the entry document.',
    name: 'entryDocument',
    type: ParameterType.String,
    defaultValue: 'README.md',
  });

  app.options.addDeclaration({
    help: '[Markdown Plugin] Do not render in-page table of contents items.',
    name: 'hideInPageTOC',
    type: ParameterType.Boolean,
    defaultValue: false,
  });

  app.options.addDeclaration({
    help: '[Markdown Plugin] Customise the index page title.',
    name: 'indexTitle',
    type: ParameterType.String,
  });

  app.converter.on(Converter.EVENT_BEGIN, () => {
    Renderer.getDefaultTheme = () => path.join(__dirname, 'resources');
  });

  app.renderer.render = render;

  app.converter.on(Converter.EVENT_RESOLVE_BEGIN, () => {
    const themeName = app.options.getValue('theme');

    const themeDir = path.join(__dirname);

    if (![themeDir, 'default', 'markdown'].includes(themeName)) {
      // For custom themes check that the theme is a markdown theme
      // If it is return and pass through to renderer
      const themeFileName = path.resolve(path.join(themeName, 'theme.js'));
      if (fs.existsSync(themeFileName) && isMarkdownTheme(themeFileName)) {
        return;
      }
      app.logger.warn(
        `[typedoc-plugin-markdown] '${themeName}' is not a recognised markdown theme. If an html theme is required, please disable this plugin.`,
      );
    }

    app.options.setValue('theme', themeDir);
  });
}

function isMarkdownTheme(themeFileName: string) {
  try {
    const ThemeClass = require(themeFileName).default;
    return ThemeClass.prototype instanceof MarkdownTheme;
  } catch (e) {
    return false;
  }
}
