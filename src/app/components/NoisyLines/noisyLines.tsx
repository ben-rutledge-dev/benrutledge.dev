'use client';

import { useEffect, useRef, useCallback } from 'react';
import { createNoise3D } from 'simplex-noise';

const SPACING = 40;      // fixed px between line anchors
const LINE_LENGTH = 25;
const MOUSE_RADIUS = 140;
const COLOR_RADIUS = 80;  // smaller radius for the colour effect
const MOUSE_INFLUENCE = 0.85;
const NOISE_SPEED = 0.00045;
const NOISE_SCALE = 0.0005; // world-space scale (per pixel) - lower = smoother, more flowy
const COLOR_EASE = 0.05;  // lerp factor for trailing colour origin

interface Line {
  x: number;
  y: number;
}

export const NoisyLines: React.FC= () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const colorOriginRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const linesRef = useRef<Line[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const noise3D = useRef(createNoise3D());

  const buildGrid = useCallback((w: number, h: number) => {
    const lines: Line[] = [];
    const cols = Math.ceil(w / SPACING) + 1;
    const rows = Math.ceil(h / SPACING) + 1;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        lines.push({ x: col * SPACING, y: row * SPACING });
      }
    }
    return lines;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
      linesRef.current = buildGrid(w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const draw = () => {
      timeRef.current += NOISE_SPEED;
      const t = timeRef.current;
      const { x: mx, y: my } = mouseRef.current;

      // Smoothly trail the colour origin toward the actual mouse position
      const co = colorOriginRef.current;
      co.x += (mx - co.x) * COLOR_EASE;
      co.y += (my - co.y) * COLOR_EASE;

      const { w: cw, h: ch } = sizeRef.current;
      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, cw, ch);

      for (const line of linesRef.current) {
        const { x, y } = line;

        // Base angle from simplex noise (world-space coords = stable on resize)
        const n = noise3D.current(x * NOISE_SCALE, y * NOISE_SCALE, t);
        let angle = n * Math.PI * 2;

        // Mouse influence: distance from mouse to this line's anchor
        const dx = x - mx;
        const dy = y - my;
        const dist = Math.hypot(dx, dy);

        if (dist < MOUSE_RADIUS) {
          const strength = 1 - dist / MOUSE_RADIUS;
          // Point lines toward the mouse (angle of vector from line to mouse, flipped)
          const mouseAngle = Math.atan2(my - y, mx - x);
          // Interpolate toward mouse angle
          angle = angle + (mouseAngle - angle) * strength * MOUSE_INFLUENCE;
        }

        const halfLen = LINE_LENGTH / 2;
        const x1 = x - Math.cos(angle) * halfLen;
        const y1 = y - Math.sin(angle) * halfLen;
        const x2 = x + Math.cos(angle) * halfLen;
        const y2 = y + Math.sin(angle) * halfLen;

        const isHovered = dist < MOUSE_RADIUS;

        // Colour distance uses the trailing origin + smaller radius
        const cdx = x - co.x;
        const cdy = y - co.y;
        const cDist = Math.hypot(cdx, cdy);
        const isColored = cDist < COLOR_RADIUS;
        const colorStrength = isColored ? 1 - cDist / COLOR_RADIUS : 0;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        if (isColored) {
          // Noise-driven colour visible only near trailing cursor
          const hue = ((n + 1) / 2) * 200 + 160; // blue-cyan-purple range
          const lightness = 55 + colorStrength * 15;
          const alpha = 0.65 + colorStrength * 0.35;
          ctx.strokeStyle = `hsla(${hue}, 80%, ${lightness}%, ${alpha})`;
          ctx.lineWidth = 2 + colorStrength * 1.5;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
          ctx.lineWidth = 1.5;
        }

        ctx.lineCap = 'round';
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [buildGrid]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', background: '#000' }}
    />
  );
}
