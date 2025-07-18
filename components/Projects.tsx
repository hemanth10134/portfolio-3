import React, { useRef, useState, useEffect } from 'react';
import SectionTitle from './SectionTitle';
import LaptopCodeIcon from './icons/LaptopCodeIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import GithubIcon from './icons/GithubIcon';

const projectsData = [
  {
    title: 'Advanced Survival Assistant v2.0',
    description: 'Developed an offline AI survival assistant with real-time voice interaction using Vosk, Ollama, and Tkinter, offering emergency guidance through natural voice commands. Implemented features like wake word detection, live speech recognition, text-to-speech, and a modern GUI with configuration management.',
    tags: ['Vosk', 'Ollama', 'Tkinter', 'Python', 'AI/ML'],
    githubUrl: 'https://github.com/hemanth10134/Advanced-Survival-Assistant-v2.0',
  },
  {
    title: 'Poisonous Food Detector',
    description: 'Detects whether a food is poisonous or not, which can be used in a forest. Built using React and TypeScript which uses Gemini API to check and analyse whether a food in a forest is poisonous or not and is edible or not.',
    tags: ['React', 'TypeScript', 'Gemini API', 'AI/ML'],
    githubUrl: 'https://github.com/hemanth10134/Poisonous-Food-Detector',
  },
  {
    title: 'Znapkart (Groceries Shopping Website)',
    description: 'Developed a modern grocery shopping web application using the MERN Stack (MongoDB, Express.js, React.js, Node.js) with full user authentication and session management. Implemented features like product browsing, cart management, and a responsive user interface for a seamless shopping experience.',
    tags: ['MERN Stack', 'MongoDB', 'Express.js', 'React.js', 'Node.js'],
    githubUrl: 'https://github.com/hemanth10134/Znapkart',
  },
];

const ProjectCard: React.FC<{ title: string; description: string; tags: string[]; githubUrl: string; delay: number }> = ({ title, description, tags, githubUrl, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);
  const [borderStyle, setBorderStyle] = useState<React.CSSProperties>({});
  const timeoutIdRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { width, height, left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = -((y - height / 2) / (height / 2)) * 10;
    const rotateY = ((x - width / 2) / (width / 2)) * 10;

    setStyle({
      transform: `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'transform 0.1s ease-out',
      backgroundImage: `radial-gradient(circle at ${x}px ${y}px, rgba(236, 72, 153, 0.15), transparent 40%)`,
    });
     setBorderStyle({
      '--x': `${x}px`,
      '--y': `${y}px`,
    } as React.CSSProperties);
  };

  const handleMouseEnter = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    setStyle(prev => ({
        ...prev,
        transform: 'perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.6s ease-in-out',
    }));
    
    timeoutIdRef.current = window.setTimeout(() => {
        setStyle(prev => ({ ...prev, backgroundImage: 'none'}));
        timeoutIdRef.current = null;
    }, 600);
  };
  
  return (
    <div
      ref={cardRef}
      className={`group bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 text-left flex flex-col h-full backdrop-blur-sm relative overflow-hidden ${!isHovered ? 'animate-float' : ''}`}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        animationDelay: `${delay}s`,
        ...borderStyle
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-pink-500/50 transition-all duration-300 pointer-events-none`}
           style={{
             background: isHovered ? `radial-gradient(300px circle at var(--x) var(--y), rgba(236, 72, 153, 0.2), transparent 40%)` : 'transparent',
             transition: 'background 0.1s ease-out'
            }}
      ></div>

      <h3 className="text-2xl font-bold text-pink-400 mb-2" style={{ transform: 'translateZ(50px)' }}>{title}</h3>
      <p className="text-gray-300 mb-4 flex-grow" style={{ transform: 'translateZ(25px)' }}>{description}</p>
      
      <div className="mt-auto" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => <span key={tag} className="bg-pink-900/50 text-pink-300 text-xs px-3 py-1 rounded-full">{tag}</span>)}
          </div>
           {githubUrl && (
             <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-pink-400 transition-colors group/link"
            >
              <div className="w-5 h-5"><GithubIcon /></div>
              <span className="group-hover/link:underline">View Source Code</span>
            </a>
          )}
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(sectionRef, { freezeOnceVisible: true, threshold: 0.1 });
  const isVisible = !!entry?.isIntersecting;

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className={`w-full max-w-7xl mx-auto py-20 px-4 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <SectionTitle title="Projects" icon={<LaptopCodeIcon />} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project, index) => <ProjectCard key={index} {...project} delay={index * 0.2} />)}
      </div>
    </section>
  );
};

export default Projects;