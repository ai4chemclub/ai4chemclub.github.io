import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { project, rotateY, advanceAngle, TURN_MS } from '../src/scripts/molecule-geometry.ts';

const svg = readFileSync(new URL('../public/illustrations/science-network.svg', import.meta.url), 'utf8');
const atoms = [...svg.matchAll(/<circle cx="(\d+)" cy="(\d+)" r="(\d+)"[^>]*data-depth="(-?\d+)"/g)]
  .map(([, x, y, r, z]) => ({ x: +x, y: +y, r: +r, z: +z }));

test('the complete turn keeps the illustration within its panel and clear of the network', () => {
  assert.equal(atoms.length, 15);
  for (let step = 0; step <= 360; step++) {
    for (const atom of atoms) {
      const p = project(atom, step * Math.PI / 180);
      assert.ok(p.x - atom.r > 35 && p.x + atom.r < 550);
      assert.ok(p.y - atom.r > 15 && p.y + atom.r < 405);
    }
  }
  const bonds = [...svg.matchAll(/data-bond="(\d+) (\d+)"/g)];
  assert.equal(bonds.length, 18);
  for (const [, from, to] of bonds) {
    assert.ok(atoms[+from] && atoms[+to] && from !== to);
  }
});

test('rotation is rigid and a full turn restores the initial drawing', () => {
  for (const atom of atoms) {
    const p = rotateY(atom, 1.234);
    assert.ok(Math.abs(Math.hypot(p.x, p.y, p.z) - Math.hypot(atom.x, atom.y, atom.z)) < 1e-9);
    const end = project(atom, 2 * Math.PI);
    assert.ok(Math.abs(end.x - atom.x) < 1e-9 && end.y === atom.y);
  }
});

test('32-second rotation is refresh-rate independent and stalls do not cause jumps', () => {
  for (const fps of [30, 60, 120]) {
    let angle = 0;
    for (let i = 0; i < fps * TURN_MS / 1000; i++) angle = advanceAngle(angle, 1000 / fps);
    assert.ok(Math.abs(Math.sin(angle)) < 1e-9);
  }
  assert.equal(advanceAngle(0, 30_000), advanceAngle(0, 100));
  assert.equal(advanceAngle(1, -1), 1);
});
