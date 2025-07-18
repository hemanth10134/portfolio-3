import React, { useRef } from 'react';
import SectionTitle from './SectionTitle';
import GraduationCapIcon from './icons/GraduationCapIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const educationData = [
  {
    date: 'Aug 2022 - Jul 2026',
    title: 'Bachelor of Technology in Computer Science',
    institution: 'Dayananda Sagar University, Bangalore',
  },
  {
    date: 'May 2020 - May 2022',
    title: '11th And 12th (CBSE)',
    institution: 'Sri Chaitanya JUNIOR COLLEGE',
  },
];

type TimelineItemProps = {
  date: string;
  title: string;
  institution: string;
  isLast: boolean;
};

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, institution, isLast }) => (
  <div className="relative pl-10 pb-10">
    <div className="absolute top-1 left-[-5.5px] w-3 h-3 rounded-full bg-pink-500 animate-subtle-pulse z-10"></div>
    {!isLast && <div className="absolute top-1 left-0 w-px h-full bg-white/20"></div>}
    <p className="inline-block bg-white/10 text-xs px-3 py-1 rounded-full mb-3">{date}</p>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-pink-400 font-semibold my-1">{institution}</p>
  </div>
);

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(sectionRef, { freezeOnceVisible: true, threshold: 0.2 });
  const isVisible = !!entry?.isIntersecting;

  return (
    <section 
      ref={sectionRef}
      id="education" 
      className={`w-full max-w-4xl mx-auto py-20 px-4 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <SectionTitle title="Education" icon={<GraduationCapIcon />} />
      <div className="relative flex justify-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white/10 origin-top ${isVisible ? 'animate-draw-line' : ''}" style={{animationFillMode: 'forwards'}}></div>
        <div className="flex flex-col w-full max-w-md">
          {educationData.map((item, index) => (
            <TimelineItem key={index} {...item} isLast={index === educationData.length -1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;