import React, { useState, useEffect } from 'react';

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a 
    href={href} 
    className="relative text-gray-300 hover:text-white transition-colors px-4 py-2 text-sm group"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
  </a>
);

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-5 w-full flex justify-center z-50 px-4">
      <div className="w-full max-w-5xl mx-auto">
        <nav className={`flex items-center justify-between backdrop-blur-md rounded-full border border-white/10 p-2 shadow-lg transition-colors duration-300 ${scrolled ? 'bg-[#0f1021]/70' : 'bg-white/5'}`}>
          <div className="pl-4">
            <a href="#" className="text-xl font-bold italic">
              Hemanth
            </a>
          </div>
          <div className="flex items-center">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#education">Education</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#presence">Presence</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;