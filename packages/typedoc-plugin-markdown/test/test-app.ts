import * as path from 'path';

import * as tmp from 'tmp';
import {
  Application,
  DeclarationReflection,
  ProjectReflection,
  Renderer,
  TSConfigReader,
} from 'typedoc';

import { getUrls } from '../src/renderer/renderer';
import { setDefaultState, setState } from '../src/renderer/store';

tmp.setGracefulCleanup();

export class TestApp {
  app: Application;
  project: ProjectReflection | undefined;
  renderer: Renderer;
  urls: any;

  outDir: string;
  tmpobj: tmp.DirResult;
  entryPoints: string[];

  constructor(entryPoints = []) {
    this.app = new Application();
    this.entryPoints = entryPoints.map((inputFile: string) =>
      path.join(__dirname, './stubs/src/' + inputFile),
    );
    this.app.options.addReader(new TSConfigReader());
  }

  async bootstrap(options: any = {}) {
    this.app.bootstrap({
      entryPoints: this.entryPoints,
      plugin: [path.join(__dirname, '../dist/index')],
      tsconfig: path.join(__dirname, 'stubs', 'tsconfig.json'),
      ...options,
    });

    this.project = this.app.convert();
    if (this.project) {
      this.urls = getUrls(this.project, this.app.options.getRawValues());
      setDefaultState(this.project, this.app.options.getRawValues() as any);
    }
  }

  findReflectionByName(name: string) {
    return this.project.findReflectionByName(name) as DeclarationReflection;
  }

  getPageByModelName(name: string) {
    const match = this.urls.find((url) => url.model.name === name);
    setState({ currentUrl: match.url });
    return match;
  }

  getPageByUrl(pageUrl: string) {
    const match = this.urls.find((url) => {
      return url.url === pageUrl;
    });
    setState({ currentUrl: pageUrl });
    return match;
  }
}
