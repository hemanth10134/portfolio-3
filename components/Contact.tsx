import React, { useRef } from 'react';
import LocationIcon from './icons/LocationIcon';
import EmailIcon from './icons/EmailIcon';
import PhoneIcon from './icons/PhoneIcon';
import SendIcon from './icons/SendIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const ContactInfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; color: string }> = ({ icon, title, children, color }) => (
  <div className="flex items-start gap-4 mb-6">
    <div className={`p-3 rounded-full border ${color}`}>
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-lg">{title}</h3>
      <div className="text-gray-400">{children}</div>
    </div>
  </div>
);

const FloatingLabelInput: React.FC<{id: string, name: string, type: string, required?: boolean}> = ({ id, name, type, required = false }) => (
    <div className="relative group">
        <div className="absolute -inset-px bg-gradient-to-r from-pink-500 to-purple-500 rounded-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
        <input 
            type={type} 
            id={id} 
            name={name}
            className="peer relative w-full bg-[#16172b] border border-white/20 rounded-md p-3 text-white outline-none placeholder-transparent" 
            placeholder={name}
            required={required} 
        />
        <label 
            htmlFor={id} 
            className="absolute left-3 -top-2.5 text-gray-400 text-xs bg-[#16172b] px-1 transition-all 
                       peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 
                       peer-focus:-top-2.5 peer-focus:text-pink-400 peer-focus:text-xs
                       pointer-events-none"
        >
            {name.charAt(0).toUpperCase() + name.slice(1)}
        </label>
    </div>
);

const FloatingLabelTextarea: React.FC<{id: string, name: string, required?: boolean, placeholder: string}> = ({ id, name, required = false, placeholder }) => (
    <div className="relative group">
        <div className="absolute -inset-px bg-gradient-to-r from-pink-500 to-purple-500 rounded-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
        <textarea 
            id={id} 
            name={name} 
            rows={4} 
            className="peer relative w-full bg-[#16172b] border border-white/20 rounded-md p-3 text-white outline-none placeholder-transparent"
            placeholder={placeholder}
            required={required}
        ></textarea>
        <label 
            htmlFor={id} 
            className="absolute left-3 -top-2.5 text-gray-400 text-xs bg-[#16172b] px-1 transition-all 
                       peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 
                       peer-focus:-top-2.5 peer-focus:text-pink-400 peer-focus:text-xs
                       pointer-events-none"
        >
            {name.charAt(0).toUpperCase() + name.slice(1)}
        </label>
    </div>
);

const AnimatedHackerSetup: React.FC = () => (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center -z-10 opacity-20 pointer-events-none">
        <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <filter id="monitor-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <g className="animate-hacker-sway" style={{ transformOrigin: 'center' }}>
                {/* Desk */}
                <path d="M100 500 H700 L680 520 H120 Z" fill="#2d2d2d" />
                <path d="M120 520 H680 L670 540 H130 Z" fill="#1e1e1e" />

                {/* Monitors */}
                <rect x="250" y="380" width="300" height="120" rx="10" fill="#111" stroke="#333" strokeWidth="2" />
                <rect x="255" y="385" width="290" height="110" rx="5" fill="#0c0d1e" />
                <rect x="400" y="495" width="2" height="15" fill="#333" />
                <path d="M380 510 h40 l-5 10 h-30 z" fill="#222" />
                
                <rect x="50" y="400" width="180" height="100" rx="10" fill="#111" stroke="#333" strokeWidth="2" transform="rotate(-10 140 450)" />
                <rect x="55" y="405" width="170" height="90" rx="5" fill="#0c0d1e" transform="rotate(-10 140 450)" />
                <rect x="135" y="495" width="2" height="15" fill="#333" transform="rotate(-10 140 450)" />
                <path d="M115 510 h40 l-5 10 h-30 z" fill="#222" transform="rotate(-10 140 450)" />
                
                <rect x="570" y="400" width="180" height="100" rx="10" fill="#111" stroke="#333" strokeWidth="2" transform="rotate(10 660 450)" />
                <rect x="575" y="405" width="170" height="90" rx="5" fill="#0c0d1e" transform="rotate(10 660 450)" />
                <rect x="655" y="495" width="2" height="15" fill="#333" transform="rotate(10 660 450)" />
                <path d="M635 510 h40 l-5 10 h-30 z" fill="#222" transform="rotate(10 660 450)" />

                {/* Glowing content on screens */}
                <rect x="265" y="395" width="15" height="10" fill="#ec4899" filter="url(#monitor-glow)" className="animate-subtle-pulse" />
                <rect x="270" y="415" width="120" height="3" fill="#ec4899" opacity="0.5" filter="url(#monitor-glow)" />
                <rect x="270" y="425" width="80" height="3" fill="#ec4899" opacity="0.5" filter="url(#monitor-glow)" />
                <rect x="400" y="400" width="8" height="12" fill="#fafafa" className="animate-blink" />

                {/* Chair */}
                <g className="animate-chair-rock" style={{ transformOrigin: '400px 580px' }}>
                    <path d="M350 480 Q400 450, 450 480 L460 550 H340 Z" fill="#222" />
                    <path d="M360 550 H440 L430 570 H370 Z" fill="#111" />
                    <rect x="395" y="570" width="10" height="20" fill="#333" />
                    <path d="M380 590 H420 L430 600 H370 Z" fill="#222" />
                </g>
            </g>
        </svg>
    </div>
);


const Contact: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const entry = useIntersectionObserver(sectionRef, { freezeOnceVisible: true, threshold: 0.1 });
    const isVisible = !!entry?.isIntersecting;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your message! This is a demo and your message has not been sent.');
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className={`w-full max-w-6xl mx-auto py-20 px-4 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
            <div className="relative overflow-hidden bg-[#121324]/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <AnimatedHackerSetup />
                
                <div className="relative z-10 grid md:grid-cols-2 gap-12">
                    {/* Left Side: Info */}
                    <div>
                        <h2 className="text-3xl font-bold mb-2 text-pink-400">Get in Touch</h2>
                        <p className="text-gray-400 mb-8">Feel free to reach out! Whether you have a question or just want to drop a message, I'll do my best to get back to you.</p>
                        <ContactInfoCard title="Location" icon={<LocationIcon />} color="border-pink-500/50">
                            <p>Bangalore, India</p>
                        </ContactInfoCard>
                        <ContactInfoCard title="Email" icon={<EmailIcon />} color="border-purple-500/50">
                            <a href="mailto:hemanthb008@gmail.com" className="hover:underline">hemanthb008@gmail.com</a>
                        </ContactInfoCard>
                        <ContactInfoCard title="Phone" icon={<PhoneIcon />} color="border-green-500/50">
                            <p>+91 7829204072</p>
                        </ContactInfoCard>
                    </div>

                    {/* Right Side: Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <FloatingLabelInput id="name" name="name" type="text" required />
                            <FloatingLabelInput id="email_contact" name="email address" type="email" required />
                        </div>
                        <div>
                             <FloatingLabelInput id="subject" name="subject" type="text" />
                        </div>
                        <div>
                            <FloatingLabelTextarea id="message" name="your message" placeholder="Your Project Idea..." required />
                        </div>
                        <button type="submit" className="flex items-center justify-center gap-2 w-full bg-transparent border border-pink-500 text-pink-400 font-semibold py-3 px-5 rounded-md text-md hover:bg-pink-500 hover:text-white transition-colors">
                            Send Message <SendIcon />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;