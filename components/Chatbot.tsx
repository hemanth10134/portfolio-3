import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import ChatIcon from './icons/ChatIcon';
import CloseIcon from './icons/CloseIcon';
import SendIcon from './icons/SendIcon';

type Message = {
  sender: 'user' | 'ai';
  text: string;
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const API_KEY = process.env.API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      console.warn("API_KEY is not set. Chatbot will be disabled.");
      return;
    }
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    chatRef.current = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        thinkingConfig: { thinkingBudget: 0 },
        systemInstruction: `You are a friendly and professional AI assistant for Hemanth Bhavana's portfolio website. Your goal is to answer questions about Hemanth's skills, projects, education, and professional background based on the information provided on this portfolio. Be concise and helpful. If you don't know an answer, say that the information isn't available on the portfolio.`,
      },
    });
    setMessages([
      { sender: 'ai', text: "Hello! I'm Hemanth's AI assistant. Ask me anything about his portfolio!" }
    ]);
  }, [API_KEY]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessageStream({ message: input });
      
      let aiResponseText = '';
      setMessages(prev => [...prev, { sender: 'ai', text: '' }]);

      for await (const chunk of response) {
        aiResponseText += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = aiResponseText;
          return newMessages;
        });
      }

    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      setMessages(prev => [...prev, { sender: 'ai', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const AiMessage = ({text, isStreaming}: {text: string, isStreaming: boolean}) => (
      <div className="max-w-[80%] p-2 rounded-lg text-sm bg-gray-700">
        {text}
        {isStreaming && <span className="inline-block w-0.5 h-4 bg-white animate-blink ml-1" />}
      </div>
  );

  if (!API_KEY) return null;

  return (
    <>
      <div className={`fixed bottom-20 right-5 z-50 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <div className="relative w-80 h-[28rem] rounded-2xl shadow-2xl">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-75 animate-border-spin"></div>
          <div className="relative bg-[#101123] w-full h-full rounded-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex-shrink-0 p-3 border-b border-white/10 text-center">
              <h3 className="font-bold text-white">AI Assistant</h3>
              <p className="text-xs text-gray-400">Ask about Hemanth's work</p>
            </div>
            
            {/* Messages */}
            <div className="flex-grow p-3 overflow-y-auto">
              <div className="flex flex-col gap-3">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'user' ? (
                       <div className={`max-w-[80%] p-2 rounded-lg text-sm bg-green-600`}>
                        {msg.text}
                      </div>
                    ) : (
                      <AiMessage text={msg.text} isStreaming={isLoading && index === messages.length -1} />
                    )}
                  </div>
                ))}
                {isLoading && messages[messages.length - 1].sender === 'user' && (
                   <div className="flex justify-start">
                      <div className="bg-gray-700 p-2 rounded-lg flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-0"></span>
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-150"></span>
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-300"></span>
                      </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Input */}
            <form onSubmit={handleSendMessage} className="flex-shrink-0 p-3 border-t border-white/10">
              <div className="flex items-center bg-gray-900/50 border border-white/20 rounded-full">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-transparent p-2 pl-4 text-sm outline-none"
                  disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !input.trim()} className="p-2 text-green-400 disabled:text-gray-500 disabled:cursor-not-allowed">
                  <SendIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
        aria-label="Toggle Chatbot"
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </div>
      </button>
    </>
  );
};

export default Chatbot;
