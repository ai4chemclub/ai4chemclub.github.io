// Rotation adapted from Zdog v1.1.3 Vector.rotateY / rotateProperty.
// Copyright 2020 Metafizzy. MIT; see public/licenses/Zdog-MIT.txt.
// https://github.com/metafizzy/zdog/blob/f1457937b4927723fef7ccc0fb59cb4dac2cdf46/js/vector.js
export interface Point { x: number; y: number; z: number }

export function rotateY(point: Point, angle: number): Point {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: point.x * cos - point.z * sin, y: point.y, z: point.z * cos + point.x * sin };
}

// Orthographic projection preserves the existing drawing at angle zero.
export function project(point: Point, angle: number): Point {
  const rotated = rotateY({ x: point.x - 280, y: point.y - 200, z: point.z }, angle);
  return { x: rotated.x + 280, y: rotated.y + 200, z: rotated.z };
}

export const TURN_MS = 32_000;
export function advanceAngle(angle: number, elapsedMs: number): number {
  // Avoid a jump after a stalled frame; normal speed is independent of refresh rate.
  return (angle + Math.max(0, Math.min(elapsedMs, 100)) / TURN_MS * Math.PI * 2) % (Math.PI * 2);
}
