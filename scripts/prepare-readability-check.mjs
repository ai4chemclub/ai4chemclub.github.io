import { cp, readFile, writeFile } from 'node:fs/promises';

// Generate a local-only fixture; never change live browser or system settings.
// This simulates 200% root text size, not native browser zoom.
const source = new URL('../dist/', import.meta.url);
const target = new URL('../.local/readability-check/', import.meta.url);
const html = await readFile(new URL('index.html', source), 'utf8');
if (!html.includes('</head>')) throw new Error('Build the site before preparing the readability fixture.');
await cp(source, target, { recursive: true });
await writeFile(
  new URL('index.html', target),
  html.replace('</head>', '<style>html { font-size: 200%; }</style></head>'),
);
console.log('Prepared .local/readability-check with 200% root text size. Serve it locally for visual QA.');
