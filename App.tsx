import React from 'react';
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

const App: React.FC = () => {
  return (
    <div className="bg-[#0c0d1e] text-white font-sans relative overflow-x-hidden">
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