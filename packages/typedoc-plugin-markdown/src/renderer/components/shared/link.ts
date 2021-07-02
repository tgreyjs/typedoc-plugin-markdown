import * as path from 'path';

import { link } from '../../../markdown-tools/elements';
import { useState } from '../../store';
import { escapeChars } from '../../utils';

export function LinkComponent(label: string, to = '', escapeLabel = true) {
  label = escapeLabel ? escapeChars(label) : label;
  return link(label, getUrl(to));
}

function getUrl(to: string) {
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
