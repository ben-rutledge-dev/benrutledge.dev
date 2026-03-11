'use client';

import { useEffect, useRef, useCallback } from 'react';
import { createNoise3D } from 'simplex-noise';

const SPACING = 20;
const LINE_LENGTH = 18;
const MOUSE_RADIUS = 140;
const COLOR_RADIUS = 80;
const MOUSE_INFLUENCE = 0.85;
const NOISE_SPEED = 0.00045;
const NOISE_SCALE = 0.0005;
const COLOR_EASE = 0.05;

const WELCOME_HOLD = 1800;
const WELCOME_FADE = 1200;

interface Line {
  x: number;
  y: number;
}

function buildWelcomeMask(w: number, h: number, spacing: number): Set<string> {
  const offscreen = document.createElement('canvas');
  offscreen.width = w;
  offscreen.height = h;
  const ctx = offscreen.getContext('2d')!;

  const FONT = 'Arial Black, Arial, Helvetica, sans-serif';

  ctx.textBaseline = 'middle';
  let fontSize = Math.round(w * 0.18);
  ctx.font = `900 ${fontSize}px ${FONT}`;
  const measured = ctx.measureText('Hello');
  const targetWidth = w * 0.82;
  if(measured.width > 0) {
    fontSize = Math.round(fontSize * (targetWidth / measured.width));
  }
  fontSize = Math.min(fontSize, Math.round(h * 1));

  ctx.font = `900 ${fontSize}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.fillText('Hello', w / 2, h / 2.05);

  const { data } = ctx.getImageData(0, 0, w, h);
  const set = new Set<string>();

  const cols = Math.ceil(w / spacing) + 1;
  const rows = Math.ceil(h / spacing) + 1;

  for(let row = 0; row < rows; row++) {
    for(let col = 0; col < cols; col++) {
      const px = Math.round(col * spacing);
      const py = Math.round(row * spacing);
      if(px >= w || py >= h) continue;
      let hit = false;
      for(let oy = -4; oy <= 4 && !hit; oy++) {
        for(let ox = -4; ox <= 4 && !hit; ox++) {
          const sx = Math.min(Math.max(px + ox, 0), w - 1);
          const sy = Math.min(Math.max(py + oy, 0), h - 1);
          const idx = (sy * w + sx) * 4;
          if(data[idx + 3] > 80) hit = true;
        }
      }
      if(hit) set.add(`${col},${row}`);
    }
  }

  return set;
}

export const NoisyLines: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const colorOriginRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const linesRef = useRef<Line[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const noise3D = useRef(createNoise3D());
  const startTimeRef = useRef<number | null>(null);
  const welcomeMaskRef = useRef<Set<string>>(new Set());

  const buildGrid = useCallback((w: number, h: number) => {
    const lines: Line[] = [];
    const cols = Math.ceil(w / SPACING) + 1;
    const rows = Math.ceil(h / SPACING) + 1;
    for(let row = 0; row < rows; row++) {
      for(let col = 0; col < cols; col++) {
        lines.push({ x: col * SPACING, y: row * SPACING });
      }
    }
    return lines;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;

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
      welcomeMaskRef.current = buildWelcomeMask(w, h, SPACING);
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

    const draw = (timestamp: number) => {
      if(startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      const WELCOME_INTRO = 600;

      // welcomeProgress: 0 = not yet showing, 1 = fully showing, 0 = fully gone
      let welcomeProgress = 0;
      if(elapsed < WELCOME_INTRO) {
        welcomeProgress = elapsed / WELCOME_INTRO;
      } else if(elapsed < WELCOME_INTRO + WELCOME_HOLD) {
        welcomeProgress = 1;
      } else if(elapsed < WELCOME_INTRO + WELCOME_HOLD + WELCOME_FADE) {
        welcomeProgress = 1 - (elapsed - WELCOME_INTRO - WELCOME_HOLD) / WELCOME_FADE;
      }

      timeRef.current += NOISE_SPEED;
      const t = timeRef.current;
      const { x: mx, y: my } = mouseRef.current;

      const co = colorOriginRef.current;
      co.x += (mx - co.x) * COLOR_EASE;
      co.y += (my - co.y) * COLOR_EASE;

      const { w: cw, h: ch } = sizeRef.current;
      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, cw, ch);

      const mask = welcomeMaskRef.current;

      for(const line of linesRef.current) {
        const { x, y } = line;

        const n = noise3D.current(x * NOISE_SCALE, y * NOISE_SCALE, t);
        let angle = n * Math.PI * 2;

        const dx = x - mx;
        const dy = y - my;
        const dist = Math.hypot(dx, dy);

        if(dist < MOUSE_RADIUS) {
          const strength = 1 - dist / MOUSE_RADIUS;
          const mouseAngle = Math.atan2(my - y, mx - x);
          angle = angle + (mouseAngle - angle) * strength * MOUSE_INFLUENCE;
        }

        const cdx = x - co.x;
        const cdy = y - co.y;
        const cDist = Math.hypot(cdx, cdy);
        const isColored = cDist < COLOR_RADIUS;
        const colorStrength = isColored ? 1 - cDist / COLOR_RADIUS : 0;

        const col = Math.round(x / SPACING);
        const row = Math.round(y / SPACING);
        const inWelcome = welcomeProgress > 0 && mask.has(`${col},${row}`);
        const welcomeBoost = inWelcome ? welcomeProgress : 0;

        // Snap to horizontal during welcome, blend back to noise angle as it fades
        const finalAngle = inWelcome ? angle + (0 - angle) * welcomeBoost : angle;

        const halfLen = LINE_LENGTH / 2;
        const x1 = x - Math.cos(finalAngle) * halfLen;
        const y1 = y - Math.sin(finalAngle) * halfLen;
        const x2 = x + Math.cos(finalAngle) * halfLen;
        const y2 = y + Math.sin(finalAngle) * halfLen;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        if(inWelcome) {
          const hue = ((n + 1) / 2) * 200 + 160;
          // As welcomeBoost fades to 0, lerp color toward normal white line style
          const saturation = welcomeBoost * 90;
          const lightness = 65 + (1 - welcomeBoost) * 10;
          const alpha = 0.65 + welcomeBoost * 0.35;
          ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
          ctx.lineWidth = 1 + welcomeBoost * 6;
        } else if(isColored) {
          const hue = ((n + 1) / 2) * 200 + 160;
          const lightness = 55 + colorStrength * 15;
          const alpha = 0.65 + colorStrength * 0.35;
          ctx.strokeStyle = `hsla(${hue}, 80%, ${lightness}%, ${alpha})`;
          ctx.lineWidth = 2 + colorStrength * 1.5;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
          ctx.lineWidth = 1;
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

  return <canvas ref={canvasRef} style={{ display: 'block', background: '#000' }} />;
};