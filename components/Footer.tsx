import React, { useRef } from 'react';
import GithubIcon from './icons/GithubIcon';
import LeetcodeIcon from './icons/LeetcodeIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const socialLinks = [
  {
    name: 'Github',
    url: 'https://github.com/hemanth10134',
    icon: <GithubIcon />,
  },
  {
    name: 'Leetcode',
    url: 'https://leetcode.com/u/hemanthb1412/',
    icon: <LeetcodeIcon />,
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/hemanth-b-19377b249/',
    icon: <LinkedinIcon />,
  },
];

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(footerRef, { freezeOnceVisible: true, threshold: 0.1 });
  const isVisible = !!entry?.isIntersecting;

  return (
    <footer 
      ref={footerRef}
      className={`bg-[#080916] text-gray-400 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="border-t border-white/10 py-8">
        <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
          <div className="flex justify-center gap-6">
            {socialLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={link.name}
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <p className="text-center text-xs">
            &copy; {new Date().getFullYear()} Hemanth Bhavana. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;