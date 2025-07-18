import React from 'react';

const SectionTitle: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
    <div className="flex items-center justify-center gap-4 mb-10">
        <div className="flex-grow h-px bg-white/10 hidden sm:block"></div>
        <h2 className="text-3xl md:text-4xl font-bold text-center flex-shrink-0">{title}</h2>
         <div className="text-pink-500">{icon}</div>
        <div className="flex-grow h-px bg-white/10 hidden sm:block"></div>
    </div>
);

export default SectionTitle;
