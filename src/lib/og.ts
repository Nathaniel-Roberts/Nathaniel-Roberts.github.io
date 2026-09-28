import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { SITE } from '../site';

const font = (pkg: string, file: string) => fs.readFileSync(path.resolve('node_modules/@fontsource', pkg, 'files', file));
const fonts = [
  { name: 'IBM Plex Sans', data: font('ibm-plex-sans', 'ibm-plex-sans-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'IBM Plex Sans', data: font('ibm-plex-sans', 'ibm-plex-sans-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const },
  { name: 'IBM Plex Mono', data: font('ibm-plex-mono', 'ibm-plex-mono-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
];

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, props: Record<string, unknown>, ...children: (Node | string)[]): Node => ({
  type,
  props: { ...props, children: children.length === 1 ? children[0] : children },
});

export interface OgInput {
  title: string;
  description?: string;
  eyebrow: string;
  footer?: string;
}

// Blue-black ground, amber rule, Plex. Same tokens as the site.
export async function renderOg({ title, description = '', eyebrow, footer }: OgInput): Promise<Buffer> {
  const titleSize = title.length > 70 ? 46 : title.length > 40 ? 56 : 66;
  const desc = description.length > 150 ? description.slice(0, 147).trimEnd() + '...' : description;

  const tree = h(
    'div',
    { style: { width: '1200px', height: '630px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '60px 72px 56px', background: '#0f1115', color: '#e6e8eb', fontFamily: 'IBM Plex Sans' } },
    h('div', { style: { display: 'flex', fontFamily: 'IBM Plex Mono', fontSize: 26, color: '#7d858f' } }, h('div', { style: { display: 'flex', color: '#e0a458', marginRight: 14 } }, '$'), h('div', { style: { display: 'flex' } }, eyebrow)),
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: 22 } },
      h('div', { style: { display: 'flex', width: 72, height: 3, background: '#e0a458' } }, ''),
      h('div', { style: { display: 'flex', fontSize: titleSize, fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.015em', color: '#f4f5f7' } }, title),
      desc ? h('div', { style: { display: 'flex', fontSize: 27, lineHeight: 1.4, color: '#a6adb7' } }, desc) : h('div', { style: { display: 'flex' } }, ''),
    ),
    h(
      'div',
      { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'IBM Plex Mono', fontSize: 23, color: '#7d858f', paddingTop: 22, borderTop: '1px solid #262b33' } },
      h('div', { style: { display: 'flex', gap: 28 } }, h('div', { style: { display: 'flex', color: '#a6adb7' } }, SITE.name), h('div', { style: { display: 'flex' } }, SITE.domain)),
      h('div', { style: { display: 'flex' } }, footer ?? ''),
    ),
  );

  const svg = await satori(tree as any, { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
