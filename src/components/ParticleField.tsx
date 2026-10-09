import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: 'cyan' | 'violet';
}

const LINK = 132; // px — nodes closer than this are joined
const REACH = 170; // px — pointer influence radius
const RGB = { cyan: '58,231,255', violet: '155,123,255' } as const;

/**
 * A slow-drifting network of nodes behind the page. Lines form between nearby
 * nodes, the pointer lights up and gently parts the ones it passes, and the
 * field drifts against the scroll for depth. Rendered only when motion is
 * allowed; the animation loop stops whenever the tab is hidden.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    const pointer = { x: -9999, y: -9999 };

    const spawn = (): Node => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      hue: Math.random() < 0.78 ? 'cyan' : 'violet',
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.round(Math.min(96, Math.max(28, (width * height) / 15000)));
      nodes = nodes.filter((n) => n.x <= width && n.y <= height).slice(0, target);
      while (nodes.length < target) nodes.push(spawn());
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Parallax: the field slides up a little slower than the page does.
      const shift = (window.scrollY * 0.06) % height;

      const points = nodes.map((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        let y = n.y - shift;
        if (y < -20) y += height + 40;

        // Nodes near the pointer drift away from it, then settle back.
        const dx = n.x - pointer.x;
        const dy = y - pointer.y;
        const d = Math.hypot(dx, dy);
        if (d < REACH && d > 0.1) {
          const push = (1 - d / REACH) * 0.35;
          n.x += (dx / d) * push;
          n.y += (dy / d) * push;
        }
        return { x: n.x, y, hue: n.hue, near: d < REACH ? 1 - d / REACH : 0 };
      });

      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINK) continue;
          const lit = Math.max(a.near, b.near);
          const alpha = (1 - d / LINK) * (0.13 + lit * 0.42);
          ctx.strokeStyle = `rgba(${RGB.cyan},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of points) {
        if (p.near > 0) {
          ctx.strokeStyle = `rgba(${RGB[p.hue]},${(p.near * 0.32).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(${RGB[p.hue]},${(0.42 + p.near * 0.55).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.1 + p.near * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };
    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    start();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient absolute inset-0" aria-hidden="true" />;
}
