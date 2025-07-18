import React, { useRef } from 'react';
import SectionTitle from './SectionTitle';
import CodeIcon from './icons/CodeIcon';
import CIcon from './icons/tech/CIcon';
import JavaIcon from './icons/tech/JavaIcon';
import PythonIcon from './icons/tech/PythonIcon';
import HtmlIcon from './icons/tech/HtmlIcon';
import CssIcon from './icons/tech/CssIcon';
import TypescriptIcon from './icons/tech/TypescriptIcon';
import JavascriptIcon from './icons/tech/JavascriptIcon';
import NodeIcon from './icons/tech/NodeIcon';
import ExpressIcon from './icons/tech/ExpressIcon';
import NextIcon from './icons/tech/NextIcon';
import ReactIcon from './icons/tech/ReactIcon';
import MongoDbIcon from './icons/tech/MongoDbIcon';
import GitIcon from './icons/tech/GitIcon';
import GithubIcon from './icons/GithubIcon';
import PostmanIcon from './icons/tech/PostmanIcon';
import SocketIoIcon from './icons/tech/SocketIoIcon';
import GcpIcon from './icons/tech/GcpIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const programmingSkills = [
    { name: 'C', icon: <CIcon /> },
    { name: 'Java', icon: <JavaIcon /> },
    { name: 'Python', icon: <PythonIcon /> },
    { name: 'HTML', icon: <HtmlIcon /> },
    { name: 'CSS', icon: <CssIcon /> },
    { name: 'JavaScript', icon: <JavascriptIcon /> },
    { name: 'TypeScript', icon: <TypescriptIcon /> },
    { name: 'React.js', icon: <ReactIcon /> },
    { name: 'Next.js', icon: <NextIcon /> },
    { name: 'Node.js', icon: <NodeIcon /> },
    { name: 'Express.js', icon: <ExpressIcon /> },
    { name: 'MongoDB', icon: <MongoDbIcon /> },
];

const technologySkills = [
    { name: 'Git', icon: <GitIcon /> },
    { name: 'GitHub', icon: <GithubIcon /> },
    { name: 'Postman', icon: <PostmanIcon /> },
    { name: 'Socket.IO', icon: <SocketIoIcon /> },
    { name: 'REST API', icon: <div className="text-xl font-bold">API</div> },
    { name: 'Google Cloud', icon: <GcpIcon /> },
    { name: 'TCP/IP', icon: <div className="text-sm font-bold">TCP/IP</div> },
]

const TechItem: React.FC<{ name: string; icon: React.ReactNode; delay: number }> = ({ name, icon, delay }) => (
    <div 
        className="group flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl w-32 h-28 text-center transition-all duration-300 cursor-pointer hover:bg-white/10 hover:!animate-none hover:-translate-y-2 animate-float backdrop-blur-sm"
        style={{ animationDelay: `${delay}s` }}
    >
        <div className="h-10 w-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <span className="text-sm font-medium">{name}</span>
    </div>
);

const SkillCategory: React.FC<{ title: string; skills: {name: string, icon: React.ReactNode}[] }> = ({ title, skills }) => (
    <div className="w-full">
        <h3 className="text-xl font-semibold text-center text-pink-400 mb-6">{title}</h3>
        <div className="flex flex-wrap justify-center gap-4">
            {skills.map((tech) => (
                <TechItem key={tech.name} name={tech.name} icon={tech.icon} delay={Math.random() * 3} />
            ))}
        </div>
    </div>
);


const TechStack: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const entry = useIntersectionObserver(sectionRef, { freezeOnceVisible: true, threshold: 0.2 });
    const isVisible = !!entry?.isIntersecting;

    return (
        <section 
          ref={sectionRef}
          id="skills" 
          className={`w-full max-w-6xl mx-auto py-20 px-4 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
            <SectionTitle title="Technical Skills" icon={<CodeIcon />} />
            <div className="flex flex-col md:flex-row justify-center items-start gap-12">
                <SkillCategory title="Programming & Frameworks" skills={programmingSkills} />
                <SkillCategory title="Technologies & Tools" skills={technologySkills} />
            </div>
        </section>
    );
};

export default TechStack;