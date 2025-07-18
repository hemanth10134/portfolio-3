import React from 'react';

const CallToAction: React.FC = () => {
  const coloredText = "Project".split('').map((char, index) => {
    const colors = ['#60a5fa', '#34d399', '#facc15', '#fb923c', '#f87171', '#c084fc', '#f472b6'];
    return <span key={index} style={{ color: colors[index % colors.length] }}>{char}</span>;
  });

  return (
    <section className="w-full text-center py-20 px-4 bg-white/5 my-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Have a <span className="font-extrabold">{coloredText}</span> in your mind ?
        </h2>
        <h3 className="text-4xl md:text-5xl font-extrabold mt-2">
          Let's get to work ⚡️
        </h3>
        <p className="max-w-2xl mx-auto text-gray-400 mt-6 mb-8">
          I am actively seeking new opportunities and my inbox is always open. Whether you have a question or simply want to say Hello, I will do my best to respond!
        </p>
        <a
          href="mailto:narizasfakur@gmail.com"
          className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 px-8 rounded-full text-md hover:opacity-90 transition-opacity shadow-lg"
        >
          Say Hello 👋
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
