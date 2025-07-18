import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  currentSize: number; // For smooth transition
  currentOpacity: number; // For smooth transition
}

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: Infinity, y: Infinity });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
      
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 1.5 + 0.5;
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: size,
          currentSize: size,
          currentOpacity: 0.4,
        });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseOut = () => {
      mouseRef.current.x = Infinity;
      mouseRef.current.y = Infinity;
    };
    
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mouseRadius = 200;

      for (const p of particlesRef.current) {
        // Update position and wrap around edges
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > canvas.width + 5) p.x = -5;
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.y > canvas.height + 5) p.y = -5;
        if (p.y < -5) p.y = canvas.height + 5;

        const mouseDx = p.x - mouseX;
        const mouseDy = p.y - mouseY;
        const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        
        let targetSize = p.size;
        let targetOpacity = 0.4;

        if (mouseDist < mouseRadius) {
            const proximity = 1 - (mouseDist / mouseRadius);
            targetSize = p.size + proximity * 2;
            targetOpacity = 0.4 + proximity * 0.5;
        }
        
        // Lerp for smooth transition
        p.currentSize += (targetSize - p.currentSize) * 0.1;
        p.currentOpacity += (targetOpacity - p.currentOpacity) * 0.1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.currentOpacity})`;
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    setupCanvas();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('resize', setupCanvas);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', setupCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default ParticleCanvas;
