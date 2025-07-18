import React, { useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ParticleCanvas from './components/ParticleCanvas';
import Education from './components/WorkAndEducation';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Footer from './components/Footer';
import OnlinePresence from './components/OnlinePresence';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';

const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = window.innerWidth / 2;
    let outlineY = window.innerHeight / 2;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      outlineX += (mouseX - outlineX) * 0.1;
      outlineY += (mouseY - outlineY) * 0.1;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, input, textarea, [role="button"], .group, .cursor-pointer')) {
            cursorOutline.classList.add('enlarged');
        }
    };
    
    const handleMouseOut = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, input, textarea, [role="button"], .group, .cursor-pointer')) {
            cursorOutline.classList.remove('enlarged');
        }
    };
    
    const handleMouseEnterBody = () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    };

    const handleMouseLeaveBody = () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);
    document.body.addEventListener('mouseenter', handleMouseEnterBody);
    document.body.addEventListener('mouseleave', handleMouseLeaveBody);
    
    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
      document.body.removeEventListener('mouseenter', handleMouseEnterBody);
      document.body.removeEventListener('mouseleave', handleMouseLeaveBody);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot"></div>
      <div ref={cursorOutlineRef} className="cursor-outline"></div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <div className="bg-[#0c0d1e] text-white font-sans relative overflow-x-hidden">
      <CustomCursor />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <ParticleCanvas />
      <div className="relative z-10">
        <Header />
        <main className="flex flex-col items-center">
          <Hero />
          <Education />
          <TechStack />
          <Projects />
          <OnlinePresence />
          <Contact />
        </main>
        <Footer />
      </div>
      <Chatbot />
    </div>
  );
};

export default App;
