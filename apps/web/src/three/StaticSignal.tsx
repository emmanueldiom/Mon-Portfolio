import { useEffect, useRef } from 'react';

const CYAN = [62, 227, 240];
const VIOLET = [164, 140, 255];

/**
 * Version fixe du champ de points, dessinée une fois en 2D.
 * Sert sur mobile, quand le mouvement est réduit, et en attendant la scène 3D.
 */
export function StaticSignal({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      if (!w || !h) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cols = w < 640 ? 64 : 120;
      const rows = w < 640 ? 26 : 44;
      for (let j = 0; j < rows; j++) {
        const v = j / (rows - 1); // 0 = loin, 1 = proche
        const depth = 0.35 + v * 0.65;
        for (let i = 0; i < cols; i++) {
          const u = i / (cols - 1);
          const wave =
            Math.sin(u * 8.8 + v * 2.8) * 0.45 + Math.sin(u * 20.8 + v * 7.2) * 0.18 + Math.sin(v * 8.8) * 0.2;
          const x = w / 2 + (u - 0.5) * w * 1.5 * depth;
          const y = h * (0.28 + v * 0.62) - wave * 46 * depth;
          if (x < -4 || x > w + 4) continue;
          const c = CYAN.map((value, k) => Math.round(value + (VIOLET[k] - value) * u));
          ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${(0.12 + depth * 0.6).toFixed(3)})`;
          const size = 0.7 + depth * 1.5;
          ctx.fillRect(x, y, size, size);
        }
      }
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`h-full w-full ${className}`} />;
}
