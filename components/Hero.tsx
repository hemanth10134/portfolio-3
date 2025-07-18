import React from 'react';
import DownloadIcon from './icons/DownloadIcon';

const Hero: React.FC = () => {
    return (
        <section id="home" className="relative text-center flex flex-col items-center justify-center pt-32 pb-16 px-4 w-full min-h-[90vh] overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(192,132,252,0.1)_0%,_transparent_40%)] animate-aurora"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(147,51,234,0.1)_0%,_transparent_40%)] animate-aurora" style={{animationDelay: '5s'}}></div>
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.1)_0%,_transparent_45%)] animate-aurora" style={{animationDelay: '10s'}}></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold my-2 tracking-wide">
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-text-gradient">
                    HEMANTH BHAVANA
                </span>
            </h1>
            <p className="text-md md:text-lg text-gray-300 my-4">
                Bangalore, India | 7829204072 | hemanthb008@gmail.com
            </p>
            
            <div className="w-full max-w-4xl mx-auto my-8">
                 <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="flex-grow h-px bg-white/10"></div>
                    <h2 className="text-2xl font-bold text-pink-400 flex-shrink-0">SUMMARY</h2>
                    <div className="flex-grow h-px bg-white/10"></div>
                </div>
                <p className="max-w-3xl mx-auto text-gray-300 text-left sm:text-center text-md md:text-lg leading-relaxed">
                    I am an enthusiastic and empathetic engineering student with a strong passion for technology and innovation. Recognized for my ability to learn quickly and adapt to new environments, I am always eager to explore emerging tools, platforms, and concepts. My goal is to bridge the gap between theoretical knowledge and real-world application by engaging in hands-on experiences.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <a
                  href="#projects"
                  className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full text-md hover:scale-105 transition-all shadow-lg hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]"
                >
                  View My Work
                </a>
                <a
                  href="#"
                  title="Add your resume file and update the href"
                  className="inline-flex items-center gap-2 bg-transparent border border-white/30 text-white font-semibold py-3 px-8 rounded-full text-md transition-all shadow-lg opacity-60 cursor-not-allowed"
                >
                  <DownloadIcon />
                  Download Resume
                </a>
            </div>
        </section>
    );
};

export default Hero;