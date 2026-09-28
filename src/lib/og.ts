import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { SITE } from '../site';

const font = (pkg: string, file: string) => fs.readFileSync(path.resolve('node_modules/@fontsource', pkg, 'files', file));
const fonts = [
  { name: 'Inter', data: font('inter', 'inter-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'Inter', data: font('inter', 'inter-latin-700-normal.woff'), weight: 700 as const, style: 'normal' as const },
  { name: 'JetBrains Mono', data: font('jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff'), weight: 500 as const, style: 'normal' as const },
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

export async function renderOg({ title, description = '', eyebrow, footer }: OgInput): Promise<Buffer> {
  const titleSize = title.length > 70 ? 46 : title.length > 40 ? 56 : 68;
  const desc = description.length > 150 ? description.slice(0, 147).trimEnd() + '...' : description;

  const tree = h(
    'div',
    {
      style: {
        width: '1200px', height: '630px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '64px 72px', background: '#0b0c0f', color: '#e7e5e4', fontFamily: 'Inter',
        backgroundImage: 'radial-gradient(circle at 88% 115%, rgba(52,211,153,0.28), rgba(52,211,153,0) 55%)',
      },
    },
    h('div', { style: { display: 'flex', fontFamily: 'JetBrains Mono', fontSize: 26, color: '#34d399' } }, `$ ${eyebrow}`),
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: 24 } },
      h('div', { style: { display: 'flex', fontSize: titleSize, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#fafaf9' } }, title),
      desc ? h('div', { style: { display: 'flex', fontSize: 28, lineHeight: 1.4, color: '#a8a29e' } }, desc) : h('div', { style: { display: 'flex' } }, ''),
    ),
    h(
      'div',
      { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'JetBrains Mono', fontSize: 24, color: '#7c7f88' } },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
        h('div', { style: { width: 14, height: 14, borderRadius: 7, background: '#34d399' } }, ''),
        h('div', { style: { display: 'flex' } }, `${SITE.name}  ·  ${SITE.domain}`),
      ),
      h('div', { style: { display: 'flex' } }, footer ?? ''),
    ),
  );

  const svg = await satori(tree as any, { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
