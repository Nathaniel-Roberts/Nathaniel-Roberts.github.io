import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
  return (tree, file) => {
    const text = toString(tree);
    const words = text.split(/\s+/).filter(Boolean).length;
    const fm = file.data.astro.frontmatter;
    fm.words = words;
    fm.minutesRead = Math.max(1, Math.round(words / 230));
  };
}
