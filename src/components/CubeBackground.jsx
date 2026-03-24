import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CubeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const cubes = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 20 + 10,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    }));

    let animationFrameId;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      cubes.forEach((cube) => {
         const dx = mouseX - cube.x;
         const dy = mouseY - cube.y;
         const dist = Math.sqrt(dx * dx + dy * dy);
         if (dist < 150) {
            cube.x -= dx * 0.01;
            cube.y -= dy * 0.01;
         }

         cube.x += cube.speedX;
         cube.y += cube.speedY;
         cube.rotation += cube.rotationSpeed;

         if (cube.x < -50) cube.x = width + 50;
         if (cube.x > width + 50) cube.x = -50;
         if (cube.y < -50) cube.y = height + 50;
         if (cube.y > height + 50) cube.y = -50;

         const isDark = document.documentElement.classList.contains('dark') || window.matchMedia('(prefers-color-scheme: dark)').matches;
         const strokeColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
         const innerStroke = isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)';

         ctx.save();
         ctx.translate(cube.x, cube.y);
         ctx.rotate(cube.rotation);
         
         ctx.beginPath();
         ctx.rect(-cube.size / 2, -cube.size / 2, cube.size, cube.size);
         ctx.strokeStyle = strokeColor;
         ctx.lineWidth = 1;
         ctx.stroke();

         ctx.beginPath();
         ctx.rect(-cube.size / 4, -cube.size / 4, cube.size / 2, cube.size / 2);
         ctx.strokeStyle = innerStroke;
         ctx.stroke();

         ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full opacity-30" />
    </div>
  );
}
