import React, { useRef } from 'react';
import SectionTitle from './SectionTitle';
import LinkIcon from './icons/LinkIcon';
import GithubIcon from './icons/GithubIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import LeetcodeIcon from './icons/LeetcodeIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const presenceData = [
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

const PresenceItem: React.FC<{ name: string; url: string; icon: React.ReactNode }> = ({ name, url, icon }) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 w-full sm:w-auto sm:min-w-[280px] text-left hover:bg-white/10 hover:-translate-y-1 transition-all cursor-pointer backdrop-blur-sm">
        <div className="h-8 w-8 text-pink-400 flex-shrink-0">{icon}</div>
        <div className="overflow-hidden">
            <p className="font-bold text-lg text-white">{name}</p>
            <p className="text-sm text-gray-400 truncate">{url}</p>
        </div>
    </a>
);

const OnlinePresence: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(sectionRef, { freezeOnceVisible: true, threshold: 0.2 });
  const isVisible = !!entry?.isIntersecting;

  return (
    <section 
      ref={sectionRef}
      id="presence" 
      className={`w-full max-w-6xl mx-auto py-20 px-4 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <SectionTitle title="Online Presence" icon={<LinkIcon />} />
       <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-8">
            {presenceData.map((item) => (
                <PresenceItem key={item.name} {...item} />
            ))}
        </div>
    </section>
  );
};

export default OnlinePresence;