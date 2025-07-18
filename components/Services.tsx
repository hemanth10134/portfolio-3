import React from 'react';
import SectionTitle from './SectionTitle';
import WrenchIcon from './icons/WrenchIcon';
import WebDevIcon from './icons/WebDevIcon';
import AppDevIcon from './icons/AppDevIcon';
import DesignIcon from './icons/DesignIcon';

const servicesData = [
  {
    icon: <WebDevIcon />,
    title: 'Web Development',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    icon: <AppDevIcon />,
    title: 'App Development',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    icon: <DesignIcon />,
    title: 'UI/UX Design',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
];

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-start gap-4 hover:bg-white/10 transition-colors">
    <div className="bg-pink-500/10 p-3 rounded-full">
        {icon}
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const Services: React.FC = () => {
  return (
    <section id="service" className="w-full max-w-6xl mx-auto py-20 px-4">
      <SectionTitle title="What I Do" icon={<WrenchIcon />} />
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
        Here are all the services that I provide to my clients. I Hope I offer the service that you are looking for. If you do not find something that you are looking for than please send me an <a href="mailto:narizasfakur@gmail.com" className="text-pink-400 hover:underline">email</a>.
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        {servicesData.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default Services;
