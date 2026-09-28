import { visit } from 'unist-util-visit';

// Wraps standalone images in <figure> with a caption from alt text,
// and marks external links to open safely in a new tab.
export function rehypeContent() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'a' && typeof node.properties?.href === 'string' && /^https?:\/\//.test(node.properties.href)) {
        node.properties.target = '_blank';
        node.properties.rel = 'noopener noreferrer';
      }
      if (node.tagName === 'p' && parent && node.children.length === 1 && node.children[0].tagName === 'img') {
        const img = node.children[0];
        img.properties = { ...img.properties, 'data-zoom': '' };
        const alt = img.properties?.alt;
        const children = [img];
        if (alt) children.push({ type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: String(alt) }] });
        parent.children[index] = { type: 'element', tagName: 'figure', properties: {}, children };
      }
    });
  };
}
