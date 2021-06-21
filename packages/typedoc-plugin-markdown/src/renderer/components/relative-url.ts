import * as path from 'path';

import { useState } from '../store';

export function RelativeUrlComponent(to = '') {
  const { options, currentUrl } = useState();

  const urlPrefix = /^(http|ftp)s?:\/\//;
  if (urlPrefix.test(to)) {
    return to;
  } else {
    return options.publicPath
      ? getPublicUrl(options.publicPath, to)
      : getRelativeUrl(currentUrl, to);
  }
}

function getPublicUrl(publicPath: string, url: string) {
  return publicPath + url;
}

function getRelativeUrl(from: string, to: string) {
  const relative = path.relative(path.dirname(from), path.dirname(to));
  return path.join(relative, path.basename(to)).replace(/\\/g, '/');
}
