import { Comment } from 'typedoc/dist/lib/models';
import { MarkdownBuilder } from '../../markdown-tools/builder';
import { backTicks, bold, link } from '../../markdown-tools/elements';
import { useState } from '../store';
import { RelativeUrlComponent } from './relative-url';

const URL_PREFIX = /^(http|ftp)s?:\/\//;
const BRACKETS = /\[\[([^\]]+)\]\]/g;
const INLINE_TAG =
  /(?:\[(.+?)\])?\{@(link|linkcode|linkplain)\s+((?:.|\n)+?)\}/gi;

export function CommentsComponent(model: Comment) {
  const md = new MarkdownBuilder();

  if (model.hasVisibleComponent()) {
    if (model.shortText) {
      md.add(comment(model.shortText));
    }
    if (model.text) {
      md.add(comment(model.text));
    }
    if (model.tags) {
      const tags = model.tags.map(
        (tag) =>
          bold(backTicks(tag.tagName)) +
          (tag.text
            ? comment((tag.text.startsWith('\n') ? '' : ' ') + tag.text)
            : ''),
      );
      md.add(tags.join('\n\n'));
    }
  }
  return md.print();
}

export function comment(text: string) {
  return replaceInlineTags(replaceBrackets(text));
}

function replaceBrackets(text: string) {
  return text.replace(BRACKETS, (match: string, content: string): string => {
    const split = splitLinkText(content);
    return buildLink(match, split.target, split.caption);
  });
}
function replaceInlineTags(text: string): string {
  return text.replace(
    INLINE_TAG,
    (match: string, leading: string, tagName: string, content: string) => {
      const split = splitLinkText(content);
      const target = split.target;
      const caption = leading || split.caption;
      return buildLink(match, target, caption, tagName === 'linkcode');
    },
  );
}

function buildLink(
  original: string,
  target: string,
  caption: string,
  monospace = false,
) {
  if (!URL_PREFIX.test(target)) {
    const { project } = useState();
    const reflection = project.findReflectionByName(target);
    if (reflection && reflection.url) {
      if (URL_PREFIX.test(reflection.url)) {
        target = reflection.url;
      } else {
        target = RelativeUrlComponent(reflection.url);
      }
    } else {
      return original;
    }
  }
  if (monospace) {
    caption = backTicks(caption);
  }
  return link(caption, target);
}

function splitLinkText(text: string) {
  let splitIndex = text.indexOf('|');
  if (splitIndex === -1) {
    splitIndex = text.search(/\s/);
  }
  if (splitIndex !== -1) {
    return {
      caption: text
        .substr(splitIndex + 1)
        .replace(/\n+/, ' ')
        .trim(),
      target: text.substr(0, splitIndex).trim(),
    };
  } else {
    return {
      caption: text,
      target: text,
    };
  }
}
